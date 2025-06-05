'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  // Modelo que representa los recordatorios asociados a las suscripciones.
  class Recordatorio extends Model {
    // Relación: Un recordatorio pertenece a una suscripción.
    static associate(models) {
      Recordatorio.belongsTo(models.Suscripcion, {
        foreignKey: 'suscripcionId',
        as: 'suscripcion'
      });
    }
  }

  // Definición de los campos de la tabla Recordatorio.
  Recordatorio.init({
    suscripcionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Email', 'Notificación', 'SMS']] 
      }
    },
    fechaProgramada: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    }
  }, {
    sequelize,
    modelName: 'Recordatorio',
  });

  return Recordatorio;
};
