'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  // Modelo que representa los servicios (ej: Netflix, Spotify).
  class Servicio extends Model {
    // Relación: Un servicio pertenece a una categoría y puede tener muchas suscripciones.
    static associate(models) {
      Servicio.belongsTo(models.Categoria, {
        foreignKey: 'categoriaId',
        as: 'categoria'
      });
      Servicio.belongsTo(models.Usuario, {
        foreignKey: 'usuarioId',
        as: 'usuario'
      });
      Servicio.hasMany(models.Suscripcion, {
        foreignKey: 'servicioId',
        as: 'suscripciones'
      });
    }
  }

  // Definición de los campos de la tabla Servicio.
  Servicio.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    categoriaId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    logoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    sitioWeb: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true
      }
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Usuarios',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Servicio',
  });

  return Servicio;
};
