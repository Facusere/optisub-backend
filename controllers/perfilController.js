const { Perfil } = require('../models');
const { validationResult } = require('express-validator');

module.exports = {
  // Devuelve todos los perfiles SOLO del usuario autenticado.
  getPerfiles: async (req, res) => {
    try {
      const perfiles = await Perfil.findAll({ where: { usuarioId: req.user.id } });
      res.json(perfiles);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Devuelve un perfil específico SOLO si pertenece al usuario autenticado.
  getPerfilById: async (req, res) => {
    try {
      const perfil = await Perfil.findByPk(req.params.id);
      if (!perfil) return res.status(404).json({ error: 'Perfil no encontrado' });
      if (perfil.usuarioId !== req.user.id) return res.status(403).json({ error: 'No autorizado' });
      res.json(perfil);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Crea un nuevo perfil SOLO para el usuario autenticado (ignora usuarioId del body).
  createPerfil: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    try {
      const { nombre, tipo } = req.body;
      const nuevoPerfil = await Perfil.create({ nombre, tipo, usuarioId: req.user.id });
      res.status(201).json(nuevoPerfil);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Actualiza los datos de un perfil existente SOLO si pertenece al usuario autenticado.
  updatePerfil: async (req, res) => {
    try {
      const perfil = await Perfil.findByPk(req.params.id);
      if (!perfil) return res.status(404).json({ error: 'Perfil no encontrado' });
      if (perfil.usuarioId !== req.user.id) return res.status(403).json({ error: 'No autorizado' });
      await perfil.update(req.body);
      res.json(perfil);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Elimina un perfil por su ID SOLO si pertenece al usuario autenticado.
  deletePerfil: async (req, res) => {
    try {
      const perfil = await Perfil.findByPk(req.params.id);
      if (!perfil) return res.status(404).json({ error: 'Perfil no encontrado' });
      if (perfil.usuarioId !== req.user.id) return res.status(403).json({ error: 'No autorizado' });
      await perfil.destroy();
      res.json({ mensaje: 'Perfil eliminado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
// No se requieren cambios aquí para los costos.

