const express = require("express");
const router = express.Router();
const consultaController = require("../controllers/consulta.controller");
const authMiddleware = require('../middleware/auth.middleware');

module.exports = router;

router.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept, Authorization"
  );
  next();
});

// Criar consulta
router.post("/", (req, res) => {
  if (typeof consultaController.create === 'function') {
    consultaController.create(req, res);
  } else {
    res.status(501).json({ message: "Função create não implementada" });
  }
});

// Buscar todas as consultas (apenas admin e médicos)
router.get("/", (req, res) => {
  if (typeof consultaController.findAll === 'function') {
    consultaController.findAll(req, res);
  } else {
    res.status(501).json({ message: "Função findAll não implementada" });
  }
});

// Buscar consulta por ID
router.get("/:id", (req, res) => {
  if (typeof consultaController.findOne === 'function') {
    consultaController.findOne(req, res);
  } else {
    res.status(501).json({ message: "Função findOne não implementada" });
  }
});

// Atualizar consulta
router.put("/:id", (req, res) => {
  if (typeof consultaController.update === 'function') {
    consultaController.update(req, res);
  } else {
    res.status(501).json({ message: "Função update não implementada" });
  }
});

// Cancelar consulta
router.put("/:id/cancel", [authMiddleware.verifyToken], (req, res) => {
  if (typeof consultaController.cancel === 'function') {
    consultaController.cancel(req, res);
  } else {
    res.status(501).json({ message: "Função cancel não implementada" });
  }
});

// Buscar consultas por médico
router.get("/medico/:id", (req, res) => {
  if (typeof consultaController.findByMedico === 'function') {
    consultaController.findByMedico(req, res);
  } else {
    res.status(501).json({ message: "Função findByMedico não implementada" });
  }
});

// Buscar consultas por cliente
router.get("/cliente/:id", (req, res) => {
  if (typeof consultaController.findByCliente === 'function') {
    consultaController.findByCliente(req, res);
  } else {
    res.status(501).json({ message: "Função findByCliente não implementada" });
  }
});

// Excluir consulta
router.delete("/:id", (req, res) => {
  if (typeof consultaController.delete === 'function') {
    consultaController.delete(req, res);
  } else {
    res.status(501).json({ message: "Função delete não implementada" });
  }
}); 