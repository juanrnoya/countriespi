/** @format */

const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

module.exports = (sequelize) => {
   // defino el modelo
   sequelize.define("activity", {
      name: {
         type: DataTypes.STRING,
         allowNull: true,
      },
      difficulty: {
         type: DataTypes.INTEGER,
         validate: {
            max: 5,
            min: 0,
         },
         allowNull: true,
      },
      duration: {
         type: DataTypes.INTEGER,
         validate: {
            max: 24,
            min: 1,
         },
         allowNull: true,
      },
      season: {
         type: DataTypes.STRING,
         allowNull: true,
         isIn: [["spring", "summer", "autumn", "winter"]],
      },
   });
};
