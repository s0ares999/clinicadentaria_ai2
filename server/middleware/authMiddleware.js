const jwt = require('jsonwebtoken');
const db = require('../models');
const Utilizador = db.Utilizador;
const TipoUtilizador = db.TipoUtilizador;
const { sequelize } = db;

const JWT_SECRET = process.env.JWT_SECRET || 'clinica_dentaria_secret_key';

const authMiddleware = {
  /**
   * Middleware para verificar se o usuário está autenticado
   */
  async verifyToken(req, res, next) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({
          success: false,
          message: 'Token não fornecido'
        });
      }
      
      const decoded = jwt.verify(token, JWT_SECRET);
      
      // Verificar se o usuário existe apenas na tabela Utilizadores
      const utilizador = await Utilizador.findOne({
        where: { id: decoded.id, email: decoded.email },
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
      
      // Adicionar usuário ao request
      req.user = {
        id: utilizador.id,
        username: utilizador.nome,
        email: utilizador.email,
        role: utilizador.tipoUtilizador ? utilizador.tipoUtilizador.nome : 'cliente'
      };
      
      // Continuar
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Token inválido ou expirado'
      });
    }
  },
  
  /**
   * Middleware para verificar se o usuário tem permissão de admin
   */
  async isAdmin(req, res, next) {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Não autenticado'
      });
    }
    
    // Verificar se é admin
    if (req.user.role === 'admin') {
      return next();
    }
    
    return res.status(403).json({
      success: false,
      message: 'Requer permissão de administrador'
    });
  },
  
  /**
   * Middleware para verificar se o usuário é médico
   */
  async isMedico(req, res, next) {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Não autenticado'
      });
    }
    
    // Verificar se é médico
    if (req.user.role === 'medico') {
      return next();
    }
    
    return res.status(403).json({
      success: false,
      message: 'Requer permissão de médico'
    });
  },
  
  /**
   * Middleware para verificar se é cliente ou admin (para acessar dados de clientes)
   */
  async isClienteOrAdmin(req, res, next) {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Não autenticado'
      });
    }
    
    // Verificar se é cliente ou admin
    if (req.user.role === 'cliente' || req.user.role === 'admin') {
      return next();
    }
    
    return res.status(403).json({
      success: false,
      message: 'Permissão negada'
    });
  }
};

module.exports = authMiddleware;