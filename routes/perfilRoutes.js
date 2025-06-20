const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const perfilController = require('../controllers/perfilController');
const verifyToken = require('../middlewares/verifyToken');

// Validaciones para crear/editar perfil
const validarPerfil = [
  body('nombre').notEmpty().withMessage('El nombre del perfil es obligatorio'),
  body('tipo').notEmpty().withMessage('El tipo de perfil es obligatorio'),
  body('usuarioId').isInt().withMessage('El usuarioId debe ser un número entero')
];

// Middleware de validación
const checkValidaciones = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  next();
};

// Rutas
// GET /api/perfiles - Lista todos los perfiles
router.get('/', verifyToken, perfilController.getPerfiles);

// POST /api/perfiles - Crea un perfil nuevo
router.post(
  '/',
  verifyToken,
  validarPerfil,
  checkValidaciones,
  perfilController.createPerfil
);

// PUT /api/perfiles/:id - Actualiza un perfil existente
router.put(
  '/:id',
  verifyToken,
  validarPerfil,
  checkValidaciones,
  perfilController.updatePerfil
);

// DELETE /api/perfiles/:id - Elimina un perfil
router.delete('/:id', verifyToken, perfilController.deletePerfil);

module.exports = router;

