const express = require("express");
const router = express.Router();
const disponibilidadeController = require("../controllers/disponibilidade.controller");

// Listar todas disponibilidades
router.get("/", (req, res) => {
  disponibilidadeController.findAll(req, res);
});

// Criar uma nova disponibilidade
router.post("/", (req, res) => {
  disponibilidadeController.create(req, res);
});

// Buscar disponibilidade por ID
router.get("/:id", (req, res) => {
  disponibilidadeController.findOne(req, res);
});

// Buscar disponibilidade por médico
router.get("/medico/:id", (req, res) => {
  disponibilidadeController.findByMedico(req, res);
});

// Buscar disponibilidade por data
router.get("/data/:data", (req, res) => {
  disponibilidadeController.findByData(req, res);
});

// Buscar disponibilidade por médico e data
router.get("/medico/:id/data/:data", (req, res) => {
  disponibilidadeController.findByMedicoEData(req, res);
});

// Atualizar disponibilidade
router.put("/:id", (req, res) => {
  disponibilidadeController.update(req, res);
});

// Excluir disponibilidade
router.delete("/:id", (req, res) => {
  disponibilidadeController.delete(req, res);
});

module.exports = router; 