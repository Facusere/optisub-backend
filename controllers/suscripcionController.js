const { Suscripcion } = require('../models');
const { validationResult } = require('express-validator');

module.exports = {
  // Devuelve todas las suscripciones SOLO de los perfiles del usuario autenticado.
  getSuscripciones: async (req, res) => {
    try {
      const { Perfil } = require('../models');
      const perfiles = await Perfil.findAll({ where: { usuarioId: req.user.id } });
      const perfilIds = perfiles.map(p => p.id);
      if (perfilIds.length === 0) return res.json([]);
      const suscripciones = await Suscripcion.findAll({ where: { perfilId: perfilIds } });
      res.json(suscripciones);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Devuelve una suscripción específica SOLO si pertenece a un perfil del usuario autenticado.
  getSuscripcionById: async (req, res) => {
    try {
      const suscripcion = await Suscripcion.findByPk(req.params.id);
      if (!suscripcion) return res.status(404).json({ error: 'Suscripción no encontrada' });
      const { Perfil } = require('../models');
      const perfil = await Perfil.findByPk(suscripcion.perfilId);
      if (!perfil || perfil.usuarioId !== req.user.id) return res.status(403).json({ error: 'No autorizado' });
      res.json(suscripcion);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Crea una nueva suscripción SOLO si el perfil pertenece al usuario autenticado.
  createSuscripcion: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    try {
      const { perfilId, servicioId, monto, moneda, frecuencia, fechaInicio, activa } = req.body;
      const { Perfil } = require('../models');
      const perfil = await Perfil.findByPk(perfilId);
      if (!perfil || perfil.usuarioId !== req.user.id) return res.status(403).json({ error: 'No autorizado' });
      const nueva = await Suscripcion.create({ perfilId, servicioId, monto, moneda, frecuencia, fechaInicio, activa });
      res.status(201).json(nueva);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Actualiza los datos de una suscripción existente SOLO si pertenece al usuario autenticado.
  updateSuscripcion: async (req, res) => {
    try {
      const suscripcion = await Suscripcion.findByPk(req.params.id);
      if (!suscripcion) return res.status(404).json({ error: 'Suscripción no encontrada' });
      const { Perfil } = require('../models');
      const perfil = await Perfil.findByPk(suscripcion.perfilId);
      if (!perfil || perfil.usuarioId !== req.user.id) return res.status(403).json({ error: 'No autorizado' });
      await suscripcion.update(req.body);
      res.json(suscripcion);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Elimina una suscripción por su ID SOLO si pertenece al usuario autenticado.
  deleteSuscripcion: async (req, res) => {
    try {
      const suscripcion = await Suscripcion.findByPk(req.params.id);
      if (!suscripcion) return res.status(404).json({ error: 'Suscripción no encontrada' });
      const { Perfil } = require('../models');
      const perfil = await Perfil.findByPk(suscripcion.perfilId);
      if (!perfil || perfil.usuarioId !== req.user.id) return res.status(403).json({ error: 'No autorizado' });
      await suscripcion.destroy();
      res.json({ mensaje: 'Suscripción eliminada' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

};

