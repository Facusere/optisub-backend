const { Suscripcion } = require('../models');
const { validationResult } = require('express-validator');

module.exports = {
  // Devuelve todas las suscripciones de la base de datos.
  getSuscripciones: async (req, res) => {
    try {
      const suscripciones = await Suscripcion.findAll();
      res.json(suscripciones);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Devuelve una suscripción específica por su ID.
  getSuscripcionById: async (req, res) => {
    try {
      const suscripcion = await Suscripcion.findByPk(req.params.id);
      if (!suscripcion) return res.status(404).json({ error: 'Suscripción no encontrada' });
      res.json(suscripcion);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Crea una nueva suscripción.
  createSuscripcion: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    try {
      const { perfilId, servicioId, monto, moneda, frecuencia, fechaInicio, activa } = req.body;
      const nueva = await Suscripcion.create({ perfilId, servicioId, monto, moneda, frecuencia, fechaInicio, activa });
      res.status(201).json(nueva);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Actualiza los datos de una suscripción existente.
  updateSuscripcion: async (req, res) => {
    try {
      const suscripcion = await Suscripcion.findByPk(req.params.id);
      if (!suscripcion) return res.status(404).json({ error: 'Suscripción no encontrada' });

      await suscripcion.update(req.body);
      res.json(suscripcion);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Elimina una suscripción por su ID.
  deleteSuscripcion: async (req, res) => {
    try {
      const { id } = req.params;
      const eliminada = await Suscripcion.destroy({ where: { id } });

      if (eliminada === 0) {
        return res.status(404).json({ error: 'Suscripción no encontrada' });
      }

      res.json({ mensaje: 'Suscripción eliminada correctamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

};

