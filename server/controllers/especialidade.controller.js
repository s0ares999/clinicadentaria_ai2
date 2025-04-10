const db = require('../models');
const Especialidade = db.Especialidade;

// Função para garantir que as especialidades padrão existam
const guaranteeDefaultEspecialidades = async () => {
  try {
    console.log('Verificando especialidades padrão...');
    
    const especialidadesPadrao = [
      { id: 1, nome: 'Odontologia Geral', descricao: 'Cuidados odontológicos gerais e prevenção' },
      { id: 2, nome: 'Ortodontia', descricao: 'Correção da posição dos dentes e da mandíbula' },
      { id: 3, nome: 'Periodontia', descricao: 'Tratamento das gengivas e estruturas de suporte dos dentes' },
      { id: 4, nome: 'Implantodontia', descricao: 'Colocação de implantes dentários' },
      { id: 5, nome: 'Odontopediatria', descricao: 'Cuidados dentários para crianças' }
    ];
    
    // Verificar e criar cada especialidade
    for (const esp of especialidadesPadrao) {
      const [especialidade, created] = await Especialidade.findOrCreate({
        where: { id: esp.id },
        defaults: esp
      });
      
      if (created) {
        console.log(`Especialidade "${esp.nome}" criada com ID ${esp.id}`);
      } else {
        console.log(`Especialidade "${esp.nome}" já existe com ID ${esp.id}`);
      }
    }
    
    console.log('Verificação de especialidades concluída');
    return true;
  } catch (error) {
    console.error('Erro ao garantir especialidades padrão:', error);
    return false;
  }
};

// Inicializar especialidades na carga do arquivo
guaranteeDefaultEspecialidades().then(success => {
  if (success) {
    console.log('✅ Especialidades verificadas e criadas se necessário');
  } else {
    console.error('❌ Falha ao verificar/criar especialidades');
  }
});

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
    // Garantir que as especialidades padrão existam
    await guaranteeDefaultEspecialidades();
    
    const especialidades = await Especialidade.findAll({
      order: [['nome', 'ASC']]
    });
    
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

    // Verificar se é uma especialidade padrão (1-5)
    if (id >= 1 && id <= 5) {
      return res.status(400).json({
        message: "Não é possível remover uma especialidade padrão do sistema."
      });
    }

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