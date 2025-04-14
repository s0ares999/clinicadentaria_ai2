const express = require('express');
const router = express.Router();
const medico = require('../controllers/medico.controller.js');
const authMiddleware = require('../middleware/auth.middleware');

// Rota para obter perfil do médico
router.get(
  '/perfil',
  [authMiddleware.verifyToken],
  (req, res) => {
    if (typeof medico.getPerfil === 'function') {
      medico.getPerfil(req, res);
    } else {
      res.status(501).json({ message: "Função getPerfil não implementada" });
    }
  }
);

// Rota para atualizar perfil do médico
router.put(
  '/:id/perfil',
  [authMiddleware.verifyToken],
  (req, res) => {
    if (typeof medico.updatePerfil === 'function') {
      medico.updatePerfil(req, res);
    } else {
      res.status(501).json({ message: "Função updatePerfil não implementada" });
    }
  }
);

// Rota para corrigir registros de médicos
router.post(
  '/corrigir-registros',
  [authMiddleware.verifyToken, authMiddleware.isAdmin], // Apenas admin pode executar
  medico.corrigirRegistrosMedicos
);

module.exports = router; 