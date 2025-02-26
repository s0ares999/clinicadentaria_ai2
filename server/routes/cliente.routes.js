const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/cliente.controller');
const { verifyToken, isAdmin, isCliente } = require('../middlewares/auth.middleware');

// Rota pública para listar clientes
router.get('/public', clienteController.findAllPublic);

// Criar um novo cliente
router.post('/', verifyToken, clienteController.create);

// Recuperar todos os clientes (requer autenticação)
router.get('/', verifyToken, clienteController.findAll);

// Recuperar perfil do cliente autenticado
router.get('/profile', [verifyToken, isCliente], clienteController.findProfile);

// Atualizar perfil do cliente autenticado
router.put('/profile', [verifyToken, isCliente], clienteController.updateProfile);

// Atualizar histórico do cliente autenticado
router.put('/profile/historico', [verifyToken, isCliente], clienteController.updateHistorico);

// Recuperar um único cliente com id
router.get('/:id', verifyToken, clienteController.findOne);

// Atualizar um cliente com id
router.put('/:id', verifyToken, clienteController.update);

// Excluir um cliente com id
router.delete('/:id', [verifyToken, isAdmin], clienteController.delete);

module.exports = router;
