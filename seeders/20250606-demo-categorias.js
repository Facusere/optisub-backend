'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categoria', [
      { id: 1, nombre: 'Streaming', descripcion: '', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, nombre: 'Almacenamiento', descripcion: '', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, nombre: 'Educación', descripcion: '', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, nombre: 'Productividad y Software', descripcion: '', createdAt: new Date(), updatedAt: new Date() },
      { id: 5, nombre: 'Apps y Servicios Digitales', descripcion: '', createdAt: new Date(), updatedAt: new Date() },
      { id: 6, nombre: 'Compras', descripcion: '', createdAt: new Date(), updatedAt: new Date() },
      { id: 7, nombre: 'Fitness y Salud', descripcion: '', createdAt: new Date(), updatedAt: new Date() },
      { id: 8, nombre: 'Finanzas y Criptomonedas', descripcion: '', createdAt: new Date(), updatedAt: new Date() },
      { id: 9, nombre: 'Creatividad y Pasatiempos', descripcion: '', createdAt: new Date(), updatedAt: new Date() },
      { id: 10, nombre: 'Otros', descripcion: '', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categoria', null, {});
  }
};
