const express = require("express");
const router = express.Router();
const consultaController = require("../controllers/consulta.controller");
const authMiddleware = require('../middleware/auth.middleware');

router.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept, Authorization"
  );
  next();
});

// ===== ROTAS ESPECÍFICAS PRIMEIRO (ordem importa!) =====

// Buscar consultas pendentes (DEVE vir antes de /:id)
router.get("/pendentes", [authMiddleware.verifyToken], (req, res) => {
  if (typeof consultaController.findPendentes === 'function') {
    consultaController.findPendentes(req, res);
  } else {
    res.status(501).json({ message: "Função findPendentes não implementada" });
  }
});

// Buscar consultas confirmadas (DEVE vir antes de /:id)
router.get("/confirmadas", (req, res) => {
  if (typeof consultaController.getConsultasConfirmadas === 'function') {
    consultaController.getConsultasConfirmadas(req, res);
  } else {
    res.status(501).json({ message: "Função getConsultasConfirmadas não implementada" });
  }
});

// Buscar horários disponíveis por data (DEVE vir antes de /:id)
router.get("/horarios-disponiveis", (req, res) => {
  if (typeof consultaController.getHorariosDisponiveis === 'function') {
    consultaController.getHorariosDisponiveis(req, res);
  } else {
    res.status(501).json({ message: "Função getHorariosDisponiveis não implementada" });
  }
});

// Buscar todos os status de consulta (DEVE vir antes de /:id)
router.get("/status", (req, res) => {
  if (typeof consultaController.findAllStatus === 'function') {
    consultaController.findAllStatus(req, res);
  } else {
    res.status(501).json({ message: "Função findAllStatus não implementada" });
  }
});

// Buscar consultas concluídas de um médico específico (DEVE vir antes de /:id)
router.get('/concluidas/medico/:id', consultaController.getConsultasConcluidasByMedico);

// Buscar consultas por utilizador (DEVE vir antes de /:id)
router.get("/utilizador/:id", [authMiddleware.verifyToken], (req, res) => {
  if (typeof consultaController.findByTipoUtilizador === 'function') {
    consultaController.findByTipoUtilizador(req, res);
  } else {
    res.status(501).json({ 
      message: "Função findByTipoUtilizador não implementada" 
    });
  }
});

// ===== ROTAS GERAIS =====

// Criar consulta
router.post("/", [authMiddleware.verifyToken], (req, res) => {
  if (typeof consultaController.create === 'function') {
    consultaController.create(req, res);
  } else {
    res.status(501).json({ message: "Função create não implementada" });
  }
});

// Buscar todas as consultas
router.get("/", (req, res) => {
  if (typeof consultaController.findAll === 'function') {
    consultaController.findAll(req, res);
  } else {
    res.status(501).json({ message: "Função findAll não implementada" });
  }
});

// ===== ROTAS COM PARÂMETROS ID =====

// Aceitar consulta (DEVE vir antes de /:id genérico)
router.put("/:id/aceitar", [authMiddleware.verifyToken], (req, res) => {
  if (typeof consultaController.aceitarConsulta === 'function') {
    consultaController.aceitarConsulta(req, res);
  } else {
    res.status(501).json({ message: "Função aceitarConsulta não implementada" });
  }
});

// Recusar consulta (DEVE vir antes de /:id genérico)
router.put("/:id/recusar", [authMiddleware.verifyToken], (req, res) => {
  if (typeof consultaController.recusarConsulta === 'function') {
    consultaController.recusarConsulta(req, res);
  } else {
    res.status(501).json({ message: "Função recusarConsulta não implementada" });
  }
});

// Cancelar consulta (DEVE vir antes de /:id genérico)
router.put("/:id/cancel", [authMiddleware.verifyToken], (req, res) => {
  if (typeof consultaController.cancel === 'function') {
    consultaController.cancel(req, res);
  } else {
    res.status(501).json({ message: "Função cancel não implementada" });
  }
});

// Obter fatura associada a uma consulta (DEVE vir antes de /:id genérico)
router.get("/:id/fatura", consultaController.getFatura);

// Buscar consulta por ID (DEVE vir por último entre as rotas GET com :id)
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

// Excluir consulta
router.delete("/:id", (req, res) => {
  if (typeof consultaController.delete === 'function') {
    consultaController.delete(req, res);
  } else {
    res.status(501).json({ message: "Função delete não implementada" });
  }
});

module.exports = router;