const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const servicioController = require('../controllers/servicioController');

// Validaciones para crear o editar servicio
const validarServicio = [
  body('nombre').notEmpty().withMessage('El nombre del servicio es obligatorio'),
  body('categoriaId').isInt().withMessage('La categoría debe ser un número entero'),
  body('logoUrl').optional().isURL().withMessage('El logo debe ser una URL válida'),
  body('sitioWeb').optional().isURL().withMessage('El sitio web debe ser una URL válida')
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
router.get('/', servicioController.getServicios);

// POST /api/servicios - Crea un servicio nuevo
router.post(
  '/',
  validarServicio,
  checkValidaciones,
  servicioController.createServicio
);

// PUT /api/servicios/:id - Actualiza un servicio existente
router.put(
  '/:id',
  validarServicio,
  checkValidaciones,
  servicioController.updateServicio
);

// DELETE /api/servicios/:id - Elimina un servicio
router.delete('/:id', servicioController.deleteServicio);

module.exports = router;