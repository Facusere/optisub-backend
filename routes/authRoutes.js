const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/login - Login de usuario (con JWT)
router.post('/login', authController.login);

// POST /api/auth/register - Registro de usuario
router.post('/register', authController.register);

module.exports = router;
