const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const suscripcionController = require('../controllers/suscripcionController');
const verifyToken = require('../middlewares/verifyToken');

// Validaciones para crear o editar suscripción
const validarSuscripcion = [
  body('perfilId').isInt().withMessage('El perfilId debe ser un número entero'),
  body('servicioId').isInt().withMessage('El servicioId debe ser un número entero'),
  body('monto').isDecimal().withMessage('El monto debe ser un número decimal'),
  body('moneda').notEmpty().withMessage('La moneda es obligatoria'),
  body('frecuencia').notEmpty().withMessage('La frecuencia es obligatoria'),
  body('fechaInicio').isISO8601().withMessage('La fecha de inicio debe tener formato válido (YYYY-MM-DD)'),
  body('activa').isBoolean().withMessage('El campo activa debe ser verdadero o falso')
];

// Middleware para manejar errores
const checkValidaciones = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  next();
};

// Rutas
// GET /api/suscripciones - Lista todas las suscripciones
router.get('/', verifyToken, suscripcionController.getSuscripciones);

// POST /api/suscripciones - Crea una suscripción nueva
router.post('/', verifyToken, validarSuscripcion, checkValidaciones, suscripcionController.createSuscripcion);

// PUT /api/suscripciones/:id - Actualiza una suscripción existente
router.put('/:id', verifyToken, validarSuscripcion, checkValidaciones, suscripcionController.updateSuscripcion);

// DELETE /api/suscripciones/:id - Elimina una suscripción
router.delete('/:id', verifyToken, suscripcionController.deleteSuscripcion);

module.exports = router;
