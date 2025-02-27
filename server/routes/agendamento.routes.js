const express = require('express');
const router = express.Router();
const agendamentoController = require('../controllers/agendamento.controller');
const { verifyToken, isAdmin, isCliente } = require('../middlewares/auth.middleware');

// Rota pública para solicitar agendamento
router.post('/solicitar', agendamentoController.solicitarAgendamento);

// Criar um novo agendamento (requer autenticação)
router.post('/', [verifyToken, isCliente], agendamentoController.create);

// Recuperar todos os agendamentos (apenas admin)
router.get('/', [verifyToken, isAdmin], agendamentoController.findAll);

// Recuperar agendamentos do cliente autenticado
router.get('/cliente', [verifyToken, isCliente], agendamentoController.findByClienteAutenticado);

// Recuperar agendamentos de um cliente específico (apenas admin)
router.get('/cliente/:clienteId', [verifyToken, isAdmin], agendamentoController.findByCliente);

// Recuperar agendamentos por data (apenas admin)
router.get('/data/:data', [verifyToken, isAdmin], agendamentoController.findByData);

// Recuperar um único agendamento com id
router.get('/:id', verifyToken, agendamentoController.findOne);

// Atualizar um agendamento com id (apenas admin)
router.put('/:id', [verifyToken, isAdmin], agendamentoController.update);

router.put('/:id/confirmar', agendamentoController.confirmar);

router.put('/:id/rejeitar', agendamentoController.rejeitar);

// Cancelar um agendamento
router.put('/:id/cancelar', [verifyToken, isCliente], agendamentoController.cancelar);

// Excluir um agendamento com id (apenas admin)
router.delete('/:id', [verifyToken, isAdmin], agendamentoController.delete);

module.exports = router;
