const { Usuario } = require('../models');
const { validationResult } = require('express-validator');

module.exports = {
  // Devuelve todos los usuarios de la base de datos.
  getUsuarios: async (req, res) => {
    try {
      const usuarios = await Usuario.findAll();
      res.json(usuarios);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Devuelve un usuario específico por su ID.
  getUsuarioById: async (req, res) => {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
      res.json(usuario);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Crea un nuevo usuario con los datos recibidos.
  createUsuario: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

    try {
      const { nombre, email, password, moneda_preferida } = req.body;
      const nuevoUsuario = await Usuario.create({ nombre, email, password, moneda_preferida });
      res.status(201).json(nuevoUsuario);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Actualiza los datos de un usuario existente.
  updateUsuario: async (req, res) => {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

      await usuario.update(req.body);
      res.json(usuario);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Elimina un usuario por su ID.
  deleteUsuario: async (req, res) => {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

      await usuario.destroy();
      res.status(204).send(); // No Content
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Verifica las credenciales de un usuario (sin JWT).
  loginUsuario: async (req, res) => {
    try {
      const { email, password } = req.body;
      const usuario = await Usuario.findOne({ where: { email } });

      if (!usuario || usuario.password !== password) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      res.json(usuario); // En un caso real devolverías un token JWT
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};

