const express = require('express');
const router = express.Router();
const estatisticasController = require('../controllers/estatisticasController');

// Rota atual que você já tem
router.get('/', estatisticasController.getEstatisticas);

// Nova rota para estatísticas por status de agendamento
router.get('/status', estatisticasController.getEstatisticasPorStatus);

module.exports = router;
