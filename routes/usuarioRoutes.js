const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const usuarioController = require('../controllers/usuarioController');

// Validaciones para crear usuario
const validarUsuario = [
  body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
  body('email').isEmail().withMessage('Debe ser un email válido'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('moneda_preferida').notEmpty().withMessage('La moneda es obligatoria')
];

// Middleware para verificar errores
const checkValidaciones = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  next();
};

// Rutas
// GET /api/usuarios - Lista todos los usuarios
router.get('/', usuarioController.getUsuarios);

// POST /api/usuarios - Crea un usuario nuevo (con validaciones)
router.post(
  '/',
  validarUsuario,
  checkValidaciones,
  usuarioController.createUsuario
);

// POST /api/usuarios/login - Login de usuario (sin JWT)
router.post('/login', usuarioController.loginUsuario);

module.exports = router;
