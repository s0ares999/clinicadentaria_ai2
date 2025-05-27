const db = require('../models');
const Especialidade = db.Especialidade;

/**
 * Lista todas as especialidades
 * @param {Request} req - Express Request
 * @param {Response} res - Express Response
 */
exports.findAll = async (req, res) => {
  try {
    const especialidades = await Especialidade.findAll({
      order: [['nome', 'ASC']]
    });

    return res.status(200).json({
      success: true,
      data: especialidades
    });
  } catch (error) {
    console.error("Erro ao buscar especialidades:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Ocorreu um erro ao buscar as especialidades."
    });
  }
};

/**
 * Busca uma especialidade por ID
 * @param {Request} req - Express Request
 * @param {Response} res - Express Response
 */
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;

    const especialidade = await Especialidade.findByPk(id);

    if (!especialidade) {
      return res.status(404).json({
        success: false,
        message: `Especialidade com ID ${id} não encontrada`
      });
    }

    return res.status(200).json({
      success: true,
      data: especialidade
    });
  } catch (error) {
    console.error("Erro ao buscar especialidade:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Erro ao buscar a especialidade."
    });
  }
};

/**
 * Cria uma nova especialidade
 * @param {Request} req - Express Request
 * @param {Response} res - Express Response
 */
exports.create = async (req, res) => {
  try {
    if (!req.body.nome) {
      return res.status(400).json({
        success: false,
        message: "Nome da especialidade é obrigatório"
      });
    }

    const especialidadeExistente = await Especialidade.findOne({
      where: { nome: req.body.nome }
    });

    if (especialidadeExistente) {
      return res.status(409).json({
        success: false,
        message: "Especialidade já existe"
      });
    }

    const especialidade = await Especialidade.create({
      nome: req.body.nome,
      descricao: req.body.descricao || null
    });

    return res.status(201).json({
      success: true,
      message: "Especialidade criada com sucesso",
      data: especialidade
    });
  } catch (error) {
    console.error("Erro ao criar especialidade:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Ocorreu um erro ao criar a especialidade."
    });
  }
};

/**
 * Atualiza uma especialidade existente
 * @param {Request} req - Express Request
 * @param {Response} res - Express Response
 */
exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    if (!req.body.nome) {
      return res.status(400).json({
        success: false,
        message: "Nome da especialidade é obrigatório"
      });
    }

    const especialidadeExistente = await Especialidade.findOne({
      where: { 
        nome: req.body.nome,
        id: { [db.Sequelize.Op.ne]: id }
      }
    });

    if (especialidadeExistente) {
      return res.status(409).json({
        success: false,
        message: "Já existe outra especialidade com este nome"
      });
    }

    const [updated] = await Especialidade.update(
      {
        nome: req.body.nome,
        descricao: req.body.descricao
      },
      {
        where: { id: id }
      }
    );

    if (updated === 0) {
      return res.status(404).json({
        success: false,
        message: `Especialidade com ID ${id} não encontrada`
      });
    }

    const especialidadeAtualizada = await Especialidade.findByPk(id);

    return res.status(200).json({
      success: true,
      message: "Especialidade atualizada com sucesso",
      data: especialidadeAtualizada
    });
  } catch (error) {
    console.error("Erro ao atualizar especialidade:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Ocorreu um erro ao atualizar a especialidade."
    });
  }
};

/**
 * Remove uma especialidade
 * @param {Request} req - Express Request
 * @param {Response} res - Express Response
 */
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    if (id >= 1 && id <= 5) {
      return res.status(400).json({
        success: false,
        message: "Não é possível remover uma especialidade padrão do sistema"
      });
    }

    const medicosAssociados = await db.Medico.findOne({
      where: { especialidade_id: id }
    });

    if (medicosAssociados) {
      return res.status(400).json({
        success: false,
        message: "Não é possível remover esta especialidade pois existem médicos associados a ela"
      });
    }

    const deleted = await Especialidade.destroy({
      where: { id: id }
    });

    if (deleted === 0) {
      return res.status(404).json({
        success: false,
        message: `Especialidade com ID ${id} não encontrada`
      });
    }

    return res.status(200).json({
      success: true,
      message: "Especialidade removida com sucesso"
    });
  } catch (error) {
    console.error("Erro ao excluir especialidade:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Ocorreu um erro ao remover a especialidade."
    });
  }
};

/**
 * Busca uma especialidade por nome
 * @param {Request} req - Express Request
 * @param {Response} res - Express Response
 */
exports.findByNome = async (req, res) => {
  try {
    const nome = req.params.nome;

    console.log(`Buscando especialidade com nome: ${nome}`);

    const especialidade = await Especialidade.findOne({
      where: {
        nome: {
          [db.Sequelize.Op.iLike]: `%${nome}%`
        }
      }
    });

    if (!especialidade) {
      const nomesSimplificados = {
        'odonto': 'Odontologia Geral',
        'geral': 'Odontologia Geral',
        'ortodontia': 'Ortodontia',
        'periodontia': 'Periodontia',
        'implante': 'Implantodontia',
        'implantodontia': 'Implantodontia',
        'infantil': 'Odontopediatria',
        'crianca': 'Odontopediatria',
        'odontopediatria': 'Odontopediatria',
        'pediatria': 'Odontopediatria'
      };

      const nomeLower = nome.toLowerCase();
      for (const [key, value] of Object.entries(nomesSimplificados)) {
        if (nomeLower.includes(key)) {
          const especialidadePadrao = await Especialidade.findOne({
            where: { nome: value }
          });

          if (especialidadePadrao) {
            return res.status(200).json(especialidadePadrao);
          }
        }
      }

      return res.status(404).json({
        success: false,
        message: `Especialidade com nome ${nome} não encontrada`
      });
    }

    return res.status(200).json(especialidade);
  } catch (error) {
    console.error("Erro ao buscar especialidade por nome:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Erro ao buscar a especialidade."
    });
  }
};
