const db = require('../models');
const Cliente = db.Cliente;
const User = db.User;
const jwt = require('jsonwebtoken');

// Criar e salvar um novo cliente
exports.create = async (req, res) => {
  try {
    // Validar requisição
    if (!req.body.nome || !req.body.email) {
      return res.status(400).json({
        message: "Nome e email são obrigatórios!"
      });
    }

    // Criar um cliente
    const cliente = {
      nome: req.body.nome,
      email: req.body.email,
      telefone: req.body.telefone,
      dataNascimento: req.body.dataNascimento,
      morada: req.body.morada,
      nif: req.body.nif,
      historico: req.body.historico ? JSON.stringify(req.body.historico) : JSON.stringify([])
    };

    // Salvar o cliente no banco de dados
    const data = await Cliente.create(cliente);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Ocorreu um erro ao criar o cliente."
    });
  }
};

// Buscar todos os clientes do banco de dados
exports.findAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const size = parseInt(req.query.size) || 10;
    const { count, rows } = await Cliente.findAndCountAll({
      limit: size,
      offset: page * size,
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json({
      items: rows,
      total: count
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Ocorreu um erro ao buscar os clientes."
    });
  }
};

// Buscar todos os clientes do banco de dados (rota pública)
exports.findAllPublic = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const size = parseInt(req.query.size) || 10;
    const { count, rows } = await Cliente.findAndCountAll({
      attributes: ['id', 'nome', 'email', 'telefone', 'dataNascimento'], // Limitando os campos retornados por segurança
      limit: size,
      offset: page * size,
      order: [['createdAt', 'DESC']]
    });
    
    res.status(200).json({
      items: rows,
      total: count
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Ocorreu um erro ao buscar os clientes."
    });
  }
};

// Buscar um único cliente pelo id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Cliente.findByPk(id);
    if (data) {
      res.status(200).json(data);
    } else {
      res.status(404).json({
        message: `Cliente com id=${id} não encontrado.`
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Erro ao buscar cliente com id=${id}`
    });
  }
};

// Buscar perfil do cliente autenticado
exports.findProfile = async (req, res) => {
  try {
    // Obter o token do cabeçalho
    const token = req.headers['x-access-token'];
    
    if (!token) {
      return res.status(403).json({ message: "Nenhum token fornecido!" });
    }
    
    // Verificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    
    // Buscar o usuário
    const user = await User.findByPk(userId);
    
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }
    
    // Buscar o cliente pelo email
    const cliente = await Cliente.findOne({
      where: { email: user.email }
    });
    
    if (!cliente) {
      return res.status(404).json({ message: "Perfil de cliente não encontrado!" });
    }
    
    res.status(200).json(cliente);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Ocorreu um erro ao buscar o perfil do cliente."
    });
  }
};

// Atualizar um cliente pelo id
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Cliente.update(req.body, {
      where: { id: id }
    });

    if (num == 1) {
      res.status(200).json({
        message: "Cliente atualizado com sucesso."
      });
    } else {
      res.status(404).json({
        message: `Não foi possível atualizar o cliente com id=${id}. Cliente não encontrado ou corpo da requisição vazio!`
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Erro ao atualizar cliente com id=${id}`
    });
  }
};

// Atualizar perfil do cliente autenticado
exports.updateProfile = async (req, res) => {
  try {
    // Obter o token do cabeçalho
    const token = req.headers['x-access-token'];
    
    if (!token) {
      return res.status(403).json({ message: "Nenhum token fornecido!" });
    }
    
    // Verificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    
    // Buscar o usuário
    const user = await User.findByPk(userId);
    
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }
    
    // Buscar o cliente pelo email
    const cliente = await Cliente.findOne({
      where: { email: user.email }
    });
    
    if (!cliente) {
      return res.status(404).json({ message: "Perfil de cliente não encontrado!" });
    }
    
    // Atualizar os dados do cliente
    await Cliente.update(
      {
        nome: req.body.nome,
        telefone: req.body.telefone,
        dataNascimento: req.body.dataNascimento,
        morada: req.body.morada,
        nif: req.body.nif
      },
      { where: { id: cliente.id } }
    );
    
    res.status(200).json({ message: "Perfil atualizado com sucesso!" });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Ocorreu um erro ao atualizar o perfil do cliente."
    });
  }
};

// Atualizar histórico do cliente autenticado
exports.updateHistorico = async (req, res) => {
  try {
    // Obter o token do cabeçalho
    const token = req.headers['x-access-token'];
    
    if (!token) {
      return res.status(403).json({ message: "Nenhum token fornecido!" });
    }
    
    // Verificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    
    // Buscar o usuário
    const user = await User.findByPk(userId);
    
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }
    
    // Buscar o cliente pelo email
    const cliente = await Cliente.findOne({
      where: { email: user.email }
    });
    
    if (!cliente) {
      return res.status(404).json({ message: "Perfil de cliente não encontrado!" });
    }
    
    // Atualizar o histórico do cliente
    await Cliente.update(
      { historico: req.body.historico ? JSON.stringify(req.body.historico) : JSON.stringify([]) },
      { where: { id: cliente.id } }
    );
    
    res.status(200).json({ message: "Histórico atualizado com sucesso!" });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Ocorreu um erro ao atualizar o histórico do cliente."
    });
  }
};

// Deletar um cliente pelo id
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const num = await Cliente.destroy({
      where: { id: id }
    });

    if (num == 1) {
      res.status(200).json({
        message: "Cliente excluído com sucesso!"
      });
    } else {
      res.status(404).json({
        message: `Não foi possível excluir o cliente com id=${id}. Cliente não encontrado!`
      });
    }
  } catch (err) {
    res.status(500).json({
      message: `Erro ao excluir cliente com id=${id}`
    });
  }
};
