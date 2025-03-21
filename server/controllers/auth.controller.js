const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config");
const db = require("../models");
const Utilizador = db.Utilizador;
const TipoUtilizador = db.TipoUtilizador;
const Cliente = db.Cliente;

// Login usando a tabela Utilizadores com nome correto (com U maiúsculo)
exports.signin = async (req, res) => {
  try {
    console.log("=== TENTATIVA DE LOGIN ===");
    console.log("Email:", req.body.email);

    // Usar SQL direto com o nome correto da tabela
    const [utilizadores] = await db.sequelize.query(
      'SELECT u.*, t.nome as tipo FROM "Utilizadores" u ' +
      'LEFT JOIN "TipoUtilizador" t ON u.tipo_utilizador_id = t.id ' +
      'WHERE u.email = ?',
      {
        replacements: [req.body.email],
        type: db.sequelize.QueryTypes.SELECT
      }
    );
    
    // Se não encontrou utilizador
    if (!utilizadores) {
      console.log("❌ Utilizador não encontrado");
      return res.status(401).json({ 
        message: "Email ou senha incorretos." 
      });
    }

    console.log("✅ Utilizador encontrado:", utilizadores.id, utilizadores.email);

    // Verificar senha
    if (!bcrypt.compareSync(req.body.password, utilizadores.senha)) {
      console.log("❌ Senha inválida");
      return res.status(401).json({ message: "Email ou senha incorretos." });
    }
    
    // Determinar tipo de utilizador
    const tipo = utilizadores.tipo || 
                (utilizadores.tipo_utilizador_id === 1 ? 'cliente' : 
                 utilizadores.tipo_utilizador_id === 2 ? 'admin' : 
                 utilizadores.tipo_utilizador_id === 3 ? 'medico' : 'cliente');
    
    // Gerar token JWT
    const token = jwt.sign(
      { id: utilizadores.id, email: utilizadores.email, tipo: tipo },
      config.secret,
      { expiresIn: 86400 } // 24 horas
    );
    
    console.log("✅ Login bem-sucedido. Tipo:", tipo);
    
    res.status(200).json({
      id: utilizadores.id,
      nome: utilizadores.nome,
      email: utilizadores.email,
      tipo: tipo,
      accessToken: token
    });
  } catch (error) {
    console.error("❌ Erro no login:", error);
    res.status(500).json({ 
      message: "Erro ao processar login",
      error: error.message
    });
  }
};

// Método para verificar token
exports.verifyToken = (req, res) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"];
  
  if (!token) {
    return res.status(403).json({ message: "Token não fornecido" });
  }
  
  if (token.startsWith('Bearer ')) {
    token = token.slice(7);
  }
  
  try {
    const decoded = jwt.verify(token, config.secret);
    return res.status(200).json({ valid: true, user: decoded });
  } catch (error) {
    return res.status(401).json({ valid: false, message: "Token inválido ou expirado" });
  }
};

// Método para registrar novo utilizador
exports.signup = async (req, res) => {
  try {
    if (!req.body.nome || !req.body.email || !req.body.password) {
      return res.status(400).json({ message: "Campos obrigatórios não preenchidos" });
    }
    
    // Verificar se e-mail já existe
    const [utilizadorExistente] = await db.sequelize.query(
      'SELECT * FROM "Utilizadores" WHERE email = ?',
      {
        replacements: [req.body.email],
        type: db.sequelize.QueryTypes.SELECT
      }
    );
    
    if (utilizadorExistente) {
      return res.status(400).json({ message: "E-mail já está em uso" });
    }
    
    // Hash da senha
    const senhaCriptografada = bcrypt.hashSync(req.body.password, 8);
    
    // Criar utilizador com SQL direto
    const [result] = await db.sequelize.query(
      'INSERT INTO "Utilizadores" (nome, email, senha, telefone, tipo_utilizador_id, "createdAt", "updatedAt") ' +
      'VALUES (?, ?, ?, ?, ?, NOW(), NOW()) RETURNING id',
      {
        replacements: [
          req.body.nome,
          req.body.email,
          senhaCriptografada,
          req.body.telefone || null,
          req.body.tipo_utilizador_id || 1
        ],
        type: db.sequelize.QueryTypes.INSERT
      }
    );
    
    res.status(201).json({
      message: "Utilizador registrado com sucesso",
      utilizador: {
        id: result.id,
        nome: req.body.nome,
        email: req.body.email
      }
    });
  } catch (error) {
    console.error("❌ Erro no registro:", error);
    res.status(500).json({ 
      message: "Erro ao registrar utilizador", 
      error: error.message 
    });
  }
};
