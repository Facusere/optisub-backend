const { Servicio } = require('../models');
const { validationResult } = require('express-validator');

module.exports = {
  // Devuelve todos los servicios de la base de datos.
  getServicios: async (req, res) => {
    try {
      const servicios = await Servicio.findAll();
      res.json(servicios);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Devuelve un servicio específico por su ID.
  getServicioById: async (req, res) => {
    try {
      const servicio = await Servicio.findByPk(req.params.id);
      if (!servicio) return res.status(404).json({ error: 'Servicio no encontrado' });
      res.json(servicio);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Crea un nuevo servicio.
  createServicio: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    try {
      const { nombre, categoriaId, logoUrl, sitioWeb } = req.body;
      const nuevoServicio = await Servicio.create({ nombre, categoriaId, logoUrl, sitioWeb });
      res.status(201).json(nuevoServicio);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Actualiza los datos de un servicio existente.
  updateServicio: async (req, res) => {
    try {
      const servicio = await Servicio.findByPk(req.params.id);
      if (!servicio) return res.status(404).json({ error: 'Servicio no encontrado' });

      await servicio.update(req.body);
      res.json(servicio);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Elimina un servicio por su ID.
  deleteServicio: async (req, res) => {
    try {
      const { id } = req.params;
      const eliminado = await Servicio.destroy({ where: { id } });

      if (eliminado === 0) {
        return res.status(404).json({ error: 'Servicio no encontrado' });
      }

      res.json({ mensaje: 'Servicio eliminado correctamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
