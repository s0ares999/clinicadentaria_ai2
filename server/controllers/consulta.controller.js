const db = require('../models');
const Consulta = db.Consulta;
const ConsultaStatus = db.ConsultaStatus;
const Utilizador = db.Utilizador;
const Medico = db.Medico;
const Disponibilidade = db.Disponibilidade;
const Pagamento = db.Pagamento;
const { Op } = require('sequelize');
const TipoUtilizador = db.TipoUtilizador;

const ConsultaController = {
  // Criar nova consulta
async create(req, res) {
  try {
    console.log("Dados recebidos:", req.body);

    // Validação mínima
    if (!req.body.data_hora) {
      return res.status(400).json({
        success: false,
        message: "Campo obrigatório não preenchido: data_hora é necessário!"
      });
    }

    // Verificar se é um médico marcando para um cliente
    let utilizador_id = req.userId; // ID do usuário logado (padrão)
    let medico_id = null;
    let status_id = 1; // Status padrão "Pendente"

    // Se foi fornecido um email de cliente, significa que é um médico marcando
    if (req.body.cliente_email) {
      console.log("Médico marcando consulta para cliente:", req.body.cliente_email);
      
      // Verificar se o usuário logado é médico
      const medicoLogado = await Utilizador.findByPk(req.userId, {
        include: [{
          model: TipoUtilizador,
          as: 'tipoUtilizador'
        }]
      });

      if (!medicoLogado || medicoLogado.tipoUtilizador?.nome.toLowerCase() !== 'medico') {
        return res.status(403).json({
          success: false,
          message: "Apenas médicos podem marcar consultas para clientes!"
        });
      }

      // Buscar o cliente pelo email
      const cliente = await Utilizador.findOne({
        where: { email: req.body.cliente_email },
        include: [{
          model: TipoUtilizador,
          as: 'tipoUtilizador'
        }]
      });

      if (!cliente) {
        return res.status(404).json({
          success: false,
          message: "Cliente não encontrado com este email!"
        });
      }

      if (cliente.tipoUtilizador?.nome.toLowerCase() !== 'cliente') {
        return res.status(400).json({
          success: false,
          message: "O email fornecido não pertence a um cliente!"
        });
      }

      // Configurar dados para consulta marcada pelo médico
      utilizador_id = cliente.id; // ID do cliente
      medico_id = req.userId; // ID do médico logado
      status_id = req.body.status_id || 2; // Status "Confirmada" quando médico marca
      
      console.log(`Médico ${medico_id} marcando consulta para cliente ${utilizador_id}`);
    }

    if (!utilizador_id) {
      return res.status(401).json({
        success: false,
        message: "Utilizador não autenticado!"
      });
    }

    // Verificar se o status existe
    const statusExists = await ConsultaStatus.findByPk(status_id);

    if (!statusExists) {
      console.error(`Status de consulta com ID ${status_id} não encontrado. Inicializando status...`);
      try {
        // Tentar inicializar os status
        const dbInit = require('../config/db.init');
        await dbInit.initConsultaStatus();
        console.log("Status de consulta inicializados com sucesso!");
      } catch (initError) {
        console.error("Erro ao inicializar status de consulta:", initError);
        return res.status(500).json({
          success: false,
          message: "Erro interno: não foi possível criar status de consulta.",
          error: process.env.NODE_ENV === 'development' ? initError.message : undefined
        });
      }
    }

    // Verificar se já existe uma consulta no mesmo horário
    const consultaExistente = await Consulta.findOne({
      where: {
        data_hora: req.body.data_hora
      }
    });

    if (consultaExistente) {
      return res.status(409).json({
        success: false,
        message: "Já existe uma consulta agendada para esse horário. Por favor, escolha outro horário."
      });
    }

    // Criar a consulta
    const consultaData = {
      utilizador_id: utilizador_id, // ID do cliente (se marcado pelo médico) ou do usuário logado
      data_hora: req.body.data_hora,
      observacoes: req.body.observacoes || '',
      status_id: status_id,
      medico_id: medico_id // null se cliente marcando, ID do médico se médico marcando
    };

    console.log("Dados para criar consulta:", consultaData);

    const consulta = await Consulta.create(consultaData, {
      fields: ['utilizador_id', 'data_hora', 'observacoes', 'status_id', 'medico_id']
    });

    // Buscar a consulta criada com todos os dados
    const consultaCriada = await Consulta.findByPk(consulta.id, {
      include: [
        {
          model: Utilizador,
          as: 'utilizador',
          attributes: ['id', 'nome', 'email', 'telefone']
        },
        {
          model: Utilizador,
          as: 'medico',
          attributes: ['id', 'nome', 'email', 'telefone']
        },
        {
          model: ConsultaStatus,
          as: 'status'
        }
      ]
    });

    return res.status(201).json({
      success: true,
      message: req.body.cliente_email 
        ? "Consulta marcada com sucesso para o cliente!" 
        : "Consulta agendada com sucesso!",
      consulta: consultaCriada
    });
  } catch (error) {
    console.error("Erro ao criar consulta:", error);

    // Verificar se é um erro de chave estrangeira
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      if (error.index?.includes('status_id')) {
        return res.status(500).json({
          success: false,
          message: "Erro ao criar consulta: o status selecionado não existe. Por favor, contate o administrador do sistema.",
          error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
      }
    }

    return res.status(500).json({
      success: false,
      message: "Erro ao criar consulta: " + error.message,
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
},

async getHorariosDisponiveis(req, res) {
  try {
    const { data } = req.query;
    
    if (!data) {
      return res.status(400).json({
        message: "Data é obrigatória"
      });
    }

    // Horários padrão do sistema
    const horariosBase = [
      '08:00', '09:00', '10:00', '11:00', 
      '14:00', '15:00', '16:00', '17:00'
    ];

    // Buscar consultas já agendadas para a data
    const consultasAgendadas = await Consulta.findAll({
      where: {
        data_hora: {
          [Op.gte]: new Date(`${data}T00:00:00.000Z`),
          [Op.lt]: new Date(`${data}T23:59:59.999Z`)
        },
        status_id: {
          [Op.in]: [1, 2] // Pendente ou Confirmada
        }
      },
      attributes: ['data_hora']
    });

    // Extrair apenas as horas das consultas agendadas
    const horariosOcupados = consultasAgendadas.map(consulta => {
      const dataHora = new Date(consulta.data_hora);
      return dataHora.toTimeString().substring(0, 5); // HH:MM
    });

    // Filtrar horários disponíveis
    const horariosDisponiveis = horariosBase.filter(horario => 
      !horariosOcupados.includes(horario)
    );

    // Verificar se a data é hoje e filtrar horários passados
    const hoje = new Date();
    const dataConsulta = new Date(data);
    
    let horariosFinais = horariosDisponiveis;
    
    if (dataConsulta.toDateString() === hoje.toDateString()) {
      const horaAtual = hoje.getHours();
      const minutoAtual = hoje.getMinutes();
      
      horariosFinais = horariosDisponiveis.filter(horario => {
        const [hora, minuto] = horario.split(':').map(Number);
        return hora > horaAtual || (hora === horaAtual && minuto > minutoAtual);
      });
    }

    return res.status(200).json({
      data: data,
      horariosDisponiveis: horariosFinais,
      horariosOcupados: horariosOcupados
    });
  } catch (error) {
    console.error("Erro ao buscar horários disponíveis:", error);
    return res.status(500).json({
      message: error.message || "Erro ao buscar horários disponíveis"
    });
  }
},

  // Buscar todas as consultas
  async findAll(req, res) {
    try {
      const consultas = await Consulta.findAll({
        include: [
          {
            model: Utilizador,
            as: 'utilizador',
            attributes: ['id', 'nome', 'email', 'telefone']
          },
          {
            model: Utilizador,
            as: 'medico',
            attributes: ['id', 'nome', 'email', 'telefone']
          },
          {
            model: ConsultaStatus,
            as: 'status'
          }
        ]
      });

      return res.status(200).json(consultas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: error.message || "Ocorreu um erro ao buscar as consultas."
      });
    }
  },

  // Buscar uma consulta por ID
  async findOne(req, res) {
    try {
      const id = req.params.id;
      
      const consulta = await Consulta.findByPk(id, {
        include: [
          {
            model: Utilizador,
            as: 'utilizador',
            attributes: ['id', 'nome', 'email', 'telefone']
          },
          {
            model: Utilizador,
            as: 'medico',
            attributes: ['id', 'nome', 'email', 'telefone']
          },
          {
            model: ConsultaStatus,
            as: 'status'
          }
        ]
      });

      if (!consulta) {
        return res.status(404).json({
          message: "Consulta não encontrada!"
        });
      }

      return res.status(200).json(consulta);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: error.message || "Ocorreu um erro ao buscar a consulta."
      });
    }
  },

  // Buscar consultas por tipo de utilizador
  async findByTipoUtilizador(req, res) {
    try {
      const utilizadorId = req.params.id;
      const tipoUsuario = req.query.tipo; // cliente ou medico
      
      console.log(`Buscando consultas para utilizador ${utilizadorId} do tipo ${tipoUsuario}`);
      
      // Buscar o utilizador para verificar o tipo
      const utilizador = await Utilizador.findByPk(utilizadorId, {
        include: [{
          model: TipoUtilizador,
          as: 'tipoUtilizador'
        }]
      });
      
      if (!utilizador) {
        return res.status(404).json({
          message: "Utilizador não encontrado!"
        });
      }
      
      // Verificar se o tipo corresponde
      if (utilizador.tipoUtilizador?.nome.toLowerCase() !== tipoUsuario.toLowerCase()) {
        return res.status(400).json({
          message: `Este utilizador não é do tipo ${tipoUsuario}!`
        });
      }
      
      // Buscar consultas relacionadas a este utilizador
      let consultas;
      
      if (tipoUsuario.toLowerCase() === 'medico') {
        // Para médicos, buscar consultas atribuídas a ele OU consultas pendentes (sem médico)
        console.log("Buscando consultas para o médico ID:", utilizadorId);
        consultas = await Consulta.findAll({
          where: {
            [Op.or]: [
              { medico_id: utilizadorId }, // Consultas já atribuídas ao médico
              { medico_id: null, status_id: 1 } // Consultas pendentes (disponíveis para aceitar)
            ]
          },
          include: [
            {
              model: ConsultaStatus,
              as: 'status'
            }, 
            {
              model: Utilizador,
              as: 'utilizador',
              attributes: ['id', 'nome', 'email', 'telefone']
            },
            {
              model: Utilizador,
              as: 'medico',
              attributes: ['id', 'nome', 'email', 'telefone']
            }
          ],
          order: [['data_hora', 'ASC']]
        });
        
        console.log(`Encontradas ${consultas.length} consultas`);
      } else {
        // Para clientes, buscar apenas as consultas do cliente
        consultas = await Consulta.findAll({
          where: { utilizador_id: utilizadorId },
          include: [
            {
              model: ConsultaStatus,
              as: 'status'
            },
            {
              model: Utilizador,
              as: 'medico',
              attributes: ['id', 'nome', 'email', 'telefone']
            }
          ],
          order: [['data_hora', 'ASC']]
        });
      }

      console.log("Consultas encontradas:", consultas.length);
      console.log("Exemplo de consulta:", consultas[0] || "Nenhuma consulta encontrada");
      
      return res.status(200).json(consultas);
    } catch (error) {
      console.error("Erro ao buscar consultas:", error);
      return res.status(500).json({
        message: error.message || "Ocorreu um erro ao buscar as consultas."
      });
    }
  },

  // Atualizar consulta
  async update(req, res) {
    try {
      const id = req.params.id;
      
      const [updated] = await Consulta.update(req.body, {
        where: { id: id }
      });

      if (updated) {
        const updatedConsulta = await Consulta.findByPk(id, {
          include: [
            {
              model: Utilizador,
              as: 'utilizador',
              attributes: ['id', 'nome', 'email', 'telefone']
            },
            {
              model: Utilizador,
              as: 'medico',
              attributes: ['id', 'nome', 'email', 'telefone']
            },
            {
              model: ConsultaStatus,
              as: 'status'
            }
          ]
        });
        return res.status(200).json({
          message: "Consulta atualizada com sucesso!",
          consulta: updatedConsulta
        });
      }
      
      return res.status(404).json({
        message: "Consulta não encontrada!"
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: error.message || "Ocorreu um erro ao atualizar a consulta."
      });
    }
  },

  // Excluir consulta
  async delete(req, res) {
    try {
      const id = req.params.id;
      
      const deleted = await Consulta.destroy({
        where: { id: id }
      });

      if (deleted) {
        return res.status(200).json({
          message: "Consulta excluída com sucesso!"
        });
      }
      
      return res.status(404).json({
        message: "Consulta não encontrada!"
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: error.message || "Ocorreu um erro ao excluir a consulta."
      });
    }
  },

  // Médico aceitar consulta - ATUALIZADO
  async aceitarConsulta(req, res) {
    try {
      const consultaId = req.params.id;
      const medicoId = req.userId; // ID do médico logado
      
      console.log(`Médico ${medicoId} tentando aceitar consulta ${consultaId}`);
      
      // Verificar se o usuário é realmente um médico
      const medico = await Utilizador.findByPk(medicoId, {
        include: [{
          model: TipoUtilizador,
          as: 'tipoUtilizador'
        }]
      });
      
      if (!medico || medico.tipoUtilizador?.nome.toLowerCase() !== 'medico') {
        return res.status(403).json({
          message: "Apenas médicos podem aceitar consultas!"
        });
      }
      
      // Verificar se a consulta existe e está pendente
      const consulta = await Consulta.findByPk(consultaId);
      
      if (!consulta) {
        return res.status(404).json({
          message: "Consulta não encontrada!"
        });
      }
      
      if (consulta.status_id !== 1) {
        return res.status(400).json({
          message: "Esta consulta não está pendente!"
        });
      }
      
      if (consulta.medico_id !== null) {
        return res.status(400).json({
          message: "Esta consulta já foi aceita por outro médico!"
        });
      }
      
      // Buscar o ID do status "Confirmada"
      const statusConfirmada = await ConsultaStatus.findOne({
        where: { nome: 'Confirmada' }
      });
      
      if (!statusConfirmada) {
        return res.status(404).json({
          message: "Status 'Confirmada' não encontrado!"
        });
      }
      
      // Atualizar consulta com o médico e status
      await Consulta.update(
        { 
          status_id: statusConfirmada.id,
          medico_id: medicoId
        },
        { where: { id: consultaId } }
      );
      
      return res.status(200).json({
        message: "Consulta aceita e confirmada com sucesso!"
      });
    } catch (error) {
      console.error("Erro ao aceitar consulta:", error);
      return res.status(500).json({
        message: error.message || "Ocorreu um erro ao aceitar a consulta."
      });
    }
  },

  // Médico recusar consulta
  async recusarConsulta(req, res) {
    try {
      const consultaId = req.params.id;
      const medicoId = req.userId; // ID do médico logado
      
      // Verificar se o usuário é realmente um médico
      const medico = await Utilizador.findByPk(medicoId, {
        include: [{
          model: TipoUtilizador,
          as: 'tipoUtilizador'
        }]
      });
      
      if (!medico || medico.tipoUtilizador?.nome.toLowerCase() !== 'medico') {
        return res.status(403).json({
          message: "Apenas médicos podem recusar consultas!"
        });
      }
      
      // Verificar se a consulta existe
      const consulta = await Consulta.findByPk(consultaId, {
        include: [{
          model: ConsultaStatus,
          as: 'status'
        }]
      });
      
      if (!consulta) {
        return res.status(404).json({
          message: "Consulta não encontrada!"
        });
      }
      
      // Verificar se a consulta está pendente
      if (consulta.status_id !== 1) {
        return res.status(400).json({
          message: "Esta consulta não está pendente!"
        });
      }
      
      // Atualizar status da consulta para cancelada
      await consulta.update({
        status_id: 4 // ID para "Cancelada"
      });
      
      return res.status(200).json({
        message: "Consulta recusada com sucesso."
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: error.message || "Ocorreu um erro ao recusar a consulta."
      });
    }
  },

  // Buscar consultas pendentes (disponíveis para médicos)
  async findPendentes(req, res) {
    try {
      const consultas = await Consulta.findAll({
        where: { 
          status_id: 1, // Status "Pendente"
          medico_id: null // Sem médico atribuído
        },
        include: [
          {
            model: db.Utilizador,
            as: 'utilizador',
            attributes: ['id', 'nome', 'email', 'telefone'],
            include: [
              {
                model: db.TipoUtilizador,
                as: 'tipoUtilizador'
              }
            ]
          },
          {
            model: db.ConsultaStatus,
            as: 'status'
          }
        ],
        order: [['data_hora', 'ASC']]
      });

      res.status(200).json(consultas);
    } catch (error) {
      console.error('Erro ao buscar consultas pendentes:', error);
      res.status(500).json({
        message: error.message || "Ocorreu um erro ao buscar as consultas pendentes."
      });
    }
  },

  // Buscar todos os status de consulta
  async findAllStatus(req, res) {
    try {
      const status = await ConsultaStatus.findAll({
        order: [['id', 'ASC']]
      });
      
      res.status(200).json(status);
    } catch (error) {
      console.error('Erro ao buscar status de consulta:', error);
      res.status(500).json({
        message: error.message || "Ocorreu um erro ao buscar os status de consulta."
      });
    }
  },

  // Retorna todas as consultas concluídas de um médico específico - ATUALIZADO  
 getConsultasConcluidasByMedico: async (req, res) => {
  try {
    const medicoId = req.params.id;

    // Buscar o ID do status "Concluída"
    const statusConcluida = await db.ConsultaStatus.findOne({
      where: { nome: 'Concluída' }
    });

    if (!statusConcluida) {
      return res.status(404).json({ message: "Status 'Concluída' não encontrado" });
    }

    // Buscar consultas concluídas do médico específico, incluindo a fatura
    const consultas = await Consulta.findAll({
      where: { 
        status_id: statusConcluida.id,
        medico_id: medicoId
      },
      include: [
        {
          model: Utilizador,
          as: 'utilizador',
          attributes: ['id', 'nome', 'email', 'telefone']
        },
        {
          model: Utilizador,
          as: 'medico',
          attributes: ['id', 'nome', 'email', 'telefone']
        },
        {
          model: db.ConsultaStatus,
          as: 'status'
        },
        {
          model: db.Fatura,
          as: 'fatura', // inclui a fatura associada
          attributes: ['id'] // só precisa do id para saber se existe
        }
      ],
      order: [['data_hora', 'DESC']]
    });

    // Adiciona a propriedade tem_fatura com base na existência da fatura
    const consultasComInfo = consultas.map(consulta => {
      const jsonConsulta = consulta.toJSON();
      return {
        ...jsonConsulta,
        tem_fatura: !!jsonConsulta.fatura
      };
    });

    return res.status(200).json(consultasComInfo);
  } catch (error) {
    console.error("Erro ao buscar consultas concluídas do médico:", error);
    return res.status(500).json({ 
      message: "Erro ao buscar consultas concluídas", 
      error: error.message 
    });
  }
},

  // getFatura: Busca a fatura associada a uma consulta
  getFatura: async (req, res) => {
    try {
      const consultaId = req.params.id;
      
      // Buscar fatura associada à consulta
      const fatura = await db.Fatura.findOne({
        where: { consulta_id: consultaId },
        include: [
          {
            model: db.FaturaStatus,
            as: 'status'
          }
        ]
      });
      
      if (!fatura) {
        return res.status(404).json({ 
          message: "Nenhuma fatura encontrada para esta consulta"
        });
      }
      
      res.status(200).json(fatura);
    } catch (error) {
      console.error("Erro ao buscar fatura da consulta:", error);
      res.status(500).json({
        message: error.message || "Ocorreu um erro ao buscar a fatura da consulta"
      });
    }
  },

  getConsultasConfirmadas: async (req, res) => {
    try {
      const { data, medico_id } = req.query;

      const whereClause = {
        status_id: 2 // Status confirmada
      };

      // Filtrar por médico se fornecido
      if (medico_id) {
        whereClause.medico_id = medico_id;
      }

      if (data) {
        // Garante que a data seja interpretada corretamente no fuso do servidor
        const startDate = new Date(`${data}T00:00:00.000Z`);
        const endDate = new Date(`${data}T00:00:00.000Z`);
        endDate.setUTCDate(startDate.getUTCDate() + 1);

        whereClause.data_hora = {
          [db.Sequelize.Op.gte]: startDate,
          [db.Sequelize.Op.lt]: endDate
        };
      }

      const consultas = await db.Consulta.findAll({
        where: whereClause,
        include: [
          { model: db.Utilizador, as: 'utilizador', attributes: ['id', 'nome', 'email'] },
          { model: db.Utilizador, as: 'medico', attributes: ['id', 'nome', 'email'] },
          { model: db.ConsultaStatus, as: 'status', attributes: ['id', 'nome'] }
        ],
        order: [['data_hora', 'ASC']]
      });

      return res.status(200).json(consultas);
    } catch (error) {
      console.error("Erro ao buscar consultas confirmadas:", error);
      return res.status(500).json({
        message: error.message || "Erro ao buscar as consultas confirmadas"
      });
    }
  },

  // getConsulta: Busca detalhes de uma consulta específica
  getConsulta: async (req, res) => {
    try {
      const consultaId = req.params.id;
      
      const consulta = await db.Consulta.findByPk(consultaId, {
        include: [
          {
            model: db.Utilizador,
            as: 'utilizador',
            attributes: ['id', 'nome', 'email']
          },
          {
            model: db.Utilizador,
            as: 'medico',
            attributes: ['id', 'nome', 'email']
          },
          {
            model: db.ConsultaStatus,
            as: 'status'
          }
        ]
      });
      
      if (!consulta) {
        return res.status(404).json({
          message: "Consulta não encontrada"
        });
      }
      
      res.status(200).json(consulta);
    } catch (error) {
      console.error("Erro ao buscar detalhes da consulta:", error);
      res.status(500).json({
        message: error.message || "Ocorreu um erro ao buscar os detalhes da consulta"
      });
    }
  }
};

// Adicionar esta linha APÓS a definição do objeto ConsultaController
(async () => {
  try {
    const allStatus = await ConsultaStatus.findAll();
    console.log("Status de consulta disponíveis:", allStatus.map(s => `${s.id}: ${s.nome}`));
  } catch (err) {
    console.error("Erro ao verificar status de consulta:", err);
  }
})();

module.exports = ConsultaController;