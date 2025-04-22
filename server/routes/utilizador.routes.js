const express = require('express');
const router = express.Router();
const utilizadorController = require('../controllers/utilizador.controller');
const authMiddleware = require('../middleware/auth.middleware');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuração do Multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads/profile-pictures');
    // Criar pasta se não existir
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Gerar nome único com timestamp, id do usuário e extensão original
    const timestamp = Date.now();
    const userId = req.userId;
    const fileExt = path.extname(file.originalname);
    cb(null, `user_${userId}_${timestamp}${fileExt}`);
  }
});

// Filtro para permitir apenas imagens
const fileFilter = (req, file, cb) => {
  // Aceitar apenas imagens
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Apenas imagens são permitidas!'), false);
  }
};

const upload = multer({ 
  storage, 
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // Limite de 5MB
  }
});

// Rota para obter todos os utilizadores
router.get('/', [authMiddleware.verifyToken, authMiddleware.isAdmin], utilizadorController.findAll);

// Rota para obter todos os clientes
router.get('/clientes', [authMiddleware.verifyToken, authMiddleware.isAdmin], utilizadorController.findAllClientes);

// Rota para obter todos os médicos
router.get('/medicos', [authMiddleware.verifyToken], utilizadorController.findAllMedicos);

// Rota para upload de imagem de perfil
router.post('/upload-profile-picture', [authMiddleware.verifyToken, upload.single('foto_perfil')], async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhuma imagem enviada' });
    }

    // URL relativa da imagem
    const imageUrl = `/uploads/profile-pictures/${req.file.filename}`;
    
    // Atualizar o campo foto_perfil do usuário
    const userId = req.userId;
    await utilizadorController.updateProfilePicture(req, res, userId, imageUrl);
    
  } catch (error) {
    console.error('Erro no upload de imagem:', error);
    return res.status(500).json({ 
      message: 'Erro ao processar o upload da imagem',
      error: error.message
    });
  }
});

// Rota para criar um novo utilizador
router.post('/', [authMiddleware.verifyToken, authMiddleware.isAdmin], utilizadorController.create);

// Rota para obter um utilizador específico
router.get('/:id', [authMiddleware.verifyToken], utilizadorController.findOne);

// Rota para atualizar um utilizador
router.put('/:id', [authMiddleware.verifyToken], utilizadorController.update);

// Rota para remover um utilizador
router.delete('/:id', [authMiddleware.verifyToken, authMiddleware.isAdmin], utilizadorController.delete);

module.exports = router;