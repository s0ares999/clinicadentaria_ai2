const db = require('../models');
const Disponibilidade = db.Disponibilidade;
const Medico = db.Medico;
const { Op } = require('sequelize');

// Criar nova disponibilidade
exports.create = async (req, res) => {
  try {
    // Validar requisição
    if (!req.body.medico_id || !req.body.data || !req.body.hora_inicio || !req.body.hora_fim) {
      return res.status(400).json({
        message: "Campos obrigatórios não preenchidos!"
      });
    }

    // Criar disponibilidade
    const disponibilidade = await Disponibilidade.create({
      medico_id: req.body.medico_id,
      data: req.body.data,
      hora_inicio: req.body.hora_inicio,
      hora_fim: req.body.hora_fim,
      status_id: req.body.status_id || 1 // Assumindo 1 como "Disponível"
    });

    res.status(201).json(disponibilidade);
  } catch (error) {
    console.error("Erro ao criar disponibilidade:", error);
    res.status(500).json({
      message: error.message || "Ocorreu um erro ao criar a disponibilidade."
    });
  }
};

// Buscar todas as disponibilidades
exports.findAll = async (req, res) => {
  try {
    const disponibilidades = await Disponibilidade.findAll();
    res.status(200).json(disponibilidades);
  } catch (error) {
    console.error("Erro ao buscar disponibilidades:", error);
    res.status(500).json({
      message: error.message || "Ocorreu um erro ao buscar as disponibilidades."
    });
  }
};

// Buscar disponibilidades por médico
exports.findByMedico = async (req, res) => {
  try {
    const medicoId = req.params.medicoId;
    const disponibilidades = await Disponibilidade.findAll({
      where: { medico_id: medicoId }
    });
    res.status(200).json(disponibilidades);
  } catch (error) {
    console.error("Erro ao buscar disponibilidades por médico:", error);
    res.status(500).json({
      message: error.message || "Ocorreu um erro ao buscar as disponibilidades."
    });
  }
};

// Buscar disponibilidades por data
exports.findByData = async (req, res) => {
  try {
    const data = req.params.data;
    const disponibilidades = await Disponibilidade.findAll({
      where: { data: data }
    });
    res.status(200).json(disponibilidades);
  } catch (error) {
    console.error("Erro ao buscar disponibilidades por data:", error);
    res.status(500).json({
      message: error.message || "Ocorreu um erro ao buscar as disponibilidades."
    });
  }
};

// Buscar disponibilidades por médico e data
exports.findByMedicoEData = async (req, res) => {
  try {
    const medicoId = req.params.medicoId;
    const data = req.params.data;
    const disponibilidades = await Disponibilidade.findAll({
      where: { 
        medico_id: medicoId,
        data: data
      }
    });
    res.status(200).json(disponibilidades);
  } catch (error) {
    console.error("Erro ao buscar disponibilidades por médico e data:", error);
    res.status(500).json({
      message: error.message || "Ocorreu um erro ao buscar as disponibilidades."
    });
  }
};

// Buscar uma disponibilidade específica
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    const disponibilidade = await Disponibilidade.findByPk(id);
    
    if (!disponibilidade) {
      return res.status(404).json({
        message: `Disponibilidade com ID ${id} não encontrada!`
      });
    }

    res.status(200).json(disponibilidade);
  } catch (error) {
    console.error("Erro ao buscar disponibilidade:", error);
    res.status(500).json({
      message: error.message || "Ocorreu um erro ao buscar a disponibilidade."
    });
  }
};

// Atualizar uma disponibilidade
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Disponibilidade.update(req.body, {
      where: { id: id }
    });

    if (updated === 0) {
      return res.status(404).json({
        message: `Disponibilidade com ID ${id} não encontrada!`
      });
    }

    res.status(200).json({
      message: "Disponibilidade atualizada com sucesso!"
    });
  } catch (error) {
    console.error("Erro ao atualizar disponibilidade:", error);
    res.status(500).json({
      message: error.message || "Ocorreu um erro ao atualizar a disponibilidade."
    });
  }
};

// Excluir uma disponibilidade
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Disponibilidade.destroy({
      where: { id: id }
    });

    if (deleted === 0) {
      return res.status(404).json({
        message: `Disponibilidade com ID ${id} não encontrada!`
      });
    }

    res.status(200).json({
      message: "Disponibilidade excluída com sucesso!"
    });
  } catch (error) {
    console.error("Erro ao excluir disponibilidade:", error);
    res.status(500).json({
      message: error.message || "Ocorreu um erro ao excluir a disponibilidade."
    });
  }
}; 