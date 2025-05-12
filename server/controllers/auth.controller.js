const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const db = require("../models");
const Utilizador = db.Utilizador;
const TipoUtilizador = db.TipoUtilizador;
const Cliente = db.Cliente;
const Admin = db.Admin;
const Medico = db.Medico;

// Utilitários a
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const mapTipoToId = (tipoNome) => {
  const mapeamento = {
    'cliente': 1,
    'admin': 2, 
    'medico': 3
  };
  return mapeamento[tipoNome] || null;
};

const mapIdToTipo = (tipoId) => {
  const mapeamento = {
    1: 'cliente',
    2: 'admin',
    3: 'medico'
  };
  return mapeamento[tipoId] || null;
};

const verificarTiposUtilizador = async () => {
  try {
    const tiposUtilizador = await TipoUtilizador.findAll();
    console.log(`Encontrados ${tiposUtilizador.length} tipos de utilizador`);
    
    if (tiposUtilizador.length === 0) {
      throw new Error("Não há tipos de utilizador cadastrados no sistema");
    }
    
    return tiposUtilizador;
  } catch (error) {
    console.error("Erro ao verificar tipos de utilizador:", error);
    throw error;
  }
};

// Login usando a tabela Utilizadores
exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validações básicas
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email e senha são obrigatórios"
      });
    }
    
    if (!validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Formato de email inválido"
      });
    }

    // Buscar o utilizador pelo email
    const utilizador = await Utilizador.findOne({
      where: { email },
      include: [{
        model: TipoUtilizador,
        as: 'tipoUtilizador',
        attributes: ['nome']
      }]
    });

    if (!utilizador) {
      return res.status(401).json({
        success: false,
        message: "Email ou senha incorretos"
      });
    }

    // Verificar a senha
    const senhaValida = await bcrypt.compare(password, utilizador.senha);
    if (!senhaValida) {
      return res.status(401).json({
        success: false,
        message: "Email ou senha incorretos"
      });
    }

    // Verificar tipo de utilizador
    if (!utilizador.tipoUtilizador) {
      return res.status(401).json({
        success: false,
        message: "Tipo de utilizador não encontrado"
      });
    }

    const tipo = utilizador.tipoUtilizador.nome;

    // Gerar token
    const token = jwt.sign(
      { 
        id: utilizador.id,
        email: utilizador.email,
        tipo: tipo
      },
      process.env.JWT_SECRET || 'clinica_dentaria_secret_key',
      { expiresIn: '24h' }
    );

    // Retornar dados do utilizador e token
    return res.status(200).json({
      success: true,
      accessToken: token,
      id: utilizador.id,
      nome: utilizador.nome,
      email: utilizador.email,
      tipo: tipo
    });

  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({
      success: false,
      message: "Erro interno do servidor",
      debug: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Método para obter perfil do utilizador
exports.getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ 
        success: false,
        message: "Não foi possível identificar o utilizador" 
      });
    }

    // Buscar informações básicas do utilizador
    const utilizador = await Utilizador.findOne({
      where: { id: userId },
      include: [{
        model: TipoUtilizador,
        as: 'tipoUtilizador',
        attributes: ['nome']
      }],
      attributes: { exclude: ['senha'] }
    });

    if (!utilizador) {
      return res.status(404).json({ 
        success: false,
        message: "Utilizador não encontrado" 
      });
    }
    
    // Dados básicos do perfil
    const dadosPerfil = {
      id: utilizador.id,
      nome: utilizador.nome,
      email: utilizador.email,
      telefone: utilizador.telefone,
      tipo: utilizador.tipoUtilizador ? utilizador.tipoUtilizador.nome : mapIdToTipo(utilizador.tipo_utilizador_id)
    };

    // Se for cliente, buscar dados específicos
    if (dadosPerfil.tipo === 'cliente') {
      try {
        const cliente = await Cliente.findOne({
          where: { utilizador_id: userId }
        });

        if (cliente) {
          // Adicionar dados do cliente ao perfil
          dadosPerfil.morada = cliente.morada;
          dadosPerfil.dataNascimento = cliente.data_nascimento;
          dadosPerfil.nif = cliente.nif;
          dadosPerfil.historico = cliente.historico;
          
          // Telefone do cliente tem prioridade
          if (cliente.telefone) {
            dadosPerfil.telefone = cliente.telefone;
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados do cliente:", error);
      }
    } else if (dadosPerfil.tipo === 'medico') {
      // Buscar dados do médico se necessário
      try {
        const medico = await Medico.findOne({
          where: { utilizador_id: userId }
        });
        
        if (medico) {
          dadosPerfil.especialidade_id = medico.especialidade_id;
          dadosPerfil.crm = medico.crm;
        }
      } catch (error) {
        console.error("Erro ao buscar dados do médico:", error);
      }
    }

    return res.status(200).json({
      success: true,
      ...dadosPerfil
    });
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    res.status(500).json({ 
      success: false,
      message: "Erro ao buscar dados do perfil", 
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Método para verificar token
exports.verifyToken = (req, res) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  
  if (!token) {
    return res.status(403).json({ 
      success: false,
      message: "Token não fornecido" 
    });
  }
  
  // Remover prefixo 'Bearer ' se presente
  if (token.startsWith('Bearer ')) {
    token = token.slice(7);
  }
  
  try {
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || 'clinica_dentaria_secret_key'
    );
    
    return res.status(200).json({ 
      success: true,
      valid: true, 
      user: decoded 
    });
  } catch (error) {
    return res.status(401).json({ 
      success: false,
      valid: false, 
      message: "Token inválido ou expirado" 
    });
  }
};

// Método para registrar novo utilizador
exports.signup = async (req, res) => {
  try {
    // Verificar se a tabela TipoUtilizador tem registros
    await verificarTiposUtilizador();
    
    // Extração dos campos da requisição
    const { 
      email, 
      senha, 
      password,
      username, 
      nome,
      telefone, 
      tipo, 
      role,
      tipo_utilizador_id,
      data_nascimento,
      nif,
      morada,
      especialidade_id,
      crm
    } = req.body;

    // Validações básicas
    if (!email || !validateEmail(email)) {
      return res.status(400).json({
        success: false,
        message: "Email inválido ou não fornecido"
      });
    }

    if (!nome) {
      return res.status(400).json({
        success: false,
        message: "Nome é obrigatório"
      });
    }

    // Determinar a senha
    const senhaFinal = senha || password;
    if (!senhaFinal) {
      return res.status(400).json({
        success: false,
        message: "Senha é obrigatória"
      });
    }
    
    // Determinar o tipo de utilizador
    let tipoUtilizadorIdFinal = tipo_utilizador_id;
    if (!tipoUtilizadorIdFinal) {
      const tipoFinal = tipo || role;
      if (!tipoFinal) {
        return res.status(400).json({
          success: false,
          message: "Tipo de utilizador é obrigatório"
        });
      }

      tipoUtilizadorIdFinal = mapTipoToId(tipoFinal);
      if (!tipoUtilizadorIdFinal) {
        return res.status(400).json({
          success: false,
          message: `Tipo de utilizador '${tipoFinal}' não é válido`
        });
      }
    }

    // Verificar se o tipo existe
    const tipoUtilizador = await TipoUtilizador.findByPk(tipoUtilizadorIdFinal);
    if (!tipoUtilizador) {
      return res.status(400).json({
        success: false,
        message: `Tipo de utilizador com ID ${tipoUtilizadorIdFinal} não existe`
      });
    }
    
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

    // Criar registros específicos baseados no tipo
    const tipoNome = tipoUtilizador.nome;
    
    if (tipoNome === 'medico') {
      // Validações específicas para médicos
      if (!especialidade_id) {
        await utilizador.destroy();
        return res.status(400).json({
          success: false,
          message: "Especialidade é obrigatória para médicos"
        });
      }
      
      if (!crm) {
        await utilizador.destroy();
        return res.status(400).json({
          success: false,
          message: "CRM é obrigatório para médicos"
        });
      }
      
      // Criar registro de médico
      await Medico.create({
        utilizador_id: utilizador.id,
        especialidade_id,
        crm
      });
    } 
    else if (tipoNome === 'cliente') {
      // Criar registro de cliente
      await Cliente.create({
        utilizador_id: utilizador.id,
        nome,
        email,
        telefone,
        data_nascimento,
        morada,
        nif
      });
    }

    // Resposta de sucesso
    res.status(201).json({
      success: true,
      message: "Utilizador registrado com sucesso!",
      id: utilizador.id
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({
      success: false,
      message: error.message || "Ocorreu um erro durante o registro."
    });
  }
};
