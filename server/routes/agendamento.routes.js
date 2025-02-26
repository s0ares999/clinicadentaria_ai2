const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamento.controller');
const { verifyToken, isAdmin } = require('../middlewares/auth.middleware');

// Criar um novo agendamento
router.post('/', verifyToken, agendamentoController.create);

// Recuperar todos os agendamentos
router.get('/', verifyToken, agendamentoController.findAll);

// Recuperar agendamentos de um cliente específico
router.get('/cliente/:clienteId', verifyToken, agendamentoController.findByCliente);

// Recuperar agendamentos por data
router.get('/data/:data', verifyToken, agendamentoController.findByData);

// Recuperar um único agendamento com id
router.get('/:id', verifyToken, agendamentoController.findOne);

// Atualizar um agendamento com id
router.put('/:id', verifyToken, agendamentoController.update);

// Excluir um agendamento com id
router.delete('/:id', [verifyToken, isAdmin], agendamentoController.delete);

module.exports = router;
