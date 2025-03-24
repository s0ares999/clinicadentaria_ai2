const jwt = require('jsonwebtoken');
const db = require('../models');
const Utilizador = db.Utilizador;
const TipoUtilizador = db.TipoUtilizador;

const JWT_SECRET = process.env.JWT_SECRET || 'clinica_dentaria_secret_key';

const authMiddleware = {
  verifyToken: async (req, res, next) => {
    try {
      console.log("\n=== VERIFICANDO TOKEN ===");
      let token = req.headers.authorization?.split(' ')[1] || 
                  req.headers['x-access-token'];
      
      if (!token) {
        console.log("❌ Token não fornecido");
        return res.status(401).json({
          success: false,
          message: 'Token não fornecido'
        });
      }

      console.log("🎟️ Token recebido:", token);
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log("🔓 Token decodificado:", {
        id: decoded.id,
        email: decoded.email,
        tipo: decoded.tipo
      });
      
      const utilizador = await Utilizador.findOne({
        where: { id: decoded.id },
        include: [{
          model: TipoUtilizador,
          as: 'tipoUtilizador'
        }]
      });
      
      if (!utilizador) {
        console.log("❌ Utilizador não encontrado no banco");
        return res.status(401).json({
          success: false,
          message: 'Usuário não encontrado'
        });
      }

      // Adicionar informações do usuário ao request
      req.user = {
        id: decoded.id,
        email: decoded.email,
        tipo: decoded.tipo
      };
      
      console.log("✅ Token verificado com sucesso");
      console.log("👤 Usuário autenticado:", req.user);
      
      next();
    } catch (error) {
      console.error('❌ Erro na verificação do token:', error);
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