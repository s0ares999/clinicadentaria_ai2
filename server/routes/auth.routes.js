const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Rota para registro de usuário
router.post('/signup', authController.signup);

// Rota para login de usuário
router.post('/signin', authController.signin);

module.exports = router;
