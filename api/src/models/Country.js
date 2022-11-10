/** @format */

const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

// exporto el modelo
// defino el modelo
module.exports = (sequelize) => {
   sequelize.define("country", {
      id: {
         type: DataTypes.STRING(3),
         primaryKey: true,
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      flags: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      continents: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      capital: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      subregion: {
         type: DataTypes.STRING,
      },
      area: {
         type: DataTypes.INTEGER,
      },
      population: {
         type: DataTypes.INTEGER,
      },
   });
};
