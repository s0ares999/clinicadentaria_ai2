const express = require('express');
const router = express.Router();
const utilizadorController = require('../controllers/utilizador.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Rota para obter todos os utilizadores
router.get('/', [authMiddleware.verifyToken, authMiddleware.isAdmin], utilizadorController.findAll);

// Rota para obter um utilizador específico
router.get('/:id', [authMiddleware.verifyToken], utilizadorController.findOne);

// Rota para criar um novo utilizador
router.post('/', [authMiddleware.verifyToken, authMiddleware.isAdmin], utilizadorController.create);

// Rota para atualizar um utilizador
router.put('/:id', [authMiddleware.verifyToken], utilizadorController.update);

// Rota para remover um utilizador
router.delete('/:id', [authMiddleware.verifyToken, authMiddleware.isAdmin], utilizadorController.delete);

// Rota para obter todos os clientes
router.get('/clientes', [authMiddleware.verifyToken, authMiddleware.isAdmin], utilizadorController.findAllClientes);

module.exports = router;