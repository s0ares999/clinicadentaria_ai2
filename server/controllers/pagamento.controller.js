const db = require('../models');
const Pagamento = db.Pagamento;
const PagamentoStatus = db.PagamentoStatus;
const Consulta = db.Consulta;
const Utilizador = db.Utilizador;

// Criar novo pagamento
exports.create = async (req, res) => {
  try {
    // Validar requisição
    if (!req.body.consulta_id || !req.body.valor) {
      return res.status(400).json({
        message: "Consulta e valor são obrigatórios!"
      });
    }

    // Verificar se a consulta existe
    const consulta = await Consulta.findByPk(req.body.consulta_id);
    if (!consulta) {
      return res.status(404).json({
        message: `Consulta com ID ${req.body.consulta_id} não encontrada!`
      });
    }

    // Verificar se já existe pagamento para esta consulta
    const pagamentoExistente = await Pagamento.findOne({
      where: { consulta_id: req.body.consulta_id }
    });

    if (pagamentoExistente) {
      return res.status(400).json({
        message: "Já existe um pagamento registado para esta consulta!"
      });
    }

    // Buscar o status padrão (ex: "Pendente")
    const statusPendente = await PagamentoStatus.findOne({
      where: { nome: 'Pendente' }
    });

    if (!statusPendente) {
      return res.status(500).json({
        message: "Status de pagamento não encontrado!"
      });
    }

    // Criar pagamento
    const pagamento = await Pagamento.create({
      consulta_id: req.body.consulta_id,
      valor: req.body.valor,
      status_id: statusPendente.id
    });

    res.status(201).json({
      message: "Pagamento registado com sucesso!",
      pagamento: pagamento
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Ocorreu um erro ao registar o pagamento."
    });
  }
};

// Buscar todos os pagamentos
exports.findAll = async (req, res) => {
  try {
    const pagamentos = await Pagamento.findAll({
      include: [
        {
          model: Consulta,
          as: 'consulta',
          include: [
            {
              model: Utilizador,
              as: 'cliente',
              attributes: ['id', 'nome', 'email']
            },
            {
              model: Utilizador,
              as: 'medico',
              attributes: ['id', 'nome']
            }
          ]
        },
        {
          model: PagamentoStatus,
          as: 'status'
        }
      ]
    });

    res.status(200).json(pagamentos);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Ocorreu um erro ao buscar os pagamentos."
    });
  }
};

// Buscar pagamento por ID
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const pagamento = await Pagamento.findByPk(id, {
      include: [
        {
          model: Consulta,
          as: 'consulta',
          include: [
            {
              model: Utilizador,
              as: 'cliente',
              attributes: ['id', 'nome', 'email']
            },
            {
              model: Utilizador,
              as: 'medico',
              attributes: ['id', 'nome']
            }
          ]
        },
        {
          model: PagamentoStatus,
          as: 'status'
        }
      ]
    });

    if (!pagamento) {
      return res.status(404).json({
        message: `Pagamento com ID ${id} não encontrado!`
      });
    }

    res.status(200).json(pagamento);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Ocorreu um erro ao buscar o pagamento."
    });
  }
};

// Atualizar pagamento
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Verificar se o pagamento existe
    const pagamento = await Pagamento.findByPk(id);
    if (!pagamento) {
      return res.status(404).json({
        message: `Pagamento com ID ${id} não encontrado!`
      });
    }

    // Atualizar pagamento
    await pagamento.update(req.body);

    res.status(200).json({
      message: "Pagamento atualizado com sucesso!",
      pagamento: pagamento
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Ocorreu um erro ao atualizar o pagamento."
    });
  }
};

// Processar pagamento (marcar como pago)
exports.processPayment = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Verificar se o pagamento existe
    const pagamento = await Pagamento.findByPk(id);
    if (!pagamento) {
      return res.status(404).json({
        message: `Pagamento com ID ${id} não encontrado!`
      });
    }

    // Buscar o status "Pago"
    const statusPago = await PagamentoStatus.findOne({
      where: { nome: 'Pago' }
    });

    if (!statusPago) {
      return res.status(500).json({
        message: "Status 'Pago' não encontrado!"
      });
    }

    // Atualizar status do pagamento
    await pagamento.update({ status_id: statusPago.id });

    res.status(200).json({
      message: "Pagamento processado com sucesso!",
      pagamento: pagamento
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Ocorreu um erro ao processar o pagamento."
    });
  }
}; 