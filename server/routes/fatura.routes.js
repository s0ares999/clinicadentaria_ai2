const express = require("express");
const router = express.Router();
const faturaController = require("../controllers/fatura.controller");
const authMiddleware = require('../middleware/auth.middleware');

module.exports = router;

// Configurações de cabeçalho
router.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept, Authorization"
  );
  next();
});

// Rota do PDF - com middleware específico
router.get("/:id/pdf", authMiddleware.verifyTokenFromQuery, faturaController.getFaturaPDF);

// Adicionar middleware de autenticação para todas as outras rotas
router.use(authMiddleware.verifyToken);

// Obter faturas do cliente logado
router.get("/cliente", faturaController.getFaturasByCliente);

// Obter faturas do médico logado
router.get("/medico", faturaController.getFaturasByMedico);

// Obter detalhes de uma fatura específica
router.get("/:id", faturaController.getFaturaById);

// Criar fatura para uma consulta
router.post("/consulta/:consultaId", faturaController.createFatura);

// Atualizar dados de uma fatura (valor, observações)
router.put("/:id", faturaController.updateFatura);

// Atualizar status da fatura
router.put("/:id/status", faturaController.updateFaturaStatus);

// Registrar pagamento
router.post("/:id/pagamento", faturaController.registerPagamento);
