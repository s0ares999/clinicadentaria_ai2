const db = require('../models');
const Consulta = db.Consulta;
const ConsultaStatus = db.ConsultaStatus;
const Utilizador = db.Utilizador;
const Medico = db.Medico;
const Disponibilidade = db.Disponibilidade;
const Pagamento = db.Pagamento;
const { Op } = require('sequelize');

const ConsultaController = {
  // Criar nova consulta
  async create(req, res) {
    try {
      // Validar dados
      if (!req.body.cliente_id || !req.body.medico_id || !req.body.data_hora) {
        return res.status(400).json({
          message: "Campos obrigatórios não preenchidos!"
        });
      }

      // Verificar se o cliente existe
      const cliente = await Utilizador.findByPk(req.body.cliente_id);
      if (!cliente) {
        return res.status(404).json({
          message: "Cliente não encontrado!"
        });
      }

      // Verificar se o médico existe
      const medico = await Utilizador.findByPk(req.body.medico_id);
      if (!medico) {
        return res.status(404).json({
          message: "Médico não encontrado!"
        });
      }

      // Verificar disponibilidade do médico
      const dataConsulta = new Date(req.body.data_hora);
      const horaConsulta = dataConsulta.getHours() + ':' + dataConsulta.getMinutes() + ':00';
      const disponibilidade = await Disponibilidade.findOne({
        where: {
          medico_id: req.body.medico_id,
          data: dataConsulta.toISOString().split('T')[0],
          hora_inicio: { [Op.lte]: horaConsulta },
          hora_fim: { [Op.gte]: horaConsulta },
          status_id: 1 // Assumindo que 1 é o status "Disponível"
        }
      });

      if (!disponibilidade) {
        return res.status(400).json({
          message: "Médico não disponível nesta data e horário!"
        });
      }

      // Buscar o status padrão (ex: "Agendada")
      const statusAgendada = await ConsultaStatus.findOne({
        where: { nome: 'Agendada' }
      });

      if (!statusAgendada) {
        return res.status(500).json({
          message: "Status de consulta não encontrado!"
        });
      }

      // Criar consulta
      const consulta = await Consulta.create({
        cliente_id: req.body.cliente_id,
        medico_id: req.body.medico_id,
        data_hora: req.body.data_hora,
        duracao: req.body.duracao || 30,
        estado: req.body.estado || "agendada",
        observacoes: req.body.observacoes || null,
        tratamento_id: req.body.tratamento_id || null,
        status_id: statusAgendada.id
      });

      return res.status(201).json({
        message: "Consulta criada com sucesso!",
        consulta
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: error.message || "Ocorreu um erro ao criar a consulta."
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
            as: 'cliente',
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
          },
          {
            model: Pagamento,
            as: 'pagamento'
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
            as: 'cliente',
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
          },
          {
            model: Pagamento,
            as: 'pagamento'
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

  // Buscar consultas por médico
  async findByMedico(req, res) {
    try {
      const medicoId = req.params.id;
      
      const consultas = await Consulta.findAll({
        where: { medico_id: medicoId },
        include: ["cliente", "tratamento"]
      });

      return res.status(200).json(consultas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: error.message || "Ocorreu um erro ao buscar as consultas."
      });
    }
  },

  // Buscar consultas por cliente
  async findByCliente(req, res) {
    try {
      const clienteId = req.params.id;
      
      const consultas = await Consulta.findAll({
        where: { cliente_id: clienteId },
        include: ["medico", "tratamento"]
      });

      return res.status(200).json(consultas);
    } catch (error) {
      console.error(error);
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
        const updatedConsulta = await Consulta.findByPk(id);
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
  }
};

module.exports = ConsultaController; 