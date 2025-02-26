const db = require('../models');
const Agendamento = db.Agendamento;
const Cliente = db.Cliente;

// Criar e salvar um novo agendamento
exports.create = async (req, res) => {
  try {
    // Validar requisição
    if (!req.body.data || !req.body.horaInicio || !req.body.horaFim || !req.body.tipo || !req.body.clienteId) {
      return res.status(400).json({
        message: "Data, hora de início, hora de fim, tipo e ID do cliente são obrigatórios!"
      });
    }

    // Verificar se o cliente existe
    const cliente = await Cliente.findByPk(req.body.clienteId);
    if (!cliente) {
      return res.status(404).json({
        message: `Cliente com id=${req.body.clienteId} não encontrado.`
      });
    }

    // Criar um agendamento
    const agendamento = {
      data: req.body.data,
      horaInicio: req.body.horaInicio,
      horaFim: req.body.horaFim,
      tipo: req.body.tipo,
      status: req.body.status || 'agendado',
      observacoes: req.body.observacoes,
      clienteId: req.body.clienteId
    };

    // Salvar o agendamento no banco de dados
    const data = await Agendamento.create(agendamento);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Ocorreu um erro ao criar o agendamento."
    });
  }
};

// Buscar todos os agendamentos
exports.findAll = async (req, res) => {
  try {
    const data = await Agendamento.findAll({
      include: [{
        model: Cliente,
        as: 'cliente',
        attributes: ['id', 'nome', 'email', 'telefone']
      }]
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Ocorreu um erro ao buscar os agendamentos."
    });
  }
};

// Buscar os agendamentos de um cliente específico
exports.findByCliente = async (req, res) => {
  const clienteId = req.params.clienteId;

  try {
    const data = await Agendamento.findAll({
      where: { clienteId: clienteId },
      include: [{
        model: Cliente,
        as: 'cliente',
        attributes: ['id', 'nome', 'email', 'telefone']
      }]
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || `Erro ao buscar agendamentos do cliente com id=${clienteId}.`
    });
  }
};

// Buscar agendamentos por data
exports.findByData = async (req, res) => {
  const data = req.params.data;

  try {
    const agendamentos = await Agendamento.findAll({
      where: { data: data },
      include: [{
        model: Cliente,
        as: 'cliente',
        attributes: ['id', 'nome', 'email', 'telefone']
      }]
    });
    res.status(200).json(agendamentos);
  } catch (err) {
    res.status(500).json({
      message: err.message || `Erro ao buscar agendamentos da data ${data}.`
    });
  }
};

// Buscar um único agendamento pelo id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Agendamento.findByPk(id, {
      include: [{
        model: Cliente,
        as: 'cliente',
        attributes: ['id', 'nome', 'email', 'telefone']
      }]
    });
    
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({
        message: `Agendamento com id=${id} não encontrado.`
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Erro ao buscar agendamento com id=${id}`
    });
  }
};

// Atualizar um agendamento pelo id
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Agendamento.update(req.body, {
      where: { id: id }
    });

    if (num == 1) {
      res.status(200).json({
        message: "Agendamento atualizado com sucesso."
      });
    } else {
      res.status(404).json({
        message: `Não foi possível atualizar o agendamento com id=${id}. Agendamento não encontrado ou corpo da requisição vazio!`
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Erro ao atualizar agendamento com id=${id}`
    });
  }
};

// Deletar um agendamento pelo id
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Agendamento.destroy({
      where: { id: id }
    });

    if (num == 1) {
      res.status(200).json({
        message: "Agendamento excluído com sucesso!"
      });
    } else {
      res.status(404).json({
        message: `Não foi possível excluir o agendamento com id=${id}. Agendamento não encontrado!`
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Não foi possível excluir o agendamento com id=${id}`
    });
  }
};
