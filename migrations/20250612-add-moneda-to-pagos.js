// Migración para agregar el campo 'moneda' a la tabla Pagos
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Pagos', 'moneda', {
      type: Sequelize.STRING,
      allowNull: true // Temporalmente true para no romper pagos viejos
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Pagos', 'moneda');
  }
};
