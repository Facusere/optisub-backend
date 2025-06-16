const { Perfil } = require('../models');
const { validationResult } = require('express-validator');

module.exports = {
  // Devuelve todos los perfiles de la base de datos.
  getPerfiles: async (req, res) => {
    try {
      const perfiles = await Perfil.findAll();
      res.json(perfiles);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Devuelve un perfil específico por su ID.
  getPerfilById: async (req, res) => {
    try {
      const perfil = await Perfil.findByPk(req.params.id);
      if (!perfil) return res.status(404).json({ error: 'Perfil no encontrado' });
      res.json(perfil);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Crea un nuevo perfil.
  createPerfil: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    try {
      const { nombre, tipo, usuarioId } = req.body;
      const nuevoPerfil = await Perfil.create({ nombre, tipo, usuarioId });
      res.status(201).json(nuevoPerfil);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Actualiza los datos de un perfil existente.
  updatePerfil: async (req, res) => {
    try {
      const perfil = await Perfil.findByPk(req.params.id);
      if (!perfil) return res.status(404).json({ error: 'Perfil no encontrado' });

      await perfil.update(req.body);
      res.json(perfil);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Elimina un perfil por su ID.
  deletePerfil: async (req, res) => {
    try {
      const { id } = req.params;
      const eliminado = await Perfil.destroy({ where: { id } });

      if (eliminado === 0) {
        return res.status(404).json({ error: 'Perfil no encontrado' });
      }

      res.json({ mensaje: 'Perfil eliminado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
// No se requieren cambios aquí para los costos.

