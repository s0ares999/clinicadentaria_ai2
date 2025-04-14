const express = require("express");
const router = express.Router();
const especialidadeController = require("../controllers/especialidade.controller");

// Listar todas especialidades
router.get("/", (req, res) => {
  especialidadeController.findAll(req, res);
});

// Criar uma nova especialidade
router.post("/", (req, res) => {
  especialidadeController.create(req, res);
});

// Buscar especialidade por nome
router.get("/nome/:nome", (req, res) => {
  especialidadeController.findByNome(req, res);
});

// Buscar especialidade por ID
router.get("/:id", (req, res) => {
  especialidadeController.findOne(req, res);
});

// Atualizar especialidade
router.put("/:id", (req, res) => {
  especialidadeController.update(req, res);
});

// Excluir especialidade
router.delete("/:id", (req, res) => {
  especialidadeController.delete(req, res);
});

module.exports = router;