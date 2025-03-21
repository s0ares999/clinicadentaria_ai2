const express = require("express");
const router = express.Router();

// Rota para verificar saúde da API
router.get("/", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

module.exports = router; 