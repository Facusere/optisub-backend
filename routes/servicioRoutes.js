const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const servicioController = require('../controllers/servicioController');
const verifyToken = require('../middlewares/verifyToken');

// Validaciones para crear o editar servicio
const validarServicio = [
  body('nombre').notEmpty().withMessage('El nombre del servicio es obligatorio'),
  body('categoriaId').isInt().withMessage('La categoría debe ser un número entero')
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
// GET /api/servicios - Lista todos los servicios
router.get('/', verifyToken, servicioController.getServicios);

// POST /api/servicios - Crea un servicio nuevo
router.post(
  '/',
  verifyToken,
  validarServicio,
  checkValidaciones,
  servicioController.createServicio
);

// PUT /api/servicios/:id - Actualiza un servicio existente
router.put(
  '/:id',
  verifyToken,
  validarServicio,
  checkValidaciones,
  servicioController.updateServicio
);

// DELETE /api/servicios/:id - Elimina un servicio
router.delete('/:id', verifyToken, servicioController.deleteServicio);

module.exports = router;