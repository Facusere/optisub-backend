const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const recordatorioController = require('../controllers/recordatorioController');

// Validaciones
const validarRecordatorio = [
  body('suscripcionId').isInt().withMessage('El ID de la suscripción debe ser un número entero'),
  body('tipo')
    .isIn(['Email', 'Notificación', 'SMS'])
    .withMessage('El tipo debe ser "email", "notificacion" o "sms"'),
  body('fechaProgramada')
    .isISO8601()
    .withMessage('La fecha programada debe ser una fecha válida (YYYY-MM-DD)')
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
// GET /api/recordatorios - Lista todos los recordatorios
router.get('/', recordatorioController.getRecordatorios);

// POST /api/recordatorios - Crea un recordatorio nuevo
router.post(
  '/',
  validarRecordatorio,
  checkValidaciones,
  recordatorioController.createRecordatorio
);

// DELETE /api/recordatorios/:id - Elimina un recordatorio
router.delete('/:id', recordatorioController.deleteRecordatorio);

// PUT /api/recordatorios/:id - Actualiza un recordatorio existente
router.put(
  '/:id',
  validarRecordatorio,
  checkValidaciones,
  recordatorioController.updateRecordatorio
);

module.exports = router;
