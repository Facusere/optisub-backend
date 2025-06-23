const { Pago } = require('../models');
const { validationResult } = require('express-validator');

module.exports = {
  // Devuelve todos los pagos SOLO de las suscripciones del usuario autenticado, optimizado con JOIN.
  getPagos: async (req, res) => {
    try {
      const { Suscripcion, Perfil } = require('../models');
      const pagos = await Pago.findAll({
        include: [{
          model: Suscripcion,
          as: 'suscripcion',
          required: true,
          include: [{
            model: Perfil,
            as: 'perfil',
            required: true,
            where: { usuarioId: req.user.id }
          }]
        }]
      });
      res.json(pagos);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Devuelve un pago específico SOLO si pertenece a una suscripción del usuario autenticado, optimizado con JOIN.
  getPagoById: async (req, res) => {
    try {
      const { Suscripcion, Perfil } = require('../models');
      const pago = await Pago.findOne({
        where: { id: req.params.id },
        include: [{
          model: Suscripcion,
          as: 'suscripcion',
          required: true,
          include: [{
            model: Perfil,
            as: 'perfil',
            required: true,
            where: { usuarioId: req.user.id }
          }]
        }]
      });
      if (!pago) return res.status(404).json({ error: 'Pago no encontrado o no autorizado' });
      res.json(pago);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Crea un nuevo pago SOLO si la suscripción pertenece al usuario autenticado.
  createPago: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    try {
      const { suscripcionId, fechaPago, montoPagado, metodoPago, moneda } = req.body;
      const { Suscripcion, Perfil } = require('../models');
      const suscripcion = await Suscripcion.findByPk(suscripcionId);
      if (!suscripcion) return res.status(404).json({ error: 'Suscripción no encontrada' });
      const perfil = await Perfil.findByPk(suscripcion.perfilId);
      if (!perfil || perfil.usuarioId !== req.user.id) return res.status(403).json({ error: 'No autorizado' });
      const nuevoPago = await Pago.create({ suscripcionId, fechaPago, montoPagado, metodoPago, moneda });
      res.status(201).json(nuevoPago);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Actualiza los datos de un pago existente SOLO si pertenece al usuario autenticado.
  updatePago: async (req, res) => {
    try {
      const pago = await Pago.findByPk(req.params.id);
      if (!pago) return res.status(404).json({ error: 'Pago no encontrado' });
      const { Suscripcion, Perfil } = require('../models');
      const suscripcion = await Suscripcion.findByPk(pago.suscripcionId);
      if (!suscripcion) return res.status(404).json({ error: 'Suscripción no encontrada' });
      const perfil = await Perfil.findByPk(suscripcion.perfilId);
      if (!perfil || perfil.usuarioId !== req.user.id) return res.status(403).json({ error: 'No autorizado' });
      const { suscripcionId, fechaPago, montoPagado, metodoPago, moneda } = req.body;
      await pago.update({ suscripcionId, fechaPago, montoPagado, metodoPago, moneda });
      res.json(pago);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Elimina un pago por su ID SOLO si pertenece al usuario autenticado.
  deletePago: async (req, res) => {
    try {
      const pago = await Pago.findByPk(req.params.id);
      if (!pago) return res.status(404).json({ error: 'Pago no encontrado' });
      const { Suscripcion, Perfil } = require('../models');
      const suscripcion = await Suscripcion.findByPk(pago.suscripcionId);
      if (!suscripcion) return res.status(404).json({ error: 'Suscripción no encontrada' });
      const perfil = await Perfil.findByPk(suscripcion.perfilId);
      if (!perfil || perfil.usuarioId !== req.user.id) return res.status(403).json({ error: 'No autorizado' });
      await pago.destroy();
      res.json({ mensaje: 'Pago eliminado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
