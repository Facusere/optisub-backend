const { Recordatorio } = require('../models');
const { validationResult } = require('express-validator');

module.exports = {
  // Devuelve todos los recordatorios de la base de datos.
  getRecordatorios: async (req, res) => {
    try {
      const recordatorios = await Recordatorio.findAll();
      res.json(recordatorios);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Devuelve un recordatorio específico por su ID.
  getRecordatorioById: async (req, res) => {
    try {
      const recordatorio = await Recordatorio.findByPk(req.params.id);
      if (!recordatorio) return res.status(404).json({ error: 'Recordatorio no encontrado' });
      res.json(recordatorio);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Crea un nuevo recordatorio.
  createRecordatorio: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    try {
      const { suscripcionId, tipo, fechaProgramada } = req.body;
      const nuevo = await Recordatorio.create({ suscripcionId, tipo, fechaProgramada });
      res.status(201).json(nuevo);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Actualiza los datos de un recordatorio existente.
  updateRecordatorio: async (req, res) => {
    try {
      const recordatorio = await Recordatorio.findByPk(req.params.id);
      if (!recordatorio) return res.status(404).json({ error: 'Recordatorio no encontrado' });

      await recordatorio.update(req.body);
      res.json(recordatorio);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Elimina un recordatorio por su ID.
  deleteRecordatorio: async (req, res) => {
    try {
      const { id } = req.params;
      const eliminado = await Recordatorio.destroy({ where: { id } });

      if (eliminado === 0) {
        return res.status(404).json({ error: 'Recordatorio no encontrado' });
      }

      res.json({ mensaje: 'Recordatorio eliminado correctamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
