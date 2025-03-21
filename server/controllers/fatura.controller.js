const db = require('../models');
const Fatura = db.Fatura;
const Pagamento = db.Pagamento;
const FaturaPagamento = db.FaturaPagamento;
const FaturaStatus = db.FaturaStatus;
const Consulta = db.Consulta;
const Utilizador = db.Utilizador;

const controller = {
  // Criar nova fatura
  create: async (req, res) => {
    try {
      // Validar requisição
      if (!req.body.valor_total || !req.body.pagamentos) {
        return res.status(400).json({
          message: "Valor total e pagamentos são obrigatórios!"
        });
      }

      // Verificar se os pagamentos existem
      const pagamentosIds = req.body.pagamentos;
      const pagamentos = await Pagamento.findAll({
        where: { id: pagamentosIds }
      });

      if (pagamentos.length !== pagamentosIds.length) {
        return res.status(404).json({
          message: "Um ou mais pagamentos não foram encontrados!"
        });
      }

      // Buscar o status padrão (ex: "Emitida")
      const statusEmitida = await FaturaStatus.findOne({
        where: { nome: 'Emitida' }
      });

      if (!statusEmitida) {
        return res.status(500).json({
          message: "Status de fatura não encontrado!"
        });
      }

      // Criar fatura
      const fatura = await Fatura.create({
        valor_total: req.body.valor_total,
        status_id: statusEmitida.id
      });

      // Associar pagamentos à fatura
      for (const pagamentoId of pagamentosIds) {
        await FaturaPagamento.create({
          fatura_id: fatura.id,
          pagamento_id: pagamentoId
        });
      }

      // Buscar fatura com pagamentos associados
      const faturaCompleta = await Fatura.findByPk(fatura.id, {
        include: [
          {
            model: FaturaStatus,
            as: 'status'
          },
          {
            model: Pagamento,
            as: 'pagamentos'
          }
        ]
      });

      res.status(201).json({
        message: "Fatura criada com sucesso!",
        fatura: faturaCompleta
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || "Ocorreu um erro ao criar a fatura."
      });
    }
  },

  // Buscar todas as faturas
  findAll: async (req, res) => {
    try {
      const faturas = await Fatura.findAll({
        include: [
          {
            model: FaturaStatus,
            as: 'status'
          },
          {
            model: Pagamento,
            as: 'pagamentos',
            include: [
              {
                model: Consulta,
                as: 'consulta',
                include: [
                  {
                    model: Utilizador,
                    as: 'cliente',
                    attributes: ['id', 'nome', 'email']
                  }
                ]
              }
            ]
          }
        ]
      });

      res.status(200).json(faturas);
    } catch (error) {
      res.status(500).json({
        message: error.message || "Ocorreu um erro ao buscar as faturas."
      });
    }
  },

  // Buscar fatura por ID
  findOne: async (req, res) => {
    try {
      const id = req.params.id;
      const fatura = await Fatura.findByPk(id, {
        include: [
          {
            model: FaturaStatus,
            as: 'status'
          },
          {
            model: Pagamento,
            as: 'pagamentos',
            include: [
              {
                model: Consulta,
                as: 'consulta',
                include: [
                  {
                    model: Utilizador,
                    as: 'cliente',
                    attributes: ['id', 'nome', 'email']
                  }
                ]
              }
            ]
          }
        ]
      });

      if (!fatura) {
        return res.status(404).json({
          message: `Fatura com ID ${id} não encontrada!`
        });
      }

      res.status(200).json(fatura);
    } catch (error) {
      res.status(500).json({
        message: error.message || "Ocorreu um erro ao buscar a fatura."
      });
    }
  },

  // Atualizar fatura
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const fatura = await Fatura.findByPk(id);
      
      if (!fatura) {
        return res.status(404).json({
          message: `Fatura com ID ${id} não encontrada!`
        });
      }

      await fatura.update(req.body);

      res.status(200).json({
        message: "Fatura atualizada com sucesso!",
        fatura: fatura
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || "Ocorreu um erro ao atualizar a fatura."
      });
    }
  },

  // Marcar fatura como paga
  markAsPaid: async (req, res) => {
    try {
      const id = req.params.id;
      const fatura = await Fatura.findByPk(id);
      
      if (!fatura) {
        return res.status(404).json({
          message: `Fatura com ID ${id} não encontrada!`
        });
      }

      const statusPaga = await FaturaStatus.findOne({
        where: { nome: 'Paga' }
      });

      if (!statusPaga) {
        return res.status(500).json({
          message: "Status 'Paga' não encontrado!"
        });
      }

      await fatura.update({ status_id: statusPaga.id });

      res.status(200).json({
        message: "Fatura marcada como paga com sucesso!",
        fatura: fatura
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || "Ocorreu um erro ao atualizar a fatura."
      });
    }
  },

  // Cancelar fatura
  cancel: async (req, res) => {
    try {
      const id = req.params.id;
      const fatura = await Fatura.findByPk(id);
      
      if (!fatura) {
        return res.status(404).json({
          message: `Fatura com ID ${id} não encontrada!`
        });
      }

      const statusCancelada = await FaturaStatus.findOne({
        where: { nome: 'Cancelada' }
      });

      if (!statusCancelada) {
        return res.status(500).json({
          message: "Status 'Cancelada' não encontrado!"
        });
      }

      await fatura.update({ status_id: statusCancelada.id });

      res.status(200).json({
        message: "Fatura cancelada com sucesso!",
        fatura: fatura
      });
    } catch (error) {
      res.status(500).json({
        message: error.message || "Ocorreu um erro ao cancelar a fatura."
      });
    }
  }
};

module.exports = controller;
