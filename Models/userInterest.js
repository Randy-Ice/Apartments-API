const { DataTypes } = require("sequelize");
const sequelize = require("../Database/db");

const Interest = sequelize.define("userInterest", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  information: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Interest;
