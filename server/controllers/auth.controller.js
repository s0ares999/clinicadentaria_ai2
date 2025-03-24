const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const db = require("../models");
const Utilizador = db.Utilizador;
const TipoUtilizador = db.TipoUtilizador;
const Cliente = db.Cliente;
const Admin = db.Admin;
const Medico = db.Medico;

// Login usando a tabela Utilizadores
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("\n=== TENTATIVA DE LOGIN ===");
    console.log("📧 Email recebido:", email);
    console.log("🔑 Password recebido (length):", password?.length || 0);

    // Verificar se as tabelas existem
    try {
      const [tables] = await db.sequelize.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
      `);
      console.log("Tabelas encontradas:", tables.map(t => t.table_name));
    } catch (err) {
      console.error("Erro ao listar tabelas:", err);
    }

    // Tentar buscar direto com SQL primeiro
    const [utilizadorSQL] = await db.sequelize.query(`
      SELECT u.*, t.nome as tipo_nome 
      FROM "Utilizadores" u 
      LEFT JOIN "TipoUtilizador" t ON u.tipo_utilizador_id = t.id 
      WHERE u.email = :email
    `, {
      replacements: { email },
      type: db.sequelize.QueryTypes.SELECT
    });

    console.log("Resultado SQL direto:", utilizadorSQL);

    // Buscar com Sequelize
    const utilizador = await Utilizador.findOne({
      where: { email },
      include: [{
        model: TipoUtilizador,
        as: 'tipoUtilizador',
        attributes: ['nome']
      }],
      logging: console.log
    });

    if (!utilizador) {
      console.log("❌ Utilizador não encontrado para o email:", email);
      return res.status(401).json({
        success: false,
        message: "Email ou senha incorretos"
      });
    }

    console.log("Dados do utilizador encontrado:", {
      id: utilizador.id,
      email: utilizador.email,
      temSenha: !!utilizador.senha,
      senhaTamanho: utilizador.senha?.length,
      tipoUtilizador: utilizador.tipoUtilizador?.nome
    });

    console.log("\n🔐 Verificando senha...");
    console.log("Senha armazenada (hash):", utilizador.senha);
    console.log("Senha recebida (length):", password.length);

    // Verificar se a senha está em formato hash
    const isSenhaHashed = utilizador.senha.startsWith('$2') && utilizador.senha.length === 60;
    console.log("Senha está hasheada?", isSenhaHashed);

    const senhaValida = await bcrypt.compare(password, utilizador.senha);
    console.log("Resultado da verificação da senha:", senhaValida);
    
    if (!senhaValida) {
      console.log("❌ Senha inválida para o utilizador:", email);
      return res.status(401).json({
        success: false,
        message: "Email ou senha incorretos"
      });
    }

    // Verificar tipo de utilizador
    console.log("\n👤 Verificando tipo de utilizador...");
    if (!utilizador.tipoUtilizador) {
      console.log("❌ Tipo de utilizador não encontrado");
      console.log("tipo_utilizador_id:", utilizador.tipo_utilizador_id);
      return res.status(401).json({
        success: false,
        message: "Tipo de utilizador não encontrado"
      });
    }

    const tipo = utilizador.tipoUtilizador.nome;
    console.log("✅ Tipo de utilizador encontrado:", tipo);

    // Gerar token
    console.log("\n🎟️ Gerando token...");
    const token = jwt.sign(
      { 
        id: utilizador.id,
        email: utilizador.email,
        tipo: tipo
      },
      process.env.JWT_SECRET || 'clinica_dentaria_secret_key',
      { expiresIn: '24h' }
    );
    console.log("✅ Token gerado com sucesso");

    // Retornar resposta
    console.log("\n📤 Enviando resposta...");
    return res.status(200).json({
      success: true,
      accessToken: token,
      id: utilizador.id,
      nome: utilizador.nome,
      email: utilizador.email,
      tipo: tipo
    });

  } catch (error) {
    console.error("\n❌ Erro completo:", error);
    console.error("Stack:", error.stack);
    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
      debug: process.env.NODE_ENV === 'development' ? error.message : undefined
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
    const { email, password, username, telefone, role, dadosEspecificos, nome } = req.body;

    // Buscar o tipo de utilizador
    const tipoUtilizador = await TipoUtilizador.findOne({
      where: { nome: role }
    });

    if (!tipoUtilizador) {
      return res.status(400).json({
        message: "Tipo de utilizador não encontrado"
      });
    }

    // Criar o utilizador base
    const utilizador = await Utilizador.create({
      email,
      senha: bcrypt.hashSync(password, 8),
      username,
      nome,
      telefone,
      tipo_utilizador_id: tipoUtilizador.id
    });

    // Se for médico, criar registro na tabela Medicos
    if (role === 'medico') {
      try {
        await Medico.create({
          utilizador_id: utilizador.id,
          especialidade_id: dadosEspecificos.especialidade_id,
          crm: dadosEspecificos.crm
        });
      } catch (medicoError) {
        // Se houver erro ao criar o médico, deletar o utilizador criado
        await utilizador.destroy();
        throw new Error('Erro ao criar registro de médico: ' + medicoError.message);
      }
    }

    res.status(200).json({
      success: true,
      message: "Utilizador registrado com sucesso!"
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({
      success: false,
      message: error.message || "Ocorreu um erro durante o registro."
    });
  }
};
