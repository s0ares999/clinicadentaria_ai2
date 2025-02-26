const jwt = require('jsonwebtoken');
const db = require('../models');
const User = db.User;

verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (!token) {
    return res.status(403).json({ message: "Nenhum token fornecido!" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Não autorizado!" });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    if (user.role === "admin") {
      next();
      return;
    }

    res.status(403).json({ message: "Requer privilégios de administrador!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const authMiddleware = {
  verifyToken,
  isAdmin
};

module.exports = authMiddleware;
