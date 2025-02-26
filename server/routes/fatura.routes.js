const express = require('express');
const router = express.Router();
const faturaController = require('../controllers/fatura.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

// Criar uma nova fatura
router.post('/', [verifyToken, isAdmin], faturaController.create);

// Recuperar todas as faturas
router.get('/', verifyToken, faturaController.findAll);

// Recuperar faturas de um cliente específico
router.get('/cliente/:clienteId', verifyToken, faturaController.findByCliente);

// Recuperar uma única fatura com id
router.get('/:id', verifyToken, faturaController.findOne);

// Atualizar uma fatura com id
router.put('/:id', [verifyToken, isAdmin], faturaController.update);

// Excluir uma fatura com id
router.delete('/:id', [verifyToken, isAdmin], faturaController.delete);

module.exports = router;
