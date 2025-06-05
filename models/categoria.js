'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  // Modelo que representa las categorías de los servicios.
  class Categoria extends Model {
    // Relación: Una categoría puede tener muchos servicios.
    static associate(models) {
      Categoria.hasMany(models.Servicio, {
        foreignKey: 'categoriaId',
        as: 'servicios'
      });
    }
  }

  // Definición de los campos de la tabla Categoria.
  Categoria.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 255] // opcional, por ejemplo
      }
    }
  }, {
    sequelize,
    modelName: 'Categoria',
  });

  return Categoria;
};
