const db = require('../models');
const Especialidade = db.Especialidade;

// Criar uma nova especialidade
exports.create = async (req, res) => {
  try {
    // Validar requisição
    if (!req.body.nome) {
      return res.status(400).json({
        message: "Nome da especialidade é obrigatório!"
      });
    }

    // Verificar se especialidade já existe
    const especialidadeExistente = await Especialidade.findOne({
      where: { nome: req.body.nome }
    });

    if (especialidadeExistente) {
      return res.status(400).json({
        message: "Especialidade já existe!"
      });
    }

    // Criar especialidade
    const especialidade = await Especialidade.create({
      nome: req.body.nome,
      descricao: req.body.descricao || null
    });

    res.status(201).json(especialidade);
  } catch (error) {
    console.error("Erro ao criar especialidade:", error);
    res.status(500).json({
      message: error.message || "Ocorreu um erro ao criar a especialidade."
    });
  }
};

// Buscar todas as especialidades
exports.findAll = async (req, res) => {
  try {
    const especialidades = await Especialidade.findAll();
    res.status(200).json(especialidades);
  } catch (error) {
    console.error("Erro ao buscar especialidades:", error);
    res.status(500).json({
      message: error.message || "Ocorreu um erro ao buscar as especialidades."
    });
  }
};

// Buscar uma especialidade específica
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;

    const especialidade = await Especialidade.findByPk(id);
    
    if (!especialidade) {
      return res.status(404).json({
        message: `Especialidade com ID ${id} não encontrada!`
      });
    }

    res.status(200).json(especialidade);
  } catch (error) {
    console.error("Erro ao buscar especialidade:", error);
    res.status(500).json({
      message: error.message || "Ocorreu um erro ao buscar a especialidade."
    });
  }
};

// Atualizar uma especialidade
exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    // Validar requisição
    if (!req.body.nome) {
      return res.status(400).json({
        message: "Nome da especialidade é obrigatório!"
      });
    }

    // Atualizar especialidade
    const [updated] = await Especialidade.update(req.body, {
      where: { id: id }
    });

    if (updated === 0) {
      return res.status(404).json({
        message: `Especialidade com ID ${id} não encontrada!`
      });
    }

    res.status(200).json({
      message: "Especialidade atualizada com sucesso!"
    });
  } catch (error) {
    console.error("Erro ao atualizar especialidade:", error);
    res.status(500).json({
      message: error.message || "Ocorreu um erro ao atualizar a especialidade."
    });
  }
};

// Excluir uma especialidade
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const deleted = await Especialidade.destroy({
      where: { id: id }
    });

    if (deleted === 0) {
      return res.status(404).json({
        message: `Especialidade com ID ${id} não encontrada!`
      });
    }

    res.status(200).json({
      message: "Especialidade excluída com sucesso!"
    });
  } catch (error) {
    console.error("Erro ao excluir especialidade:", error);
    res.status(500).json({
      message: error.message || "Ocorreu um erro ao excluir a especialidade."
    });
  }
}; 