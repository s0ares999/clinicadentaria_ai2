const db = require('../models');
const Fatura = db.Fatura;
const Cliente = db.Cliente;

// Criar uma nova fatura
exports.create = async (req, res) => {
  try {
    // Validar requisição
    if (!req.body.numero || !req.body.valor || !req.body.clienteId) {
      return res.status(400).json({
        message: "Número da fatura, valor e ID do cliente são obrigatórios!"
      });
    }

    // Criar uma fatura
    const fatura = {
      numero: req.body.numero,
      data: req.body.data || new Date(),
      valor: req.body.valor,
      estado: req.body.estado || 'pendente',
      descricao: req.body.descricao,
      clienteId: req.body.clienteId
    };

    // Verificar se o cliente existe
    const cliente = await Cliente.findByPk(req.body.clienteId);
    if (!cliente) {
      return res.status(404).json({
        message: `Cliente com id=${req.body.clienteId} não encontrado.`
      });
    }

    // Salvar a fatura no banco de dados
    const data = await Fatura.create(fatura);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Ocorreu um erro ao criar a fatura."
    });
  }
};

// Buscar todas as faturas
exports.findAll = async (req, res) => {
  try {
    const data = await Fatura.findAll({
      include: [{
        model: Cliente,
        as: 'cliente',
        attributes: ['id', 'nome', 'email']
      }]
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Ocorreu um erro ao buscar as faturas."
    });
  }
};

// Buscar as faturas de um cliente específico
exports.findByCliente = async (req, res) => {
  const clienteId = req.params.clienteId;

  try {
    const data = await Fatura.findAll({
      where: { clienteId: clienteId },
      include: [{
        model: Cliente,
        as: 'cliente',
        attributes: ['id', 'nome', 'email']
      }]
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || `Erro ao buscar faturas do cliente com id=${clienteId}.`
    });
  }
};

// Buscar uma única fatura pelo id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Fatura.findByPk(id, {
      include: [{
        model: Cliente,
        as: 'cliente',
        attributes: ['id', 'nome', 'email']
      }]
    });
    
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({
        message: `Fatura com id=${id} não encontrada.`
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Erro ao buscar fatura com id=${id}`
    });
  }
};

// Atualizar uma fatura pelo id
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Fatura.update(req.body, {
      where: { id: id }
    });

    if (num == 1) {
      res.status(200).json({
        message: "Fatura atualizada com sucesso."
      });
    } else {
      res.status(404).json({
        message: `Não foi possível atualizar a fatura com id=${id}. Fatura não encontrada ou corpo da requisição vazio!`
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Erro ao atualizar fatura com id=${id}`
    });
  }
};

// Deletar uma fatura pelo id
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Fatura.destroy({
      where: { id: id }
    });

    if (num == 1) {
      res.status(200).json({
        message: "Fatura excluída com sucesso!"
      });
    } else {
      res.status(404).json({
        message: `Não foi possível excluir a fatura com id=${id}. Fatura não encontrada!`
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Não foi possível excluir a fatura com id=${id}`
    });
  }
};
