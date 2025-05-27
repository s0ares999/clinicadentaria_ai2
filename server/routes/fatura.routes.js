const express = require('express');
const router = express.Router();
const FaturaController = require('../controllers/faturaController');

// Criar fatura
router.post('/', FaturaController.criar);

// Deletar fatura
router.delete('/:id', FaturaController.deletar);

module.exports = router;
