// Migración: agrega usuarioId a Servicios, y asegura claves foráneas en Perfils, Suscripcions, Pagos, Recordatorios
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Busca un usuario existente para usar su id como default
    const [results] = await queryInterface.sequelize.query('SELECT id FROM "Usuarios" LIMIT 1;');
    const defaultUserId = results.length > 0 ? results[0].id : null;
    if (!defaultUserId) throw new Error('No hay usuarios en la tabla Usuarios. Crea uno antes de migrar.');
    // Agrega usuarioId a Servicios
    await queryInterface.addColumn('Servicios', 'usuarioId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: defaultUserId,
      references: {
        model: 'Usuarios',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    // Asegura clave foránea en Perfils
    await queryInterface.changeColumn('Perfils', 'usuarioId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuarios',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    // Asegura clave foránea en Suscripcions
    await queryInterface.changeColumn('Suscripcions', 'perfilId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Perfils',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    await queryInterface.changeColumn('Suscripcions', 'servicioId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Servicios',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    // Asegura clave foránea en Pagos
    await queryInterface.changeColumn('Pagos', 'suscripcionId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Suscripcions',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    // Asegura clave foránea en Recordatorios
    await queryInterface.changeColumn('Recordatorios', 'suscripcionId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Suscripcions',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Servicios', 'usuarioId');
    // No se eliminan claves foráneas en down para evitar pérdida de datos
  }
};
