'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  // Modelo que representa a los usuarios del sistema.
  class Usuario extends Model {
    // Relación: Un usuario puede tener muchos perfiles.
    static associate(models) {
      Usuario.hasMany(models.Perfil, {
        foreignKey: 'usuarioId',
        as: 'perfiles'
      });
    }
  }

  // Definición de los campos de la tabla Usuario.
  Usuario.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 100]
      }
    },
    moneda_preferida: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Usuario',
  });

  return Usuario;
};
