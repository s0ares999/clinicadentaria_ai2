const jwt = require('jsonwebtoken');
const db = require('../models');
const Utilizador = db.Utilizador;

// Verificar token de autenticação
const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    
    // Verificar se token existe
    if (!token) {
      return res.status(403).json({
        message: "Token não fornecido!"
      });
    }
    
    // Remover prefix Bearer se presente
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }
    
    // Verificar token
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || "clinica-dentaria-secret-key"
    );
    
    // Verificar se usuário existe
    const utilizador = await Utilizador.findByPk(decoded.id);
    
    if (!utilizador) {
      return res.status(401).json({
        message: "Usuário não encontrado!"
      });
    }
    
    // Adicionar ID do usuário à requisição
    req.userId = decoded.id;
    
    next();
  } catch (error) {
    console.error("Erro na verificação do token:", error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: "Token expirado!"
      });
    }
    
    return res.status(401).json({
      message: "Não autorizado!"
    });
  }
};

isAdmin = async (req, res, next) => {
  try {
    const user = await Utilizador.findByPk(req.userId);
    if (user && user.role === "admin") {
      next();
      return;
    }

    res.status(403).json({ message: "Requer privilégios de administrador!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

isCliente = async (req, res, next) => {
  try {
    const user = await Utilizador.findByPk(req.userId);
    if (user && user.role === "cliente") {
      next();
      return;
    }

    res.status(403).json({ message: "Acesso permitido apenas para clientes!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const authMiddleware = {
  verifyToken,
  isAdmin,
  isCliente
};

module.exports = authMiddleware;
