const express = require("express");
const router = express.Router();
const faturaController = require("../controllers/fatura.controller");

// Listar todas faturas
router.get("/", (req, res) => {
  faturaController.findAll(req, res);
});

// Criar uma nova fatura
router.post("/", (req, res) => {
  faturaController.create(req, res);
});

// Buscar fatura por ID
router.get("/:id", (req, res) => {
  faturaController.findOne(req, res);
});

// Atualizar fatura
router.put("/:id", (req, res) => {
  faturaController.update(req, res);
});

// Marcar fatura como paga
router.put("/:id/pagar", (req, res) => {
  faturaController.markAsPaid(req, res);
});

// Cancelar fatura
router.put("/:id/cancelar", (req, res) => {
  faturaController.cancel(req, res);
});

module.exports = router;
