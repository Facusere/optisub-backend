const { Usuario } = require('../models');
const { validationResult } = require('express-validator');

module.exports = {
  // Devuelve todos los usuarios de la base de datos SOLO si es admin, si no, solo su propio usuario.
  getUsuarios: async (req, res) => {
    try {
      // Si el usuario tiene un campo 'admin' true, puede ver todos. Si no, solo su propio usuario.
      if (req.user && req.user.admin) {
        const usuarios = await Usuario.findAll();
        return res.json(usuarios);
      }
      // Solo su propio usuario
      const usuario = await Usuario.findByPk(req.user.id);
      if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
      res.json([usuario]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Devuelve un usuario específico por su ID SOLO si es el mismo usuario autenticado o admin.
  getUsuarioById: async (req, res) => {
    try {
      if (parseInt(req.params.id) !== req.user.id && !(req.user && req.user.admin)) {
        return res.status(403).json({ error: 'No autorizado' });
      }
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
      if (parseInt(req.params.id) !== req.user.id && !(req.user && req.user.admin)) {
        return res.status(403).json({ error: 'No autorizado' });
      }
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
      if (parseInt(req.params.id) !== req.user.id && !(req.user && req.user.admin)) {
        return res.status(403).json({ error: 'No autorizado' });
      }
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

