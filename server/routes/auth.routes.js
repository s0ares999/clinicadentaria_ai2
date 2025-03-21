const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller.js");
const authMiddleware = require('../middleware/auth.middleware');

// Importar controller de autenticação
try {
  // Verificar se o método signin existe antes de usar
  if (typeof authController.signin === 'function') {
    console.log("✅ Método signin encontrado e registrado");
    router.post("/signin", authController.signin);
  } else {
    console.error("❌ Método signin não encontrado no controller");
    // Criar uma função temporária para evitar erros
    router.post("/signin", (req, res) => {
      res.status(501).json({ message: "Método signin não implementado" });
    });
  }

  // Verificar se o método signup existe antes de usar
  if (typeof authController.signup === 'function') {
    console.log("✅ Método signup encontrado e registrado");
    router.post("/signup", authController.signup);
  } else {
    console.log("ℹ️ Método signup não encontrado, rota não registrada");
  }

  // Verificar se o método verifyToken existe antes de usar
  if (typeof authController.verifyToken === 'function') {
    console.log("✅ Método verifyToken encontrado e registrado");
    router.get("/verify", authController.verifyToken);
  } else {
    console.log("ℹ️ Método verifyToken não encontrado, rota não registrada");
  }

  // Verificar se o método getProfile existe antes de usar
  if (typeof authController.getProfile === 'function') {
    console.log("✅ Método getProfile encontrado e registrado");
    router.get('/profile', [authMiddleware.verifyToken], authController.getProfile);
  } else {
    console.log("ℹ️ Método getProfile não encontrado, rota não registrada");
  }

} catch (error) {
  console.error("❌ Erro ao carregar controller de autenticação:", error);
  
  // Adicionar rotas de fallback para evitar erros
  router.post("/signin", (req, res) => {
    res.status(500).json({ message: "Erro ao carregar controller de autenticação" });
  });
  
  router.post("/signup", (req, res) => {
    res.status(500).json({ message: "Erro ao carregar controller de autenticação" });
  });
}

module.exports = router;
