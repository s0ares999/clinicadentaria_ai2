const db = require('../models');
const Cliente = db.Cliente;

// Criar e salvar um novo cliente
exports.create = async (req, res) => {
  try {
    // Validar requisição
    if (!req.body.nome || !req.body.email) {
      return res.status(400).json({
        message: "Nome e email são obrigatórios!"
      });
    }

    // Criar um cliente
    const cliente = {
      nome: req.body.nome,
      email: req.body.email,
      telefone: req.body.telefone,
      dataNascimento: req.body.dataNascimento,
      morada: req.body.morada,
      nif: req.body.nif,
      historico: req.body.historico
    };

    // Salvar o cliente no banco de dados
    const data = await Cliente.create(cliente);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Ocorreu um erro ao criar o cliente."
    });
  }
};

// Buscar todos os clientes do banco de dados
exports.findAll = async (req, res) => {
  try {
    const data = await Cliente.findAll();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Ocorreu um erro ao buscar os clientes."
    });
  }
};

// Buscar um único cliente pelo id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Cliente.findByPk(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({
        message: `Cliente com id=${id} não encontrado.`
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Erro ao buscar cliente com id=${id}`
    });
  }
};

// Atualizar um cliente pelo id
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Cliente.update(req.body, {
      where: { id: id }
    });

    if (num == 1) {
      res.status(200).json({
        message: "Cliente atualizado com sucesso."
      });
    } else {
      res.status(404).json({
        message: `Não foi possível atualizar o cliente com id=${id}. Cliente não encontrado ou corpo da requisição vazio!`
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Erro ao atualizar cliente com id=${id}`
    });
  }
};

// Deletar um cliente pelo id
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Cliente.destroy({
      where: { id: id }
    });

    if (num == 1) {
      res.status(200).json({
        message: "Cliente excluído com sucesso!"
      });
    } else {
      res.status(404).json({
        message: `Não foi possível excluir o cliente com id=${id}. Cliente não encontrado!`
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Não foi possível excluir o cliente com id=${id}`
    });
  }
};
