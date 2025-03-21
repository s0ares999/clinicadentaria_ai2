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

let useInMemoryData = false; // Definimos isso como true apenas se o banco estiver inacessível

// Dados em memória para situações sem banco de dados
const inMemoryUsers = new Map();

// Middleware para verificar token
router.use(authMiddleware.verifyToken);

// Verificar se é cliente ou admin em rotas específicas
router.get('/perfil', (req, res, next) => {
  if (req.user?.tipo === 'cliente' || req.user?.tipo === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Acesso permitido apenas para clientes e administradores'
    });
  }
});

// Depuração do token em cada requisição
router.use((req, res, next) => {
  console.log("🔐 Token recebido:", req.headers.authorization ? "Sim" : "Não");
  console.log("👤 ID do usuário:", req.userId);
  next();
});

// Obter agendamentos do cliente autenticado
router.get("/agendamentos", (req, res) => {
  // Usar o ID do cliente autenticado do token
  req.params.id = req.user.id;
  consultaController.findByCliente(req, res);
});

// Rota única para obter perfil
router.get("/perfil", async (req, res) => {
  try {
    console.log("🔍 Buscando perfil para ID:", req.userId);
    
    if (useInMemoryData) {
      // Usar dados em memória se o banco estiver inacessível
      let userData = inMemoryUsers.get(req.userId);
      
      if (!userData) {
        // Dados mock para testes
        userData = {
          id: req.userId,
          nome: "Utilizador Teste",
          email: "teste@exemplo.com",
          telefone: "123456789",
          dataNascimento: "1990-01-01",
          morada: "Rua de Teste, 123",
          nif: "123456789"
        };
        inMemoryUsers.set(req.userId, userData);
      }
      
      return res.status(200).json({
        message: "Perfil obtido com sucesso (dados em memória)",
        cliente: userData
      });
    }
    
    // Buscar utilizador primeiro
    const utilizador = await Utilizador.findByPk(req.userId, {
      attributes: { exclude: ['senha'] }
    });
    
    if (!utilizador) {
      console.log("❌ Utilizador não encontrado");
      return res.status(404).json({ message: "Utilizador não encontrado" });
    }
    
    console.log("✅ Utilizador encontrado:", utilizador.nome);
    
    // Buscar dados do cliente
    let clienteData = null;
    
    try {
      const cliente = await Cliente.findOne({
        where: { utilizador_id: req.userId }
      });
      
      if (cliente) {
        console.log("✅ Cliente encontrado, ID:", cliente.id);
        clienteData = cliente;
      } else {
        console.log("⚠️ Registro de cliente não encontrado");
      }
    } catch (clienteError) {
      console.error("❌ Erro ao buscar cliente:", clienteError.message);
    }
    
    // Criar objeto de resposta com os dados disponíveis
    const dadosPerfil = {
      id: clienteData?.id || utilizador.id,
      utilizador_id: utilizador.id,
      nome: clienteData?.nome || utilizador.nome,
      email: clienteData?.email || utilizador.email,
      telefone: clienteData?.telefone || utilizador.telefone,
      dataNascimento: clienteData?.dataNascimento || clienteData?.data_nascimento || null,
      morada: clienteData?.morada || null,
      nif: clienteData?.nif || null,
      historico: clienteData?.historico || null
    };
    
    console.log("📤 Enviando dados de perfil:", JSON.stringify(dadosPerfil));
    
    // Enviar resposta
    res.status(200).json({
      message: "Perfil obtido com sucesso",
      cliente: dadosPerfil
    });
  } catch (error) {
    console.error("❌ Erro na rota /perfil:", error.message);
    res.status(500).json({ 
      message: "Erro ao buscar dados do perfil",
      error: error.message
    });
  }
});

// Atualizar perfil do cliente
router.put("/perfil", (req, res) => {
  req.params.id = req.user.id;
  utilizadorController.update(req, res);
});

// Cancelar agendamento
router.put("/agendamentos/:id/cancelar", (req, res) => {
  if (typeof consultaController.cancelConsulta === 'function') {
    consultaController.cancelConsulta(req, res);
  } else {
    res.status(501).json({ message: "Função cancelConsulta não implementada" });
  }
});

// Add a test route to verify the API is accessible
router.get("/test", (req, res) => {
  res.status(200).json({ 
    message: "Cliente routes are working", 
    userId: req.user ? req.user.id : 'No user ID found'
  });
});

// Rota para obter perfil do cliente
router.get('/perfil', authMiddleware.isCliente, clienteController.getClienteProfile);

// Rota para atualizar perfil do cliente
router.put('/perfil', async (req, res) => {
  try {
    console.log("🔄 Atualizando perfil do cliente:", req.body);
    
    // Buscar o cliente
    let cliente = await Cliente.findOne({
      where: { utilizador_id: req.userId }
    });
    
    // Buscar o utilizador
    const utilizador = await Utilizador.findByPk(req.userId);
    
    if (!utilizador) {
      return res.status(404).json({ message: "Utilizador não encontrado" });
    }
    
    // Dados a serem atualizados
    const { nome, email, telefone, dataNascimento, morada, nif } = req.body;
    
    // Atualizar os dados do utilizador
    await utilizador.update({
      nome: nome || utilizador.nome,
      email: email || utilizador.email,
      telefone: telefone || utilizador.telefone
    });
    
    // Se o cliente não existir, criar um novo registro
    if (!cliente) {
      console.log("🆕 Cliente não existe, criando novo registro");
      cliente = await Cliente.create({
        utilizador_id: req.userId,
        nome: nome || utilizador.nome,
        email: email || utilizador.email,
        telefone: telefone || utilizador.telefone,
        dataNascimento: dataNascimento,
        morada: morada,
        nif: nif
      });
    } else {
      // Atualizar dados do cliente existente
      await cliente.update({
        nome: nome || cliente.nome,
        email: email || cliente.email,
        telefone: telefone || cliente.telefone,
        dataNascimento: dataNascimento || cliente.dataNascimento,
        morada: morada || cliente.morada,
        nif: nif || cliente.nif
      });
    }
    
    // Buscar o cliente atualizado
    const clienteAtualizado = await Cliente.findOne({
      where: { utilizador_id: req.userId }
    });
    
    res.status(200).json({
      message: "Perfil atualizado com sucesso",
      cliente: {
        id: clienteAtualizado.id,
        utilizador_id: clienteAtualizado.utilizador_id,
        nome: clienteAtualizado.nome,
        email: clienteAtualizado.email,
        telefone: clienteAtualizado.telefone,
        dataNascimento: clienteAtualizado.dataNascimento,
        morada: clienteAtualizado.morada,
        nif: clienteAtualizado.nif
      }
    });
  } catch (error) {
    console.error("❌ Erro ao atualizar perfil do cliente:", error);
    res.status(500).json({
      message: "Erro ao atualizar perfil",
      error: error.message
    });
  }
});

// Rota para obter consultas do cliente
router.get('/consultas', async (req, res) => {
  try {
    // Implementação temporária
    res.status(200).json({
      message: "Funcionalidade em desenvolvimento",
      consultas: []
    });
  } catch (error) {
    console.error("Erro ao obter consultas:", error);
    res.status(500).json({ message: "Erro ao buscar consultas" });
  }
});

// Rota de perfil do cliente - redireciona para o método getProfile do authController
router.get('/perfil', authMiddleware.isCliente, authController.getProfile);

module.exports = router;