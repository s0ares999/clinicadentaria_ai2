const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const db = require("../models");
const Utilizador = db.Utilizador;
const TipoUtilizador = db.TipoUtilizador;
const Cliente = db.Cliente;

// Login usando a tabela Utilizadores
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("=== TENTATIVA DE LOGIN ===");
    console.log("Email:", email);

    // Validar dados de entrada
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email e senha são obrigatórios"
      });
    }

    // Buscar usuário
    const utilizador = await Utilizador.findOne({
      where: { email },
      include: [{
        model: TipoUtilizador,
        as: 'tipoUtilizador'
      }]
    });

    if (!utilizador) {
      console.log("❌ Usuário não encontrado");
      return res.status(401).json({
        success: false,
        message: "Email ou senha incorretos"
      });
    }

    // Verificar senha
    const senhaValida = await bcrypt.compare(password, utilizador.senha);
    if (!senhaValida) {
      console.log("❌ Senha inválida");
      return res.status(401).json({
        success: false,
        message: "Email ou senha incorretos"
      });
    }

    // Gerar token
    const token = jwt.sign(
      { 
        id: utilizador.id,
        email: utilizador.email,
        tipo: utilizador.tipoUtilizador?.nome || 'cliente'
      },
      process.env.JWT_SECRET || 'clinica_dentaria_secret_key',
      { expiresIn: '24h' }
    );

    // Retornar resposta
    res.status(200).json({
      success: true,
      id: utilizador.id,
      nome: utilizador.nome,
      email: utilizador.email,
      tipo: utilizador.tipoUtilizador?.nome || 'cliente',
      accessToken: token
    });

  } catch (error) {
    console.error("❌ Erro no login:", error);
    res.status(500).json({
      success: false,
      message: "Erro interno do servidor"
    });
  }
};

// Método para obter perfil do utilizador incluindo dados da tabela Clientes
exports.getProfile = async (req, res) => {
  try {
    console.log("=== BUSCANDO PERFIL DO UTILIZADOR ===");
    const userId = req.userId; // ID do utilizador autenticado
    console.log("ID do utilizador:", userId);

    // Verificar se o token foi decodificado corretamente
    if (!userId) {
      console.log("❌ ID do utilizador não encontrado no token");
      return res.status(401).json({ message: "Não foi possível identificar o utilizador" });
    }

    // Primeiro, buscar informações básicas do utilizador
    const [utilizador] = await db.sequelize.query(
      'SELECT u.id, u.nome, u.email, u.telefone, t.nome as tipo, u.tipo_utilizador_id ' +
      'FROM "Utilizadores" u ' +
      'LEFT JOIN "TipoUtilizador" t ON u.tipo_utilizador_id = t.id ' +
      'WHERE u.id = ?',
      {
        replacements: [userId],
        type: db.sequelize.QueryTypes.SELECT
      }
    );

    if (!utilizador) {
      console.log("❌ Utilizador não encontrado com ID:", userId);
      return res.status(404).json({ message: "Utilizador não encontrado" });
    }

    console.log("✅ Utilizador encontrado:", utilizador);
    
    // Determinar tipo de utilizador
    const tipo = utilizador.tipo || 
                (utilizador.tipo_utilizador_id === 1 ? 'cliente' : 
                 utilizador.tipo_utilizador_id === 2 ? 'admin' : 
                 utilizador.tipo_utilizador_id === 3 ? 'medico' : 'cliente');

    // Dados básicos que serão retornados
    const dadosPerfil = {
      id: utilizador.id,
      nome: utilizador.nome,
      email: utilizador.email,
      telefone: utilizador.telefone,
      tipo: tipo
    };

    // Se for cliente, buscar dados específicos da tabela Clientes
    if (tipo === 'cliente' || utilizador.tipo_utilizador_id === 1) {
      try {
        console.log("🔍 Buscando dados específicos do cliente");

        // Verificar a estrutura exata da tabela Clientes
        const colunas = await db.sequelize.query(
          'SELECT column_name FROM information_schema.columns WHERE table_name = ?',
          {
            replacements: ['Clientes'],
            type: db.sequelize.QueryTypes.SELECT
          }
        );
        
        const nomesColunas = colunas.map(c => c.column_name);
        console.log("Colunas disponíveis na tabela Clientes:", nomesColunas);

        // Consulta SQL para dados do cliente
        const [cliente] = await db.sequelize.query(
          'SELECT * FROM "Clientes" WHERE utilizador_id = ?',
          {
            replacements: [userId],
            type: db.sequelize.QueryTypes.SELECT
          }
        );

        console.log("Dados brutos do cliente:", cliente);

        if (cliente) {
          console.log("✅ Dados do cliente encontrados");
          
          // Mapeamento específico para garantir que todos os campos importantes estão presentes
          // Verificando explicitamente cada campo para debugging
          if (cliente.morada) {
            dadosPerfil.morada = cliente.morada;
            console.log("✓ Campo morada encontrado:", cliente.morada);
          } else {
            console.log("⚠️ Campo morada não encontrado");
          }
          
          if (cliente.data_nascimento) {
            dadosPerfil.dataNascimento = cliente.data_nascimento;
            console.log("✓ Campo data_nascimento encontrado:", cliente.data_nascimento);
          } else if (cliente.datanascimento) {
            dadosPerfil.dataNascimento = cliente.datanascimento;
            console.log("✓ Campo datanascimento encontrado:", cliente.datanascimento);
          } else {
            console.log("⚠️ Campo data_nascimento não encontrado");
          }
          
          if (cliente.nif) {
            dadosPerfil.nif = cliente.nif;
            console.log("✓ Campo nif encontrado:", cliente.nif);
          } else {
            console.log("⚠️ Campo nif não encontrado");
          }
          
          if (cliente.historico_medico) {
            dadosPerfil.historico = cliente.historico_medico;
          } else if (cliente.historico) {
            dadosPerfil.historico = cliente.historico;
          }
          
          // Telefone do cliente tem prioridade sobre o telefone do utilizador
          if (cliente.telefone) {
            dadosPerfil.telefone = cliente.telefone;
          }
        } else {
          console.log("⚠️ Não foram encontrados dados na tabela Clientes para o utilizador", userId);
        }
      } catch (clienteError) {
        console.error("❌ Erro ao buscar dados do cliente:", clienteError);
      }
    }

    // Log final dos dados que serão enviados
    console.log("📤 Enviando dados do perfil:", dadosPerfil);
    return res.status(200).json(dadosPerfil);
  } catch (error) {
    console.error("❌ Erro ao buscar perfil:", error);
    res.status(500).json({ 
      message: "Erro ao buscar dados do perfil", 
      error: error.message 
    });
  }
};

// Método para verificar token
exports.verifyToken = (req, res) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  
  if (!token) {
    return res.status(403).json({ message: "Token não fornecido" });
  }
  
  if (token.startsWith('Bearer ')) {
    token = token.slice(7);
  }
  
  try {
    const decoded = jwt.verify(token, config.secret);
    return res.status(200).json({ valid: true, user: decoded });
  } catch (error) {
    return res.status(401).json({ valid: false, message: "Token inválido ou expirado" });
  }
};

// Método para registrar novo utilizador
exports.signup = async (req, res) => {
  try {
    if (!req.body.nome || !req.body.email || !req.body.password) {
      return res.status(400).json({ message: "Campos obrigatórios não preenchidos" });
    }
    
    // Verificar se e-mail já existe
    const [utilizadorExistente] = await db.sequelize.query(
      'SELECT * FROM "Utilizadores" WHERE email = ?',
      {
        replacements: [req.body.email],
        type: db.sequelize.QueryTypes.SELECT
      }
    );
    
    if (utilizadorExistente) {
      return res.status(400).json({ message: "E-mail já está em uso" });
    }
    
    // Hash da senha
    const senhaCriptografada = bcrypt.hashSync(req.body.password, 8);
    
    // Criar utilizador com SQL direto
    const result = await db.sequelize.query(
      'INSERT INTO "Utilizadores" (nome, email, senha, telefone, tipo_utilizador_id, "createdAt", "updatedAt") ' +
      'VALUES (?, ?, ?, ?, ?, NOW(), NOW()) RETURNING id',
      {
        replacements: [
          req.body.nome,
          req.body.email,
          senhaCriptografada,
          req.body.telefone || null,
          req.body.tipo_utilizador_id || 1
        ],
        type: db.sequelize.QueryTypes.INSERT
      }
    );
    
    const novoId = result[0][0].id;
    
    // Se for cliente, adicionar à tabela Clientes
    if (!req.body.tipo_utilizador_id || req.body.tipo_utilizador_id === 1) {
      try {
        await db.sequelize.query(
          'INSERT INTO "Clientes" (utilizador_id, morada, data_nascimento, nif, telefone) ' +
          'VALUES (?, ?, ?, ?, ?)',
          {
            replacements: [
              novoId,
              req.body.morada || null,
              req.body.dataNascimento || null,
              req.body.nif || null,
              req.body.telefone || null
            ],
            type: db.sequelize.QueryTypes.INSERT
          }
        );
        console.log("✅ Cliente criado com sucesso");
      } catch (clienteError) {
        console.error("❌ Erro ao criar registro de cliente:", clienteError);
      }
    }
    
    res.status(201).json({
      message: "Utilizador registrado com sucesso",
      utilizador: {
        id: novoId,
        nome: req.body.nome,
        email: req.body.email
      }
    });
  } catch (error) {
    console.error("❌ Erro no registro:", error);
    res.status(500).json({ 
      message: "Erro ao registrar utilizador", 
      error: error.message 
    });
  }
};
