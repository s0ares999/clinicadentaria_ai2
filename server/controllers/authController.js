const db = require('../models');
const User = db.User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sequelize } = db;

const JWT_SECRET = process.env.JWT_SECRET || 'clinica_dentaria_secret_key';
const JWT_EXPIRATION = '24h';

const AuthController = {
  /**
   * Processa o registro de novos usuários
   */
  async register(req, res) {
    try {
      const { username, email, password, role } = req.body;
      
      // Verificar se o usuário já existe
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ 
          success: false, 
          message: 'O email já está em uso' 
        });
      }
      
      // Criar novo usuário
      const user = await User.create({
        username,
        email,
        password, // Será hasheado pelo hook beforeCreate
        role: role || 'cliente' // Default para cliente
      });
      
      // Se o usuário for do tipo cliente, também adicionar na tabela Clientes
      if (role === 'cliente' || !role) {
        try {
          await sequelize.query(`
            INSERT INTO "Utilizadores" (nome, email, senha, telefone, tipo_utilizador_id, "createdAt", "updatedAt")
            VALUES ($1, $2, $3, $4, 1, NOW(), NOW())
            ON CONFLICT (email) DO NOTHING
          `, { 
            replacements: [username, email, user.password, req.body.telefone || ''] 
          });
          
          // Obter ID do utilizador inserido
          const [utilizador] = await sequelize.query(`
            SELECT id FROM "Utilizadores" WHERE email = $1
          `, { 
            replacements: [email],
            type: sequelize.QueryTypes.SELECT 
          });
          
          if (utilizador) {
            await sequelize.query(`
              INSERT INTO "Clientes" (utilizador_id, nome, email, telefone)
              VALUES ($1, $2, $3, $4)
              ON CONFLICT (utilizador_id) DO NOTHING
            `, { 
              replacements: [
                utilizador.id, 
                username, 
                email, 
                req.body.telefone || ''
              ] 
            });
          }
        } catch (err) {
          console.error('Erro ao adicionar cliente:', err);
          // Continuar mesmo com erro, pois o usuário já foi criado na tabela Users
        }
      }
      
      // Gerar token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRATION }
      );
      
      // Resposta
      return res.status(201).json({
        success: true,
        message: 'Usuário registrado com sucesso',
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Erro no registro:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Erro ao processar o registro: ' + error.message 
      });
    }
  },
  
  /**
   * Processa o login de usuários
   */
  async login(req, res) {
    try {
      const { email, password } = req.body;
      
      // Verificar credenciais na tabela Users
      const user = await User.findOne({ where: { email } });
      
      if (user && bcrypt.compareSync(password, user.password)) {
        // Gerar token
        const token = jwt.sign(
          { id: user.id, email: user.email, role: user.role },
          JWT_SECRET,
          { expiresIn: JWT_EXPIRATION }
        );
        
        return res.json({
          success: true,
          message: 'Login realizado com sucesso',
          token,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
          }
        });
      }
      
      // Se não encontrou na tabela Users, tentar na tabela Utilizadores
      try {
        const [utilizador] = await sequelize.query(`
          SELECT u.*, t.nome as tipo 
          FROM "Utilizadores" u
          JOIN "TipoUtilizador" t ON u.tipo_utilizador_id = t.id
          WHERE u.email = $1
        `, { 
          replacements: [email],
          type: sequelize.QueryTypes.SELECT
        });
        
        if (utilizador && bcrypt.compareSync(password, utilizador.senha)) {
          // Gerar token
          const token = jwt.sign(
            { 
              id: utilizador.id, 
              email: utilizador.email,
              role: utilizador.tipo
            },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRATION }
          );
          
          return res.json({
            success: true,
            message: 'Login realizado com sucesso',
            token,
            user: {
              id: utilizador.id,
              username: utilizador.nome,
              email: utilizador.email,
              role: utilizador.tipo
            }
          });
        }
      } catch (err) {
        // Ignorar erro se a tabela não existir
      }
      
      return res.status(401).json({ 
        success: false, 
        message: 'Email ou senha incorretos' 
      });
    } catch (error) {
      console.error('Erro no login:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Erro ao processar o login: ' + error.message 
      });
    }
  },
  
  /**
   * Verifica se o token é válido
   */
  async verifyToken(req, res) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ 
          success: false, 
          message: 'Token não fornecido' 
        });
      }
      
      const decoded = jwt.verify(token, JWT_SECRET);
      
      // Verificar se o usuário existe na tabela Users
      const user = await User.findOne({ 
        where: { id: decoded.id, email: decoded.email } 
      });
      
      if (user) {
        return res.json({
          success: true,
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role
          }
        });
      }
      
      // Se não encontrou na tabela Users, tentar na tabela Utilizadores
      const [utilizador] = await sequelize.query(`
        SELECT u.*, t.nome as tipo 
        FROM "Utilizadores" u
        JOIN "TipoUtilizador" t ON u.tipo_utilizador_id = t.id
        WHERE u.id = $1 AND u.email = $2
      `, { 
        replacements: [decoded.id, decoded.email],
        type: sequelize.QueryTypes.SELECT
      });
      
      if (utilizador) {
        return res.json({
          success: true,
          user: {
            id: utilizador.id,
            username: utilizador.nome,
            email: utilizador.email,
            role: utilizador.tipo
          }
        });
      }
      
      return res.status(401).json({ 
        success: false, 
        message: 'Token inválido ou expirado' 
      });
    } catch (error) {
      return res.status(401).json({ 
        success: false, 
        message: 'Token inválido ou expirado' 
      });
    }
  }
};

module.exports = AuthController; 