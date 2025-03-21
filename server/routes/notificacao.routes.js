const express = require("express");
const router = express.Router();
const notificacaoController = require("../controllers/notificacao.controller");

// Listar todas notificações
router.get("/", (req, res) => {
  notificacaoController.findAll(req, res);
});

// Criar uma nova notificação
router.post("/", (req, res) => {
  notificacaoController.create(req, res);
});

// Buscar notificação por ID
router.get("/:id", (req, res) => {
  notificacaoController.findOne(req, res);
});

// Buscar notificações por usuário
router.get("/usuario/:id", (req, res) => {
  notificacaoController.findByUsuario(req, res);
});

// Marcar notificação como lida
router.put("/:id/lida", (req, res) => {
  notificacaoController.markAsRead(req, res);
});

// Excluir notificação
router.delete("/:id", (req, res) => {
  notificacaoController.delete(req, res);
});

module.exports = router; 