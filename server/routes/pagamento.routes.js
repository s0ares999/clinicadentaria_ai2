const express = require("express");
const router = express.Router();
const pagamentoController = require("../controllers/pagamento.controller");

// Listar todos pagamentos
router.get("/", (req, res) => {
  pagamentoController.findAll(req, res);
});

// Criar um novo pagamento
router.post("/", (req, res) => {
  pagamentoController.create(req, res);
});

// Buscar pagamento por ID
router.get("/:id", (req, res) => {
  pagamentoController.findOne(req, res);
});

// Buscar pagamentos por cliente
router.get("/cliente/:id", (req, res) => {
  pagamentoController.findByCliente(req, res);
});

// Atualizar pagamento
router.put("/:id", (req, res) => {
  pagamentoController.update(req, res);
});

// Procesar pagamento
router.post("/processar", (req, res) => {
  pagamentoController.process(req, res);
});

module.exports = router; 