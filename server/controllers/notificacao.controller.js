const db = require('../models');
const Notificacao = db.Notificacao;
const NotificacaoStatus = db.NotificacaoStatus;
const Utilizador = db.Utilizador;

// Criar nova notificação
exports.create = async (req, res) => {
  try {
    // Validar requisição
    if (!req.body.utilizador_id || !req.body.mensagem) {
      return res.status(400).json({
        message: "Utilizador e mensagem são obrigatórios!"
      });
    }

    // Verificar se o utilizador existe
    const utilizador = await Utilizador.findByPk(req.body.utilizador_id);
    if (!utilizador) {
      return res.status(404).json({
        message: "Utilizador não encontrado!"
      });
    }

    // Buscar o status padrão (ex: "Não Lida")
    const statusNaoLida = await NotificacaoStatus.findOne({
      where: { nome: 'Não Lida' }
    });

    if (!statusNaoLida) {
      return res.status(500).json({
        message: "Status de notificação não encontrado!"
      });
    }

    // Criar notificação
    const notificacao = await Notificacao.create({
      utilizador_id: req.body.utilizador_id,
      mensagem: req.body.mensagem,
      status_id: statusNaoLida.id,
      data_envio: new Date()
    });

    res.status(201).json({
      message: "Notificação criada com sucesso!",
      notificacao: notificacao
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Ocorreu um erro ao criar a notificação."
    });
  }
};

// Buscar todas as notificações
exports.findAll = async (req, res) => {
  try {
    const notificacoes = await Notificacao.findAll({
      include: [
        {
          model: Utilizador,
          as: 'utilizador',
          attributes: ['id', 'nome', 'email']
        },
        {
          model: NotificacaoStatus,
          as: 'status'
        }
      ]
    });

    res.status(200).json(notificacoes);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Ocorreu um erro ao buscar as notificações."
    });
  }
};

// Buscar notificação por ID
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const notificacao = await Notificacao.findByPk(id, {
      include: [
        {
          model: Utilizador,
          as: 'utilizador',
          attributes: ['id', 'nome', 'email']
        },
        {
          model: NotificacaoStatus,
          as: 'status'
        }
      ]
    });

    if (!notificacao) {
      return res.status(404).json({
        message: `Notificação com ID ${id} não encontrada!`
      });
    }

    res.status(200).json(notificacao);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Ocorreu um erro ao buscar a notificação."
    });
  }
};

// Buscar notificações por utilizador
exports.findByUtilizador = async (req, res) => {
  try {
    const utilizador_id = req.params.utilizador_id;
    
    // Verificar se o utilizador existe
    const utilizador = await Utilizador.findByPk(utilizador_id);
    if (!utilizador) {
      return res.status(404).json({
        message: "Utilizador não encontrado!"
      });
    }

    const notificacoes = await Notificacao.findAll({
      where: { utilizador_id: utilizador_id },
      include: [
        {
          model: NotificacaoStatus,
          as: 'status'
        }
      ]
    });

    res.status(200).json(notificacoes);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Ocorreu um erro ao buscar as notificações."
    });
  }
};

// Marcar notificação como lida
exports.markAsRead = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Verificar se a notificação existe
    const notificacao = await Notificacao.findByPk(id);
    if (!notificacao) {
      return res.status(404).json({
        message: `Notificação com ID ${id} não encontrada!`
      });
    }

    // Buscar o status "Lida"
    const statusLida = await NotificacaoStatus.findOne({
      where: { nome: 'Lida' }
    });

    if (!statusLida) {
      return res.status(500).json({
        message: "Status 'Lida' não encontrado!"
      });
    }

    // Atualizar status da notificação
    await notificacao.update({ status_id: statusLida.id });

    res.status(200).json({
      message: "Notificação marcada como lida com sucesso!",
      notificacao: notificacao
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Ocorreu um erro ao atualizar a notificação."
    });
  }
}; 