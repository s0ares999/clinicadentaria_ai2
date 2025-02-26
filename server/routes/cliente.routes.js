const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/cliente.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

// Criar um novo cliente
router.post('/', verifyToken, clienteController.create);

// Recuperar todos os clientes
router.get('/', verifyToken, clienteController.findAll);

// Recuperar um único cliente com id
router.get('/:id', verifyToken, clienteController.findOne);

// Atualizar um cliente com id
router.put('/:id', verifyToken, clienteController.update);

// Excluir um cliente com id
router.delete('/:id', [verifyToken, isAdmin], clienteController.delete);

module.exports = router;
