'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  // Modelo que representa las suscripciones de los perfiles a los servicios.
  class Suscripcion extends Model {
    // Relación: Una suscripción pertenece a un perfil y a un servicio, y puede tener muchos pagos y recordatorios.
    static associate(models) {
      Suscripcion.belongsTo(models.Perfil, {
        foreignKey: 'perfilId',
        as: 'perfil'
      });

      Suscripcion.belongsTo(models.Servicio, {
        foreignKey: 'servicioId',
        as: 'servicio'
      });

      Suscripcion.hasMany(models.Pago, {
        foreignKey: 'suscripcionId',
        as: 'pagos'
      });

      Suscripcion.hasMany(models.Recordatorio, {
        foreignKey: 'suscripcionId',
        as: 'recordatorios'
      });
    }
  }

  // Definición de los campos de la tabla Suscripcion.
  Suscripcion.init({
    perfilId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    servicioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    monto: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    moneda: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    frecuencia: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [[ 'Anual', 'Mensual', 'Semanal']] 
      }
    },
    fechaInicio: {
      type: DataTypes.DATE,
      allowNull: false
    },
    activa: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Suscripcion',
  });

  return Suscripcion;
};
