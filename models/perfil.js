'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  // Modelo que representa los perfiles de usuario.
  class Perfil extends Model {
    // Relación: Un perfil pertenece a un usuario y puede tener muchas suscripciones.
    static associate(models) {
      Perfil.belongsTo(models.Usuario, {
        foreignKey: 'usuarioId',
        as: 'usuario'
      });

      Perfil.hasMany(models.Suscripcion, {
        foreignKey: 'perfilId',
        as: 'suscripciones'
      });
    }
  }

  // Definición de los campos de la tabla Perfil.
  Perfil.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
          args: [['Principal', 'Secundario', 'Niños']],
          msg: 'El tipo debe ser Principal, Secundario o Niños'
        },
      }
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Perfil',
  });

  return Perfil;
};
