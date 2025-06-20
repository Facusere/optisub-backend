const { Recordatorio } = require('../models');
const { validationResult } = require('express-validator');

module.exports = {
  // Devuelve todos los recordatorios SOLO de las suscripciones del usuario autenticado.
  getRecordatorios: async (req, res) => {
    try {
      const { Suscripcion, Perfil } = require('../models');
      const perfiles = await Perfil.findAll({ where: { usuarioId: req.user.id } });
      const perfilIds = perfiles.map(p => p.id);
      if (perfilIds.length === 0) return res.json([]);
      const suscripciones = await Suscripcion.findAll({ where: { perfilId: perfilIds } });
      const suscripcionIds = suscripciones.map(s => s.id);
      if (suscripcionIds.length === 0) return res.json([]);
      const recordatorios = await Recordatorio.findAll({ where: { suscripcionId: suscripcionIds } });
      res.json(recordatorios);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Devuelve un recordatorio específico SOLO si pertenece a una suscripción del usuario autenticado.
  getRecordatorioById: async (req, res) => {
    try {
      const recordatorio = await Recordatorio.findByPk(req.params.id);
      if (!recordatorio) return res.status(404).json({ error: 'Recordatorio no encontrado' });
      const { Suscripcion, Perfil } = require('../models');
      const suscripcion = await Suscripcion.findByPk(recordatorio.suscripcionId);
      if (!suscripcion) return res.status(404).json({ error: 'Suscripción no encontrada' });
      const perfil = await Perfil.findByPk(suscripcion.perfilId);
      if (!perfil || perfil.usuarioId !== req.user.id) return res.status(403).json({ error: 'No autorizado' });
      res.json(recordatorio);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Crea un nuevo recordatorio SOLO si la suscripción pertenece al usuario autenticado.
  createRecordatorio: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    try {
      const { suscripcionId, tipo, fechaProgramada } = req.body;
      const { Suscripcion, Perfil } = require('../models');
      const suscripcion = await Suscripcion.findByPk(suscripcionId);
      if (!suscripcion) return res.status(404).json({ error: 'Suscripción no encontrada' });
      const perfil = await Perfil.findByPk(suscripcion.perfilId);
      if (!perfil || perfil.usuarioId !== req.user.id) return res.status(403).json({ error: 'No autorizado' });
      const nuevo = await Recordatorio.create({ suscripcionId, tipo, fechaProgramada });
      res.status(201).json(nuevo);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Actualiza los datos de un recordatorio existente SOLO si pertenece al usuario autenticado.
  updateRecordatorio: async (req, res) => {
    try {
      const recordatorio = await Recordatorio.findByPk(req.params.id);
      if (!recordatorio) return res.status(404).json({ error: 'Recordatorio no encontrado' });
      const { Suscripcion, Perfil } = require('../models');
      const suscripcion = await Suscripcion.findByPk(recordatorio.suscripcionId);
      if (!suscripcion) return res.status(404).json({ error: 'Suscripción no encontrada' });
      const perfil = await Perfil.findByPk(suscripcion.perfilId);
      if (!perfil || perfil.usuarioId !== req.user.id) return res.status(403).json({ error: 'No autorizado' });
      await recordatorio.update(req.body);
      res.json(recordatorio);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Elimina un recordatorio por su ID SOLO si pertenece al usuario autenticado.
  deleteRecordatorio: async (req, res) => {
    try {
      const recordatorio = await Recordatorio.findByPk(req.params.id);
      if (!recordatorio) return res.status(404).json({ error: 'Recordatorio no encontrado' });
      const { Suscripcion, Perfil } = require('../models');
      const suscripcion = await Suscripcion.findByPk(recordatorio.suscripcionId);
      if (!suscripcion) return res.status(404).json({ error: 'Suscripción no encontrada' });
      const perfil = await Perfil.findByPk(suscripcion.perfilId);
      if (!perfil || perfil.usuarioId !== req.user.id) return res.status(403).json({ error: 'No autorizado' });
      await recordatorio.destroy();
      res.json({ mensaje: 'Recordatorio eliminado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
