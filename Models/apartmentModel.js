const { DataTypes } = require("sequelize");
const sequelize = require("../Database/db");

const Apartment = sequelize.define("apartment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

module.exports = Apartment;
// name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     address: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     city: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     state: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     zip: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     price: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     bedrooms: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     bathrooms: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     sqft: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     description: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
