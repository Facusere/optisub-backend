const { Usuario } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'secreto_super_seguro';

module.exports = {
  // Verifica usuario y contraseña, devuelve un token JWT si es correcto.
  login: async (req, res) => {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario || !bcrypt.compareSync(password, usuario.password)) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: usuario.id }, JWT_SECRET, { expiresIn: '2h' });
    res.json({ token, usuario });
  },

  // Crea un nuevo usuario con contraseña encriptada.
  register: async (req, res) => {
    try {
      const { nombre, email, password, moneda_preferida } = req.body;
      const hashedPassword = bcrypt.hashSync(password, 10);
      const nuevo = await Usuario.create({
        nombre,
        email,
        password: hashedPassword,
        moneda_preferida
      });
      res.status(201).json(nuevo);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};
