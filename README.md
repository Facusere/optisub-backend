# OptiSub - Backend

OptiSub es una aplicación para gestionar y optimizar tus suscripciones a servicios digitales como Netflix, Spotify, YouTube Premium, entre otros. Este repositorio contiene el backend de la aplicación, desarrollado con Express.js, Sequelize y autenticación JWT.

## 🛠️ Tecnologías utilizadas

- Node.js + Express
- Sequelize ORM
- SQLite / PostgreSQL (según entorno)
- JSON Web Tokens (JWT)
- Express-validator
- Dotenv
- CORS

## 📦 Instalación y ejecución

```bash
# Clonar el repositorio
git clone https://github.com/Facusere/optisub-backend.git
cd optisub-backend

# Instalar dependencias
npm install

# Crear el archivo .env y configurar las variables necesarias
cp .env.example .env

# Ejecutar migraciones y seeders si aplica
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

# Iniciar el servidor
npm run dev
