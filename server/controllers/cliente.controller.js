const db = require('../models');
const Cliente = db.Cliente;
const Utilizador = db.Utilizador;

// Obter perfil do cliente
exports.getClienteProfile = async (req, res) => {
  try {
    console.log("Obtendo perfil do cliente para userId:", req.userId);
    
    // Buscar cliente pelo id do utilizador (usuário)
    const cliente = await Cliente.findOne({
      where: { utilizador_id: req.userId },
      include: [{
        model: Utilizador,
        as: 'utilizador',
        attributes: ['id', 'email', 'telefone']
      }]
    });
    
    if (!cliente) {
      console.log("Cliente não encontrado para o utilizador ID:", req.userId);
      return res.status(404).json({
        message: "Perfil de cliente não encontrado"
      });
    }
    
    console.log("Dados do cliente encontrados:", cliente);
    
    // Retornar dados do cliente
    res.status(200).json({
      message: "Perfil obtido com sucesso",
      cliente: {
        id: cliente.id || cliente.utilizador_id,
        utilizador_id: cliente.utilizador_id,
        nome: cliente.nome,
        email: cliente.email,
        telefone: cliente.telefone,
        dataNascimento: cliente.dataNascimento,
        morada: cliente.morada,
        nif: cliente.nif,
        historico: cliente.historico
      }
    });
  } catch (error) {
    console.error("Erro ao obter perfil do cliente:", error);
    res.status(500).json({
      message: "Erro ao obter perfil do cliente",
      error: error.message
    });
  }
};

// Atualizar perfil do cliente
exports.updateClienteProfile = async (req, res) => {
  try {
    console.log("Atualizando perfil do cliente:", req.body);
    
    // Verificar se o cliente existe
    const cliente = await Cliente.findOne({
      where: { utilizador_id: req.userId }
    });
    
    if (!cliente) {
      return res.status(404).json({
        message: "Perfil de cliente não encontrado"
      });
    }
    
    // Campos que podem ser atualizados
    const { nome, email, telefone, dataNascimento, morada, nif } = req.body;
    
    // Atualizar dados
    await cliente.update({
      nome: nome || cliente.nome,
      email: email || cliente.email,
      telefone: telefone || cliente.telefone,
      dataNascimento: dataNascimento || cliente.dataNascimento,
      morada: morada || cliente.morada,
      nif: nif || cliente.nif
    });
    
    // Também atualizar dados básicos no utilizador
    if (nome || email || telefone) {
      await Utilizador.update(
        {
          nome: nome || undefined,
          email: email || undefined,
          telefone: telefone || undefined
        },
        {
          where: { id: req.userId }
        }
      );
    }
    
    res.status(200).json({
      message: "Perfil atualizado com sucesso",
      cliente: {
        utilizador_id: cliente.utilizador_id,
        nome: cliente.nome,
        email: cliente.email,
        telefone: cliente.telefone,
        dataNascimento: cliente.dataNascimento,
        morada: cliente.morada,
        nif: cliente.nif
      }
    });
  } catch (error) {
    console.error("Erro ao atualizar perfil do cliente:", error);
    res.status(500).json({
      message: "Erro ao atualizar perfil do cliente",
      error: error.message
    });
  }
};

// Obter consultas do cliente
exports.getClienteConsultas = async (req, res) => {
  try {
    // Implementação temporária
    res.status(200).json({
      message: "Funcionalidade em desenvolvimento",
      consultas: []
    });
  } catch (error) {
    console.error("Erro ao obter consultas do cliente:", error);
    res.status(500).json({
      message: "Erro ao obter consultas do cliente",
      error: error.message
    });
  }
};

// Implementar outros métodos conforme necessário... 