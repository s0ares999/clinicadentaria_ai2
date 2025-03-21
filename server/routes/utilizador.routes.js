const express = require('express');
const router = express.Router();
const utilizadorController = require('../controllers/utilizador.controller');
const authJwt = require('../middleware/authJwt');

// Rota para obter todos os utilizadores
router.get('/', [authJwt.verifyToken, authJwt.isAdmin], utilizadorController.findAll);

// Rota para obter um utilizador específico
router.get('/:id', [authJwt.verifyToken], utilizadorController.findOne);

// Rota para criar um novo utilizador
router.post('/', [authJwt.verifyToken, authJwt.isAdmin], utilizadorController.create);

// Rota para atualizar um utilizador
router.put('/:id', [authJwt.verifyToken], utilizadorController.update);

// Rota para remover um utilizador
router.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], utilizadorController.delete);

// Rota para obter todos os clientes
router.get('/clientes', [authJwt.verifyToken, authJwt.isAdmin], utilizadorController.findAllClientes);

module.exports = router;