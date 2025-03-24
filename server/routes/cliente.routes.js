const express = require("express");
const router = express.Router();
const consultaController = require("../controllers/consulta.controller");
const utilizadorController = require("../controllers/utilizador.controller");
const authMiddleware = require('../middleware/auth.middleware');
const db = require('../models');
const clienteController = require('../controllers/cliente.controller');
const Cliente = db.Cliente;
const Utilizador = db.Utilizador;
const authController = require('../controllers/auth.controller');

let useInMemoryData = false;
const inMemoryUsers = new Map();

// Middleware global para verificar token
router.use(authMiddleware.verifyToken);

// Middleware de depuração
router.use((req, res, next) => {
  console.log("🔐 Token recebido:", req.headers.authorization ? "Sim" : "Não");
  console.log("👤 ID do usuário:", req.user?.id);
  next();
});

// Rota de teste
router.get("/test", (req, res) => {
  res.status(200).json({ 
    message: "Cliente routes are working", 
    userId: req.user ? req.user.id : 'No user ID found'
  });
});

// Rota para obter agendamentos
router.get("/agendamentos", (req, res) => {
  req.params.id = req.user.id;
  consultaController.findByCliente(req, res);
});

// Rota única para perfil - usando clienteController.getPerfil
router.get(
  '/perfil',
  [authMiddleware.verifyToken],
  async (req, res) => {
    try {
      if (!clienteController.getPerfil) {
        throw new Error('Método getPerfil não implementado');
      }
      await clienteController.getPerfil(req, res);
    } catch (error) {
      console.error("❌ Erro ao acessar perfil:", error);
      res.status(500).json({
        success: false,
        message: error.message || 'Erro ao acessar perfil'
      });
    }
  }
);

// Rota para atualizar perfil
router.put("/perfil", async (req, res) => {
  try {
    console.log("🔄 Atualizando perfil do cliente:", req.body);
    
    const { nome, email, telefone, dataNascimento, morada, nif } = req.body;
    
    // Buscar utilizador primeiro
    const utilizador = await Utilizador.findByPk(req.user.id);
    if (!utilizador) {
      return res.status(404).json({ 
        success: false, 
        message: "Utilizador não encontrado" 
      });
    }
    
    // Atualizar utilizador
    await utilizador.update({
      nome: nome || utilizador.nome,
      telefone: telefone || utilizador.telefone
    });
    
    // Buscar ou criar cliente
    let cliente = await Cliente.findOne({
      where: { utilizador_id: req.user.id }
    });
    
    if (!cliente) {
      // Criar novo cliente
      cliente = await Cliente.create({
        utilizador_id: req.user.id,
        nome: nome || utilizador.nome,
        email: email || utilizador.email,
        telefone: telefone || utilizador.telefone,
        dataNascimento,
        morada,
        nif
      });
    } else {
      // Atualizar cliente existente
      await cliente.update({
        nome: nome || cliente.nome,
        email: email || cliente.email,
        telefone: telefone || cliente.telefone,
        dataNascimento: dataNascimento || cliente.dataNascimento,
        morada: morada || cliente.morada,
        nif: nif || cliente.nif
      });
    }
    
    // Buscar dados atualizados
    const clienteAtualizado = await Cliente.findOne({
      where: { utilizador_id: req.user.id },
      include: [{
        model: Utilizador,
        as: 'utilizador',
        attributes: ['id', 'nome', 'email', 'telefone']
      }]
    });
    
    console.log("✅ Perfil atualizado com sucesso");
    
    res.status(200).json({
      success: true,
      message: "Perfil atualizado com sucesso",
      data: {
        utilizador_id: clienteAtualizado.utilizador_id,
        nome: clienteAtualizado.nome,
        email: clienteAtualizado.email,
        telefone: clienteAtualizado.telefone,
        dataNascimento: clienteAtualizado.dataNascimento,
        morada: clienteAtualizado.morada,
        nif: clienteAtualizado.nif,
        utilizador: clienteAtualizado.utilizador
      }
    });
    
  } catch (error) {
    console.error("❌ Erro ao atualizar perfil:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao atualizar perfil",
      error: error.message
    });
  }
});

// Rota para cancelar agendamento
router.put("/agendamentos/:id/cancelar", (req, res) => {
  if (typeof consultaController.cancelConsulta === 'function') {
    consultaController.cancelConsulta(req, res);
  } else {
    res.status(501).json({ message: "Função cancelConsulta não implementada" });
  }
});

module.exports = router;