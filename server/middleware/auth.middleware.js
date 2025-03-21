const jwt = require('jsonwebtoken');
const db = require('../models');
const Utilizador = db.Utilizador;
const TipoUtilizador = db.TipoUtilizador;

const JWT_SECRET = process.env.JWT_SECRET || 'clinica_dentaria_secret_key';

const authMiddleware = {
  verifyToken: async (req, res, next) => {
    try {
      let token = req.headers.authorization?.split(' ')[1] || 
                  req.headers['x-access-token'];
      
      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Token não fornecido'
        });
      }

      const decoded = jwt.verify(token, JWT_SECRET);
      
      const utilizador = await Utilizador.findOne({
        where: { id: decoded.id },
        include: [{
          model: TipoUtilizador,
          as: 'tipoUtilizador'
        }]
      });
      
      if (!utilizador) {
        return res.status(401).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }
      
      req.user = {
        id: utilizador.id,
        email: utilizador.email,
        tipo: utilizador.tipoUtilizador?.nome || 'cliente'
      };
      
      next();
    } catch (error) {
      console.error('Erro na verificação do token:', error);
      return res.status(401).json({
        success: false,
        message: error.name === 'TokenExpiredError' ? 
          'Token expirado' : 'Token inválido'
      });
    }
  },

  isAdmin: (req, res, next) => {
    if (req.user?.tipo !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Requer privilégios de administrador'
      });
    }
    next();
  },

  isCliente: (req, res, next) => {
    if (req.user?.tipo !== 'cliente') {
      return res.status(403).json({
        success: false,
        message: 'Acesso permitido apenas para clientes'
      });
    }
    next();
  },

  isClienteOrAdmin: (req, res, next) => {
    if (req.user?.tipo !== 'cliente' && req.user?.tipo !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Acesso permitido apenas para clientes e administradores'
      });
    }
    next();
  }
};

module.exports = authMiddleware; 