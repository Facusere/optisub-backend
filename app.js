// Archivo principal de configuración de la app Express.
// Configura middlewares, rutas y el manejo global de errores.
// Exporta la app para ser utilizada por server.js.

const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Ruta de prueba
app.get('/api', (req, res) => {
  res.send({ message: 'API corriendo correctamente' });
});

// Rutas por recurso
app.use('/api/usuarios', require('./routes/usuarioRoutes'));
app.use('/api/perfiles', require('./routes/perfilRoutes'));
app.use('/api/servicios', require('./routes/servicioRoutes'));
app.use('/api/suscripciones', require('./routes/suscripcionRoutes'));
app.use('/api/pagos', require('./routes/pagoRoutes'));
app.use('/api/recordatorios', require('./routes/recordatorioRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

// Manejo global de errores
app.use(errorHandler);

module.exports = app;
