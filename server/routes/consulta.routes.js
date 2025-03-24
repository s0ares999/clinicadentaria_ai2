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
router.post(
  "/", 
  [authMiddleware.verifyToken],
  (req, res) => {
    if (typeof consultaController.create === 'function') {
      consultaController.create(req, res);
    } else {
      res.status(501).json({ message: "Função create não implementada" });
    }
  }
);

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

// Buscar consultas por utilizador (cliente ou médico)
router.get("/utilizador/:id", [authMiddleware.verifyToken], (req, res) => {
  if (typeof consultaController.findByTipoUtilizador === 'function') {
    consultaController.findByTipoUtilizador(req, res);
  } else {
    res.status(501).json({ 
      message: "Função findByTipoUtilizador não implementada" 
    });
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

// Aceitar consulta
router.put("/:id/aceitar", [authMiddleware.verifyToken], (req, res) => {
  if (typeof consultaController.aceitarConsulta === 'function') {
    consultaController.aceitarConsulta(req, res);
  } else {
    res.status(501).json({ message: "Função aceitarConsulta não implementada" });
  }
});

// Recusar consulta
router.put("/:id/recusar", [authMiddleware.verifyToken], (req, res) => {
  if (typeof consultaController.recusarConsulta === 'function') {
    consultaController.recusarConsulta(req, res);
  } else {
    res.status(501).json({ message: "Função recusarConsulta não implementada" });
  }
});

// Listar consultas pendentes disponíveis para todos os médicos
router.get("/pendentes", [authMiddleware.verifyToken], (req, res) => {
  if (typeof consultaController.findPendentes === 'function') {
    consultaController.findPendentes(req, res);
  } else {
    // Implementação temporária - retorna todas as consultas com estado PENDENTE
    consultaController.findAll(req, res, {
      where: { estado: "PENDENTE", medico_id: null }
    });
  }
});

// Buscar todos os status de consulta
router.get("/status", (req, res) => {
  if (typeof consultaController.findAllStatus === 'function') {
    consultaController.findAllStatus(req, res);
  } else {
    res.status(501).json({ message: "Função findAllStatus não implementada" });
  }
}); 