const express = require('express');
const router = express.Router();
const estatisticasController = require('../controllers/estatisticasController');

// Rota principal com estatísticas gerais
router.get('/', estatisticasController.getEstatisticas);

// Rota para estatísticas por status de agendamento
router.get('/status', estatisticasController.getEstatisticasPorStatus);

// ✅ Nova rota para evolução do faturamento por período (semana, mês, ano)
router.get('/faturamento', estatisticasController.getFaturamentoPorPeriodo);

module.exports = router;
