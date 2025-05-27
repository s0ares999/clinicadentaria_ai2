const express = require("express");
const router = express.Router();

const authMiddleware = require('../middleware/auth.middleware');
const clienteController = require('../controllers/cliente.controller');
const consultaController = require("../controllers/consulta.controller");

// Middleware global de autenticação
router.use(authMiddleware.verifyToken);

// Debug do token
router.use((req, res, next) => {
  console.log("🔐 Token recebido:", !!req.headers.authorization);
  console.log("👤 ID do usuário:", req.user?.id);
  next();
});

// Test route
router.get("/test", (req, res) => {
  res.status(200).json({
    message: "Cliente routes are working",
    userId: req.user ? req.user.id : 'No user ID found'
  });
});

// Obter perfil
router.get("/perfil", clienteController.getPerfil);

// Atualizar perfil
router.put("/perfil", clienteController.updatePerfil);

// Obter agendamentos
router.get("/agendamentos", (req, res) => {
  req.params.id = req.user.id;
  consultaController.findByCliente(req, res);
});

// Cancelar agendamento
router.put("/agendamentos/:id/cancelar", (req, res) => {
  if (typeof consultaController.cancelConsulta === 'function') {
    consultaController.cancelConsulta(req, res);
  } else {
    res.status(501).json({ message: "Função cancelConsulta não implementada" });
  }
});

module.exports = router;
