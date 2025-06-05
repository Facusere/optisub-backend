// Archivo de entrada principal del backend.
// Sincroniza la base de datos y levanta el servidor Express en el puerto configurado.

const app = require('./app');
const { sequelize } = require('./models');
const PORT = process.env.PORT || 3001;

sequelize.sync()
  .then(() => {
    console.log('🟢 Base de datos conectada');
    console.log(`🌐 Entorno: ${process.env.NODE_ENV || 'development'}`);
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('🔴 Error al conectar con la base de datos:', error);
  });

