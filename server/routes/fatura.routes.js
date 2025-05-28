const express = require('express');
const router = express.Router();
const FaturaController = require('../controllers/faturaController');
const authMiddleware = require('../middleware/auth.middleware'); // importar o middleware

// Aplica o middleware para todas as rotas daqui pra baixo
router.use(authMiddleware.verifyToken);

// Rotas para faturas
router.post('/', FaturaController.criar);
router.get('/', FaturaController.listar);
router.get('/minhas-faturas', FaturaController.listarPorUtilizador);
router.post('/servicos', FaturaController.criarServico); 
router.get('/servicos', FaturaController.listarServicos);
router.get('/contar-servicos', FaturaController.contarServicosPorNome);
router.delete('/:id', FaturaController.deletar);
router.put('/servicos/:id', FaturaController.editarServico);  
router.delete('/servicos/:id', FaturaController.deletarServico); 

module.exports = router;
