const { Servicio } = require('../models');
const { validationResult } = require('express-validator');

module.exports = {
  // Devuelve todos los servicios SOLO del usuario autenticado (requiere campo usuarioId en el modelo Servicio).
  getServicios: async (req, res) => {
    try {
      const servicios = await Servicio.findAll({ where: { usuarioId: req.user.id } });
      res.json(servicios);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Devuelve un servicio específico SOLO si pertenece al usuario autenticado.
  getServicioById: async (req, res) => {
    try {
      const servicio = await Servicio.findByPk(req.params.id);
      if (!servicio) return res.status(404).json({ error: 'Servicio no encontrado' });
      if (servicio.usuarioId !== req.user.id) return res.status(403).json({ error: 'No autorizado' });
      res.json(servicio);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Crea un nuevo servicio SOLO para el usuario autenticado.
  createServicio: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    try {
      const { nombre, categoriaId, logoUrl, sitioWeb } = req.body;
      const nuevoServicio = await Servicio.create({ nombre, categoriaId, logoUrl, sitioWeb, usuarioId: req.user.id });
      res.status(201).json(nuevoServicio);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Actualiza los datos de un servicio existente SOLO si pertenece al usuario autenticado.
  updateServicio: async (req, res) => {
    try {
      const servicio = await Servicio.findByPk(req.params.id);
      if (!servicio) return res.status(404).json({ error: 'Servicio no encontrado' });
      if (servicio.usuarioId !== req.user.id) return res.status(403).json({ error: 'No autorizado' });
      await servicio.update(req.body);
      res.json(servicio);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Elimina un servicio por su ID SOLO si pertenece al usuario autenticado.
  deleteServicio: async (req, res) => {
    try {
      const servicio = await Servicio.findByPk(req.params.id);
      if (!servicio) return res.status(404).json({ error: 'Servicio no encontrado' });
      if (servicio.usuarioId !== req.user.id) return res.status(403).json({ error: 'No autorizado' });
      await servicio.destroy();
      res.json({ mensaje: 'Servicio eliminado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
