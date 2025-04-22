const db = require('../models');
const Especialidade = db.Especialidade;

/**
 * Garante que as especialidades padrão existam no banco de dados
 * @returns {Promise<boolean>} true se a operação for bem-sucedida
 */
const guaranteeDefaultEspecialidades = async () => {
  try {
    const especialidadesPadrao = [
      { id: 1, nome: 'Odontologia Geral', descricao: 'Cuidados odontológicos gerais e prevenção' },
      { id: 2, nome: 'Ortodontia', descricao: 'Correção da posição dos dentes e da mandíbula' },
      { id: 3, nome: 'Periodontia', descricao: 'Tratamento das gengivas e estruturas de suporte dos dentes' },
      { id: 4, nome: 'Implantodontia', descricao: 'Colocação de implantes dentários' },
      { id: 5, nome: 'Odontopediatria', descricao: 'Cuidados dentários para crianças' }
    ];
    
    for (const esp of especialidadesPadrao) {
      await Especialidade.findOrCreate({
        where: { id: esp.id },
        defaults: esp
      });
    }
    
    return true;
  } catch (error) {
    console.error('Erro ao garantir especialidades padrão:', error);
    return false;
  }
};

// Inicializar especialidades na carga do arquivo
guaranteeDefaultEspecialidades().catch(err => 
  console.error('Falha ao inicializar especialidades:', err)
);

/**
 * Lista todas as especialidades
 * @param {Request} req - Express Request
 * @param {Response} res - Express Response
 */
exports.findAll = async (req, res) => {
  try {
    // Garantir que as especialidades padrão existam
    await guaranteeDefaultEspecialidades();
    
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
    // Validar requisição
    if (!req.body.nome) {
      return res.status(400).json({
        success: false,
        message: "Nome da especialidade é obrigatório"
      });
    }

    // Verificar se especialidade já existe
    const especialidadeExistente = await Especialidade.findOne({
      where: { nome: req.body.nome }
    });

    if (especialidadeExistente) {
      return res.status(409).json({
        success: false,
        message: "Especialidade já existe"
      });
    }

    // Criar especialidade
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

    // Validar requisição
    if (!req.body.nome) {
      return res.status(400).json({
        success: false,
        message: "Nome da especialidade é obrigatório"
      });
    }

    // Verificar se o nome já existe em outra especialidade
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

    // Atualizar especialidade
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

    // Verificar se é uma especialidade padrão
    if (id >= 1 && id <= 5) {
      return res.status(400).json({
        success: false,
        message: "Não é possível remover uma especialidade padrão do sistema"
      });
    }

    // Verificar se há médicos com esta especialidade
    const medicosAssociados = await db.Medico.findOne({
      where: { especialidade_id: id }
    });

    if (medicosAssociados) {
      return res.status(400).json({
        success: false,
        message: "Não é possível remover esta especialidade pois existem médicos associados a ela"
      });
    }

    // Remover especialidade
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
          [db.Sequelize.Op.iLike]: `%${nome}%` // Case insensitive
        }
      }
    });
    
    if (!especialidade) {
      // Se não encontrar, verificar se é um dos nomes padrão para evitar duplicação
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
      
      // Verificar correspondências parciais
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