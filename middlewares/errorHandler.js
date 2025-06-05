// Middleware para manejo global de errores.
// Captura cualquier error que ocurra en la app y responde con un mensaje y código de estado adecuado.

module.exports = (err, req, res, next) => {
  console.error('🟥 Error:', err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Error interno del servidor'
  });
};
