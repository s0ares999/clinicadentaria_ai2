const db = require('../models');
const bcrypt = require('bcryptjs');
const Utilizador = db.Utilizador;
const TipoUtilizador = db.TipoUtilizador;
const Cliente = db.Cliente;
const Medico = db.Medico;
const Admin = db.Admin;
const Especialidade = db.Especialidade;

// Buscar todos os utilizadores
exports.findAll = async (req, res) => {
  try {
    const utilizadores = await Utilizador.findAll({
      attributes: { exclude: ['senha'] },
      include: [{
        model: TipoUtilizador,
        as: 'tipoUtilizador',
        attributes: ['nome']
      }]
    });
    
    res.status(200).json(utilizadores);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Ocorreu um erro ao buscar os utilizadores."
    });
  }
};

// Buscar um utilizador específico
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;
    
    const utilizador = await Utilizador.findByPk(id, {
      attributes: { exclude: ['senha'] },
      include: [{
        model: TipoUtilizador,
        as: 'tipoUtilizador',
        attributes: ['nome']
      }]
    });
    
    if (!utilizador) {
      return res.status(404).json({
        message: `Utilizador com ID ${id} não encontrado!`
      });
    }
    
    res.status(200).json(utilizador);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Ocorreu um erro ao buscar o utilizador."
    });
  }
};

// Criar um novo utilizador
exports.create = async (req, res) => {
  try {
    // Validar dados
    if (!req.body.nome || !req.body.email || !req.body.senha || !req.body.tipo_utilizador_id) {
      return res.status(400).json({
        message: "Campos obrigatórios não preenchidos!"
      });
    }
    
    // Verificar se e-mail já existe
    const usuarioExistente = await Utilizador.findOne({
      where: { email: req.body.email }
    });
    
    if (usuarioExistente) {
      return res.status(400).json({
        message: "E-mail já está em uso!"
      });
    }
    
    // Hash da senha
    const senhaCriptografada = bcrypt.hashSync(req.body.senha, 8);
    
    // Criar utilizador
    const utilizador = await Utilizador.create({
      nome: req.body.nome,
      email: req.body.email,
      senha: senhaCriptografada,
      telefone: req.body.telefone || null,
      tipo_utilizador_id: req.body.tipo_utilizador_id
    });
    
    res.status(201).json({
      message: "Utilizador criado com sucesso!",
      utilizador: {
        id: utilizador.id,
        nome: utilizador.nome,
        email: utilizador.email
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Ocorreu um erro ao criar o utilizador."
    });
  }
};

// Atualizar utilizador
exports.update = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Verificar se o utilizador existe
    const utilizador = await Utilizador.findByPk(id);
    if (!utilizador) {
      return res.status(404).json({
        message: `Utilizador com ID ${id} não encontrado!`
      });
    }
    
    // Verificar permissões - apenas o próprio utilizador ou um admin pode atualizar
    if (req.userId !== utilizador.id && !req.userRole === 'admin') {
      return res.status(403).json({
        message: "Você não tem permissão para atualizar este utilizador!"
      });
    }
    
    // Preparar dados para atualização
    const dadosAtualizados = {};
    
    if (req.body.nome) dadosAtualizados.nome = req.body.nome;
    if (req.body.telefone) dadosAtualizados.telefone = req.body.telefone;
    
    // Apenas admin pode mudar o tipo de utilizador
    if (req.body.tipo_utilizador_id && req.userRole === 'admin') {
      dadosAtualizados.tipo_utilizador_id = req.body.tipo_utilizador_id;
    }
    
    // Se tiver senha, criar hash
    if (req.body.senha) {
      dadosAtualizados.senha = bcrypt.hashSync(req.body.senha, 8);
    }
    
    // Atualizar utilizador
    await utilizador.update(dadosAtualizados);
    
    res.status(200).json({
      message: "Utilizador atualizado com sucesso!"
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        message: "Email já está em uso!"
      });
    }
    res.status(500).json({
      message: error.message || "Ocorreu um erro ao atualizar o utilizador."
    });
  }
};

// Remover utilizador
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    
    // Verificar se o utilizador existe
    const utilizador = await Utilizador.findByPk(id);
    if (!utilizador) {
      return res.status(404).json({
        message: `Utilizador com ID ${id} não encontrado!`
      });
    }

    // Remover utilizador
    await utilizador.destroy();

    res.status(200).json({
      message: "Utilizador removido com sucesso!"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Ocorreu um erro ao remover o utilizador."
    });
  }
};

// Buscar todos os clientes
exports.findAllClientes = async (req, res) => {
  try {
    const tipoCliente = await TipoUtilizador.findOne({
      where: { nome: 'cliente' }
    });

    if (!tipoCliente) {
      return res.status(404).json({
        message: "Tipo 'cliente' não encontrado!"
      });
    }

    const clientes = await Utilizador.findAll({
      where: { tipo_utilizador_id: tipoCliente.id },
      include: [
        {
          model: Cliente,
          as: 'cliente'
        }
      ],
      attributes: { exclude: ['senha'] }
    });

    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Ocorreu um erro ao buscar os clientes."
    });
  }
};

// Buscar todos os médicos
exports.findAllMedicos = async (req, res) => {
  try {
    const tipoMedico = await TipoUtilizador.findOne({
      where: { nome: 'medico' }
    });

    if (!tipoMedico) {
      return res.status(404).json({
        message: "Tipo 'medico' não encontrado!"
      });
    }

    const medicos = await Utilizador.findAll({
      where: { tipo_utilizador_id: tipoMedico.id },
      include: [
        {
          model: Medico,
          as: 'medico',
          include: [
            {
              model: Especialidade,
              as: 'especialidade'
            }
          ]
        }
      ],
      attributes: { exclude: ['senha'] }
    });

    res.status(200).json(medicos);
  } catch (error) {
    res.status(500).json({
      message: error.message || "Ocorreu um erro ao buscar os médicos."
    });
  }
};