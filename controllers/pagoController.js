const { Pago } = require('../models');
const { validationResult } = require('express-validator');

module.exports = {
  // Devuelve todos los pagos de la base de datos (puede filtrar por método).
  getPagos: async (req, res) => {
    try {
      const where = {};
      if (req.query.metodo) {
        where.metodoPago = req.query.metodo;
      }

      const pagos = await Pago.findAll({ where });
      res.json(pagos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Devuelve un pago específico por su ID.
  getPagoById: async (req, res) => {
    try {
      const pago = await Pago.findByPk(req.params.id);
      if (!pago) return res.status(404).json({ error: 'Pago no encontrado' });
      res.json(pago);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Crea un nuevo pago.
  createPago: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    try {
      const { suscripcionId, fechaPago, montoPagado, metodoPago } = req.body;
      const nuevoPago = await Pago.create({ suscripcionId, fechaPago, montoPagado, metodoPago });
      res.status(201).json(nuevoPago);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Actualiza los datos de un pago existente.
  updatePago: async (req, res) => {
    try {
      const pago = await Pago.findByPk(req.params.id);
      if (!pago) return res.status(404).json({ error: 'Pago no encontrado' });

      await pago.update(req.body);
      res.json(pago);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Elimina un pago por su ID.
  deletePago: async (req, res) => {
    try {
      const { id } = req.params;
      const eliminado = await Pago.destroy({ where: { id } });

      if (eliminado === 0) {
        return res.status(404).json({ error: 'Pago no encontrado' });
      }

      res.json({ mensaje: 'Pago eliminado correctamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
