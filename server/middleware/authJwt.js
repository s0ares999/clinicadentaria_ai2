const jwt = require("jsonwebtoken");
const db = require("../models");
const Utilizador = db.Utilizador;
const TipoUtilizador = db.TipoUtilizador;

// Definir chave secreta para JWT
const JWT_SECRET = process.env.JWT_SECRET || "clinica-dentaria-secret-key";

// Verificar se o token é válido
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  
  // Verificar se o token foi fornecido
  if (!token) {
    return res.status(403).json({
      message: "Nenhum token fornecido!"
    });
  }
  
  // Remover "Bearer " se presente
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  
  // Verificar o token
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Não autorizado! Token inválido ou expirado."
      });
    }
    
    // Salvar informações do usuário para uso nas rotas
    req.userId = decoded.id;
    req.userEmail = decoded.email;
    req.userRole = decoded.tipo;
    
    next();
  });
};

// Verificar se o usuário é um admin
isAdmin = async (req, res, next) => {
  try {
    // Verificar apenas na tabela Utilizadores
    const utilizador = await Utilizador.findByPk(req.userId, {
      include: [{
        model: TipoUtilizador,
        as: 'tipoUtilizador'
      }]
    });
    
    if (utilizador && utilizador.tipoUtilizador && utilizador.tipoUtilizador.nome === 'admin') {
      return next();
    }
    
    return res.status(403).json({
      message: "Acesso negado! Requer privilégios de administrador."
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao verificar permissões: " + error.message
    });
  }
};

// Verificar se o usuário é um médico
isMedico = async (req, res, next) => {
  try {
    // Verificar na tabela Utilizadores
    const utilizador = await Utilizador.findByPk(req.userId, {
      include: [{
        model: TipoUtilizador,
        as: 'tipoUtilizador'
      }]
    });
    
    if (utilizador && utilizador.tipoUtilizador && utilizador.tipoUtilizador.nome === 'medico') {
      return next();
    }
    
    return res.status(403).json({
      message: "Acesso negado! Requer privilégios de médico."
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao verificar permissões: " + error.message
    });
  }
};

// Verificar se o usuário é um cliente
isCliente = async (req, res, next) => {
  try {
    // Verificar na tabela Utilizadores
    const utilizador = await Utilizador.findByPk(req.userId, {
      include: [{
        model: TipoUtilizador,
        as: 'tipoUtilizador'
      }]
    });
    
    if (utilizador && utilizador.tipoUtilizador && utilizador.tipoUtilizador.nome === 'cliente') {
      return next();
    }
    
    return res.status(403).json({
      message: "Acesso negado! Requer privilégios de cliente."
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao verificar permissões: " + error.message
    });
  }
};

// Verificar se o usuário é admin ou médico
isAdminOrMedico = async (req, res, next) => {
  try {
    // Verificar na tabela Utilizadores
    const utilizador = await Utilizador.findByPk(req.userId, {
      include: [{
        model: TipoUtilizador,
        as: 'tipoUtilizador'
      }]
    });
    
    if (utilizador && utilizador.tipoUtilizador && 
        (utilizador.tipoUtilizador.nome === 'admin' || utilizador.tipoUtilizador.nome === 'medico')) {
      return next();
    }
    
    return res.status(403).json({
      message: "Acesso negado! Requer privilégios de administrador ou médico."
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao verificar permissões: " + error.message
    });
  }
};

// Exportar funções
module.exports = {
  verifyToken,
  isAdmin,
  isMedico,
  isCliente,
  isAdminOrMedico
}; 