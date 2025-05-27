const express = require('express');
const router = express.Router();
const { criarFatura } = require('../controllers/faturaController');

router.post('/', criarFatura);

module.exports = router;
