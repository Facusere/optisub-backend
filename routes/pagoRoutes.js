const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const pagoController = require('../controllers/pagoController');
const verifyToken = require('../middlewares/verifyToken');

// Validaciones para crear o editar un pago
const validarPago = [
  body('suscripcionId').isInt().withMessage('El ID de la suscripción debe ser un número entero'),
  body('fechaPago').isISO8601().withMessage('La fecha de pago debe tener un formato válido'),
  body('montoPagado').isDecimal().withMessage('El monto pagado debe ser un número'),
  body('metodoPago').notEmpty().withMessage('El método de pago es obligatorio'),
  body('moneda').optional().isString().withMessage('La moneda debe ser un string')
];

// Middleware para validar
const checkValidaciones = (req, res, next) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  next();
};

// Rutas
// GET /api/pagos - Lista todos los pagos
router.get('/', verifyToken, pagoController.getPagos);

// POST /api/pagos - Crea un pago nuevo
router.post(
  '/',
  verifyToken,
  validarPago,
  checkValidaciones,
  pagoController.createPago
);

// PUT /api/pagos/:id - Actualiza un pago existente
router.put(
  '/:id',
  verifyToken,
  validarPago,
  checkValidaciones,
  pagoController.updatePago
);

// DELETE /api/pagos/:id - Elimina un pago
router.delete('/:id', verifyToken, pagoController.deletePago);

module.exports = router;
