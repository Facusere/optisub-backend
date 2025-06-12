'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  // Modelo que representa los pagos realizados por las suscripciones.
  class Pago extends Model {
    // Relación: Un pago pertenece a una suscripción.
    static associate(models) {
      Pago.belongsTo(models.Suscripcion, {
        foreignKey: 'suscripcionId',
        as: 'suscripcion'
      });
    }
  }

  // Definición de los campos de la tabla Pago.
  Pago.init({
    suscripcionId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fechaPago: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    montoPagado: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    metodoPago: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    moneda: {
      type: DataTypes.STRING,
      allowNull: true // Temporalmente true para compatibilidad
    }
  }, {
    sequelize,
    modelName: 'Pago',
  });

  return Pago;
};
