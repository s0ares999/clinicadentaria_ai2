const db = require('../models');
const User = db.User;
const Cliente = db.Cliente;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro de novo usuário
exports.signup = async (req, res) => {
  try {
    // Verifica se o usuário já existe
    const userExists = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (userExists) {
      return res.status(400).json({ message: "Email já está em uso!" });
    }

    // Cria um novo usuário
    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      role: req.body.role || 'cliente'
    });

    // Se for um cliente, criar registro na tabela Cliente
    if (req.body.role === 'cliente' && req.body.clienteData) {
      await Cliente.create({
        userId: user.id,
        nome: req.body.clienteData.nome,
        email: req.body.email, // Usar o mesmo email do usuário
        telefone: req.body.clienteData.telefone,
        dataNascimento: req.body.clienteData.dataNascimento,
        morada: req.body.clienteData.morada,
        nif: req.body.clienteData.nif,
        historico: JSON.stringify([])
      });
    }

    res.status(201).json({ message: "Usuário registrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login do usuário
exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!passwordIsValid) {
      return res.status(401).json({
        accessToken: null,
        message: "Senha inválida!"
      });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: 86400 // 24 horas
    });

    // Determinar roles para compatibilidade com o frontend
    const roles = [];
    if (user.role === 'admin') {
      roles.push('ROLE_ADMIN');
    }
    if (user.role === 'cliente') {
      roles.push('ROLE_CLIENT');
    }
    roles.push('ROLE_USER');

    // Buscar dados do cliente se for um cliente
    let clienteData = null;
    if (user.role === 'cliente') {
      clienteData = await Cliente.findOne({
        where: { email: user.email }
      });
    }

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      roles: roles,
      clienteData: clienteData,
      accessToken: token
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
