const express = require('express');
const router = express.Router();
const utilizadorController = require('../controllers/utilizador.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Obter todos os utilizadores (sem senha)
router.get('/', utilizadorController.findAll);

// Obter todos os clientes (somente admin)
router.get('/clientes', authMiddleware.verifyToken, authMiddleware.isAdmin, utilizadorController.findAllClientes);

// Obter todos os médicos
router.get('/medicos', utilizadorController.findAllMedicos);

// Criar novo utilizador (somente admin)
router.post('/', authMiddleware.verifyToken, authMiddleware.isAdmin, utilizadorController.create);

// Obter um utilizador específico (usuário logado)
router.get('/:id', authMiddleware.verifyToken, utilizadorController.findOne);

// Atualizar utilizador (usuário logado ou admin)
router.put('/:id', authMiddleware.verifyToken, utilizadorController.update);

// Remover utilizador (somente admin)
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, utilizadorController.delete);

module.exports = router;
