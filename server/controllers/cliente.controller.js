const db = require('../models');
const Cliente = db.Cliente;
const Utilizador = db.Utilizador;
const TipoUtilizador = db.TipoUtilizador;

// Obter perfil do cliente
exports.getPerfil = async (req, res) => {
  try {
    console.log("\n=== BUSCANDO PERFIL DO CLIENTE ===");
    console.log("👤 ID do usuário:", req.user.id);

    // Primeiro, buscar o utilizador com seus dados completos
    const utilizador = await Utilizador.findOne({
      where: { id: req.user.id },
      include: [{
        model: TipoUtilizador,
        as: 'tipoUtilizador',
        attributes: ['nome']
      }]
    });

    if (!utilizador) {
      return res.status(404).json({
        success: false,
        message: "Utilizador não encontrado"
      });
    }

    // Buscar ou criar o cliente
    let cliente = await Cliente.findOne({
      where: { utilizador_id: req.user.id }
    });

    if (!cliente) {
      // Criar novo registro de cliente
      cliente = await Cliente.create({
        utilizador_id: req.user.id,
        nome: utilizador.nome,
        email: utilizador.email,
        telefone: utilizador.telefone || null,
        dataNascimento: null,
        morada: null,
        nif: null
      });
      console.log("✅ Novo cliente criado para utilizador_id:", cliente.utilizador_id);
    }

    // Montar objeto de resposta com todos os dados
    const responseData = {
      success: true,
      data: {
        utilizador_id: cliente.utilizador_id,
        nome: cliente.nome || utilizador.nome,
        email: cliente.email || utilizador.email,
        telefone: cliente.telefone || utilizador.telefone,
        dataNascimento: cliente.dataNascimento,
        morada: cliente.morada,
        nif: cliente.nif,
        utilizador: {
          id: utilizador.id,
          nome: utilizador.nome,
          email: utilizador.email,
          telefone: utilizador.telefone,
          tipoUtilizador: utilizador.tipoUtilizador
        }
      }
    };

    console.log("📤 Dados enviados:", JSON.stringify(responseData, null, 2));
    res.json(responseData);

  } catch (error) {
    console.error("❌ Erro ao buscar perfil:", error);
    res.status(500).json({
      success: false,
      message: "Erro ao buscar perfil do cliente",
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