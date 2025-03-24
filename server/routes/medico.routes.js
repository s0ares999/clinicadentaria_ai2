module.exports = (app) => {
  const medico = require('../controllers/medico.controller.js');
  const router = require('express').Router();
  const { authMiddleware } = require('../middleware');

  // Corrigindo a definição das rotas
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

  app.use('/api/medicos', router);
}; 