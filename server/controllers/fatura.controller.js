const db = require('../models');
const Fatura = db.Fatura;
const Pagamento = db.Pagamento;
const FaturaPagamento = db.FaturaPagamento;
const FaturaStatus = db.FaturaStatus;
const Consulta = db.Consulta;
const Utilizador = db.Utilizador;
const PDFService = require('../services/pdf.service');

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
  },
  
  // Obter faturas do cliente logado
  getFaturasByCliente: async (req, res) => {
    try {
      const userId = req.userId;
      console.log("Buscando faturas para o cliente ID:", userId);
      
      // Buscar faturas do cliente logado
      const faturas = await Fatura.findAll({
        include: [
          {
            model: FaturaStatus,
            as: 'status'
          },
          {
            model: Consulta,
            as: 'consulta',
            where: { utilizador_id: userId },
            include: [
              {
                model: Utilizador,
                as: 'utilizador',
                attributes: ['id', 'nome', 'email']
              }
            ]
          }
        ],
        order: [['id', 'DESC']]
      });

      // Log para depuração do formato dos dados
      if (faturas.length > 0) {
        console.log("Exemplo de fatura - primeiro registro:", {
          id: faturas[0].id,
          valor_total: faturas[0].valor_total,
          tipo_valor_total: typeof faturas[0].valor_total,
          observacoes: faturas[0].observacoes,
          status: faturas[0].status ? {
            id: faturas[0].status.id,
            nome: faturas[0].status.nome
          } : null
        });
      } else {
        console.log("Nenhuma fatura encontrada para este cliente");
      }
      
      res.status(200).json(faturas);
    } catch (error) {
      console.error("Erro ao buscar faturas do cliente:", error);
      res.status(500).json({
        message: error.message || "Ocorreu um erro ao buscar as faturas do cliente."
      });
    }
  },
  
  // Método para obter uma fatura específica
  getFaturaById: async (req, res) => {
    try {
      const id = req.params.id;
      const userId = req.userId;

      const fatura = await Fatura.findByPk(id, {
        include: [
          {
            model: FaturaStatus,
            as: 'status'
          },
          {
            model: Consulta,
            as: 'consulta',
            include: [
              {
                model: Utilizador,
                as: 'utilizador',
                attributes: ['id', 'nome', 'email']
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

      // Verificar se o utilizador tem permissão para ver esta fatura
      if (fatura.consulta && fatura.consulta.utilizador_id !== userId) {
        return res.status(403).json({
          message: "Você não tem permissão para ver esta fatura!"
        });
      }

      res.status(200).json(fatura);
    } catch (error) {
      console.error("Erro ao buscar fatura:", error);
      res.status(500).json({
        message: error.message || "Ocorreu um erro ao buscar a fatura."
      });
    }
  },
  
  // Criar fatura para uma consulta
  createFatura: async (req, res) => {
    try {
      const consultaId = req.params.consultaId;
      const { valor_total, observacoes, status_id } = req.body;

      // Verificar se a consulta existe
      const consulta = await Consulta.findByPk(consultaId, {
        include: [
          {
            model: Utilizador,
            as: 'utilizador',
            attributes: ['id', 'nome', 'email']
          }
        ]
      });

      if (!consulta) {
        return res.status(404).json({
          message: "Consulta não encontrada!"
        });
      }

      // Verificar se a consulta já possui uma fatura
      const faturaExistente = await Fatura.findOne({
        where: { consulta_id: consultaId }
      });

      if (faturaExistente) {
        return res.status(400).json({
          message: "Esta consulta já possui uma fatura associada."
        });
      }

      // Criar a fatura
      const fatura = await Fatura.create({
        consulta_id: consultaId,
        valor_total,
        observacoes,
        status_id: status_id || 1 // 1 = Emitida (padrão)
      });
      
      // Atualizar a consulta para indicar que possui fatura
      await consulta.update({ tem_fatura: true });

      // Buscar fatura completa com relações
      const faturaCompleta = await Fatura.findByPk(fatura.id, {
        include: [
          {
            model: FaturaStatus,
            as: 'status'
          },
          {
            model: Consulta,
            as: 'consulta',
            include: [
              {
                model: Utilizador,
                as: 'utilizador',
                attributes: ['id', 'nome', 'email']
              }
            ]
          }
        ]
      });

      res.status(201).json({
        message: "Fatura criada com sucesso!",
        fatura: faturaCompleta
      });
    } catch (error) {
      console.error("Erro ao criar fatura para consulta:", error);
      res.status(500).json({
        message: error.message || "Ocorreu um erro ao criar a fatura."
      });
    }
  },
  
  // Atualizar status da fatura
  updateFaturaStatus: async (req, res) => {
    try {
      const id = req.params.id;
      const { statusId } = req.body;

      if (!statusId) {
        return res.status(400).json({
          message: "ID do status é obrigatório!"
        });
      }

      // Verificar se o status existe
      const status = await FaturaStatus.findByPk(statusId);
      if (!status) {
        return res.status(404).json({
          message: `Status com ID ${statusId} não encontrado!`
        });
      }

      // Buscar a fatura
      const fatura = await Fatura.findByPk(id);
      if (!fatura) {
        return res.status(404).json({
          message: `Fatura com ID ${id} não encontrada!`
        });
      }

      // Atualizar status
      await fatura.update({ status_id: statusId });

      res.status(200).json({
        message: `Fatura atualizada para status: ${status.nome}`,
        fatura: {
          id: fatura.id,
          status: status.nome
        }
      });
    } catch (error) {
      console.error("Erro ao atualizar status da fatura:", error);
      res.status(500).json({
        message: error.message || "Ocorreu um erro ao atualizar o status da fatura."
      });
    }
  },
  
  // Registrar pagamento da fatura
  registerPagamento: async (req, res) => {
    try {
      const faturaId = req.params.id;
      const { data_pagamento, metodo_pagamento, valor } = req.body;

      // Buscar a fatura
      const fatura = await Fatura.findByPk(faturaId);
      if (!fatura) {
        return res.status(404).json({
          message: `Fatura com ID ${faturaId} não encontrada!`
        });
      }

      // Criar registro de pagamento
      const pagamento = await FaturaPagamento.create({
        fatura_id: faturaId,
        data_pagamento: data_pagamento || new Date(),
        metodo_pagamento,
        valor: valor || fatura.valor_total
      });

      // Atualizar status da fatura para "Paga"
      const statusPaga = await FaturaStatus.findOne({
        where: { nome: 'Paga' }
      });

      if (statusPaga) {
        await fatura.update({ status_id: statusPaga.id });
      }

      res.status(200).json({
        message: "Pagamento registrado com sucesso!",
        pagamento
      });
    } catch (error) {
      console.error("Erro ao registrar pagamento:", error);
      res.status(500).json({
        message: error.message || "Ocorreu um erro ao registrar o pagamento."
      });
    }
  },

  // getFaturasByMedico: Obtém todas as faturas relacionadas às consultas atendidas pelo médico logado
  getFaturasByMedico: async (req, res) => {
    try {
      const userId = req.userId;

      if (!userId) {
        return res.status(401).json({
          message: "Utilizador não autenticado!"
        });
      }

      // Como não temos um campo específico para médico nas consultas,
      // vamos buscar todas as faturas e permitir que o frontend filtre
      // ou implemente uma lógica adicional se necessário
      const faturas = await Fatura.findAll({
        include: [
          {
            model: FaturaStatus,
            as: 'status'
          },
          {
            model: Consulta,
            as: 'consulta',
            include: [
              {
                model: Utilizador,
                as: 'utilizador',
                attributes: ['id', 'nome', 'email']
              }
            ]
          }
        ],
        order: [['createdAt', 'DESC']]
      });

      res.status(200).json(faturas);
    } catch (error) {
      console.error("Erro ao buscar faturas do médico:", error);
      res.status(500).json({
        message: error.message || "Ocorreu um erro ao buscar as faturas do médico."
      });
    }
  },

  // updateFatura: Atualiza os dados de uma fatura existente
  updateFatura: async (req, res) => {
    try {
      const faturaId = req.params.id;
      const { valor_total, observacoes } = req.body;
      
      // Verificar se a fatura existe
      const fatura = await Fatura.findByPk(faturaId);
      
      if (!fatura) {
        return res.status(404).json({
          message: "Fatura não encontrada!"
        });
      }
      
      // Verificar se a fatura já foi paga ou cancelada
      if (fatura.status_id !== 1) { // 1 = Emitida
        return res.status(400).json({
          message: "Não é possível editar faturas que já foram pagas ou canceladas."
        });
      }
      
      // Atualizar a fatura
      await fatura.update({
        valor_total: valor_total || fatura.valor_total,
        observacoes: observacoes !== undefined ? observacoes : fatura.observacoes
      });
      
      // Buscar fatura atualizada com relações
      const faturaAtualizada = await Fatura.findByPk(faturaId, {
        include: [
          {
            model: FaturaStatus,
            as: 'status'
          },
          {
            model: Consulta,
            as: 'consulta',
            include: [
              {
                model: Utilizador,
                as: 'utilizador',
                attributes: ['id', 'nome', 'email']
              }
            ]
          }
        ]
      });
      
      res.status(200).json({
        message: "Fatura atualizada com sucesso!",
        fatura: faturaAtualizada
      });
    } catch (error) {
      console.error("Erro ao atualizar fatura:", error);
      res.status(500).json({
        message: error.message || "Ocorreu um erro ao atualizar a fatura."
      });
    }
  },

  // getFaturaPDF: Gera e serve o PDF da fatura
  getFaturaPDF: async (req, res) => {
    try {
      const faturaId = req.params.id;
      
      // Buscar dados da fatura com todas as relações necessárias
      const fatura = await Fatura.findByPk(faturaId, {
        include: [
          {
            model: FaturaStatus,
            as: 'status'
          },
          {
            model: Consulta,
            as: 'consulta',
            include: [
              {
                model: Utilizador,
                as: 'utilizador',
                attributes: ['id', 'nome', 'email']
              }
            ]
          }
        ]
      });
      
      if (!fatura) {
        return res.status(404).json({
          message: "Fatura não encontrada!"
        });
      }
      
      // Verificar se o usuário atual tem permissão para acessar esta fatura
      const currentUser = req.userId;
      
      // Se o usuário for o cliente da consulta ou o médico, permitir acesso
      if (fatura.consulta.utilizador.id !== currentUser) {
        const medico = await db.Medico.findOne({
          where: {
            utilizador_id: currentUser
          }
        });
        
        if (!medico) {
          return res.status(403).json({
            message: "Você não tem permissão para acessar esta fatura."
          });
        }
      }
      
      // Gerar o PDF
      const pdfBuffer = await PDFService.generateInvoicePDF(fatura);
      
      // Configurar os headers para download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename="fatura-${faturaId}.pdf"`);
      res.setHeader('Content-Length', pdfBuffer.length);
      
      // Enviar o buffer do PDF como resposta
      res.send(pdfBuffer);
      
    } catch (error) {
      console.error("Erro ao gerar PDF da fatura:", error);
      res.status(500).json({
        message: error.message || "Ocorreu um erro ao gerar o PDF da fatura."
      });
    }
  },
};

module.exports = controller;
