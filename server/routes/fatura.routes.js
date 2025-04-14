const express = require("express");
const router = express.Router();
const faturaController = require("../controllers/fatura.controller");
const authMiddleware = require('../middleware/auth.middleware');

// Rota temporária para inicializar status (sem autenticação)
router.get("/init-status", async (req, res) => {
  try {
    const db = require('../models');
    
    // Verifica se já existem os status
    const statusCount = await db.FaturaStatus.count();
    if (statusCount > 0) {
      return res.status(200).json({ message: "Status já existem", count: statusCount });
    }
    
    // Cria os status no banco de dados
    await db.FaturaStatus.bulkCreate([
      { id: 1, nome: 'Emitida' },
      { id: 2, nome: 'Paga' },
      { id: 3, nome: 'Cancelada' }
    ]);
    
    res.status(200).json({ message: "Status de faturas inicializados com sucesso" });
  } catch (error) {
    console.error("Erro ao inicializar status:", error);
    res.status(500).json({ message: "Erro ao inicializar status", error: error.message });
  }
});

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

module.exports = router;
