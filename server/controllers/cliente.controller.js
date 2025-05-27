const db = require('../models');
const Cliente = db.Cliente;
const Utilizador = db.Utilizador;
const TipoUtilizador = db.TipoUtilizador;

// Obter perfil do cliente
exports.getPerfil = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("\n=== BUSCANDO PERFIL DO CLIENTE ===", userId);

    const utilizador = await Utilizador.findOne({
      where: { id: userId },
      include: [{
        model: TipoUtilizador,
        as: 'tipoUtilizador',
        attributes: ['nome']
      }]
    });

    if (!utilizador) {
      return res.status(404).json({ success: false, message: "Utilizador não encontrado" });
    }

    let cliente = await Cliente.findOne({ where: { utilizador_id: userId } });

    if (!cliente) {
      cliente = await Cliente.create({
        utilizador_id: userId,
        nome: utilizador.nome,
        email: utilizador.email,
        telefone: utilizador.telefone || null,
        dataNascimento: null,
        morada: null,
        nif: null
      });
      console.log("✅ Novo cliente criado para utilizador_id:", cliente.utilizador_id);
    }

    res.json({
      success: true,
      data: {
        utilizador_id: cliente.utilizador_id,
        nome: cliente.nome,
        email: cliente.email,
        telefone: cliente.telefone,
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
    });

  } catch (error) {
    console.error("❌ Erro ao buscar perfil:", error);
    res.status(500).json({ success: false, message: "Erro ao buscar perfil do cliente", error: error.message });
  }
};

// Atualizar perfil do cliente
exports.updatePerfil = async (req, res) => {
  try {
    const userId = req.user.id;
    const { nome, email, telefone, dataNascimento, morada, nif } = req.body;

    const utilizador = await Utilizador.findByPk(userId);
    if (!utilizador) {
      return res.status(404).json({ success: false, message: "Utilizador não encontrado" });
    }

    // Atualiza o utilizador
    await utilizador.update({
      nome: nome || utilizador.nome,
      email: email || utilizador.email,
      telefone: telefone || utilizador.telefone
    });

    // Atualiza ou cria cliente
    let cliente = await Cliente.findOne({ where: { utilizador_id: userId } });
    if (!cliente) {
      cliente = await Cliente.create({
        utilizador_id: userId,
        nome: nome || utilizador.nome,
        email: email || utilizador.email,
        telefone: telefone || utilizador.telefone,
        dataNascimento,
        morada,
        nif
      });
    } else {
      await cliente.update({
        nome: nome || cliente.nome,
        email: email || cliente.email,
        telefone: telefone || cliente.telefone,
        dataNascimento: dataNascimento || cliente.dataNascimento,
        morada: morada || cliente.morada,
        nif: nif || cliente.nif
      });
    }

    res.json({
      success: true,
      message: "Perfil atualizado com sucesso",
      data: {
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
    console.error("❌ Erro ao atualizar perfil:", error);
    res.status(500).json({ success: false, message: "Erro ao atualizar perfil", error: error.message });
  }
};

// Obter consultas do cliente
exports.getClienteConsultas = async (req, res) => {
  try {
    res.status(200).json({
      message: "Funcionalidade em desenvolvimento",
      consultas: []
    });
  } catch (error) {
    console.error("Erro ao obter consultas do cliente:", error);
    res.status(500).json({ message: "Erro ao obter consultas do cliente", error: error.message });
  }
};
