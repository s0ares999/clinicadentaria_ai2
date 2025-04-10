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
    // Verificar se a tabela TipoUtilizador existe e tem registros
    console.log("Verificando tabela TipoUtilizador...");
    try {
      const tiposUtilizador = await TipoUtilizador.findAll();
      console.log(`Encontrados ${tiposUtilizador.length} tipos de utilizador:`);
      tiposUtilizador.forEach(tipo => {
        console.log(`- ID: ${tipo.id}, Nome: ${tipo.nome}`);
      });
      
      if (tiposUtilizador.length === 0) {
        return res.status(500).json({
          success: false,
          message: "Não há tipos de utilizador cadastrados no sistema"
        });
      }
    } catch (error) {
      console.error("Erro ao verificar tipos de utilizador:", error);
      return res.status(500).json({
        success: false,
        message: "Erro ao verificar tipos de utilizador"
      });
    }
    
    // Extração e normalização dos campos da requisição
    const { 
      email, 
      senha, 
      password, // Aceitar ambos senha e password
      username, 
      nome,
      telefone, 
      tipo, 
      role, // Aceitar ambos tipo e role
      tipo_utilizador_id,
      data_nascimento,
      nif,
      morada,
      especialidade_id,
      crm,
      ...outrosDados
    } = req.body;

    // Determinar a senha correta (permitir ambos 'senha' ou 'password')
    const senhaFinal = senha || password;
    if (!senhaFinal) {
      return res.status(400).json({
        success: false,
        message: "Senha é obrigatória"
      });
    }
    
    // Determinar o ID do tipo de utilizador
    let tipoUtilizadorIdFinal = tipo_utilizador_id;
    if (!tipoUtilizadorIdFinal) {
      // Se não tiver tipo_utilizador_id, usar o tipo/role para determinar
      const tipoFinal = tipo || role;
      if (!tipoFinal) {
        return res.status(400).json({
          success: false,
          message: "Tipo de utilizador é obrigatório"
        });
      }

      console.log("Dados normalizados para registro:", {
        email,
        senha: senhaFinal ? "[PRESENTE]" : "[AUSENTE]",
        nome,
        telefone,
        tipo: tipoFinal
      });

      // Mapear o tipo de utilizador para o ID correto
      switch (tipoFinal) {
        case 'cliente':
          tipoUtilizadorIdFinal = 1;
          break;
        case 'admin':
          tipoUtilizadorIdFinal = 2;
          break;
        case 'medico':
          tipoUtilizadorIdFinal = 3;
          break;
        default:
          return res.status(400).json({
            success: false,
            message: `Tipo de utilizador '${tipoFinal}' não é válido`
          });
      }
    }

    console.log(`Tipo de utilizador ID: ${tipoUtilizadorIdFinal}`);

    // Verificar se o tipo existe antes de continuar
    const tipoUtilizador = await TipoUtilizador.findByPk(tipoUtilizadorIdFinal);
    if (!tipoUtilizador) {
      return res.status(400).json({
        success: false,
        message: `Tipo de utilizador com ID ${tipoUtilizadorIdFinal} não existe`
      });
    }
    
    console.log(`Tipo verificado: ${tipoUtilizador.nome} (ID: ${tipoUtilizador.id})`);

    // Verificar se o e-mail já está em uso
    const utilizadorExistente = await Utilizador.findOne({
      where: { email }
    });
    
    if (utilizadorExistente) {
      return res.status(400).json({
        success: false,
        message: "Este e-mail já está em uso"
      });
    }

    // Criar o utilizador base
    const utilizador = await Utilizador.create({
      email,
      senha: bcrypt.hashSync(senhaFinal, 8),
      username: username || nome,
      nome,
      telefone,
      tipo_utilizador_id: tipoUtilizador.id
    });

    // Se for médico, criar registro na tabela Medicos
    if (tipoUtilizador.nome === 'medico') {
      try {
        // Verificar se especialidade_id existe
        if (!especialidade_id) {
          await utilizador.destroy();
          return res.status(400).json({
            success: false,
            message: "Especialidade é obrigatória para médicos"
          });
        }
        
        // Verificar se CRM foi fornecido
        if (!crm) {
          await utilizador.destroy();
          return res.status(400).json({
            success: false,
            message: "CRM é obrigatório para médicos"
          });
        }
        
        await Medico.create({
          utilizador_id: utilizador.id,
          especialidade_id,
          crm
        });
        
        console.log(`Médico registrado com sucesso. Especialidade: ${especialidade_id}, CRM: ${crm}`);
      } catch (medicoError) {
        // Se houver erro ao criar o médico, deletar o utilizador criado
        await utilizador.destroy();
        console.error("Erro ao criar registro de médico:", medicoError);
        throw new Error('Erro ao criar registro de médico: ' + medicoError.message);
      }
    }
    
    // Se for cliente, criar registro na tabela Clientes
    if (tipoUtilizador.nome === 'cliente') {
      try {
        await Cliente.create({
          utilizador_id: utilizador.id,
          nome,
          email,
          telefone,
          data_nascimento,
          morada,
          nif
        });
        
        console.log("Cliente registrado com sucesso");
      } catch (clienteError) {
        // Se houver erro ao criar o cliente, deletar o utilizador criado
        await utilizador.destroy();
        console.error("Erro ao criar registro de cliente:", clienteError);
        throw new Error('Erro ao criar registro de cliente: ' + clienteError.message);
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
