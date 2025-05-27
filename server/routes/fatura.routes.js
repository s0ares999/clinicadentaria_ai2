const express = require('express');
const router = express.Router();
const FaturaController = require('../controllers/faturaController');
const authMiddleware = require('../middleware/auth.middleware'); // importar o middleware

// Aplica o middleware para todas as rotas daqui pra baixo
router.use(authMiddleware.verifyToken);

// Agora essas rotas só funcionam com token válido
router.post('/', FaturaController.criar);
router.get('/', FaturaController.listar);
router.get('/minhas-faturas', FaturaController.listarPorUtilizador);
router.get('/servicos', FaturaController.listarServicos);
router.delete('/:id', FaturaController.deletar);



module.exports = router;
