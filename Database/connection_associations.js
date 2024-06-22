const sequelize = require("./db");
const logger = require("../Log/winston");
const chalk = require("chalk");
const User = require("../Models/userModel");
const Interest = require("../Models/userInterest");
const Apartment = require("../Models/apartmentModel");
//- associations
User.hasMany(Interest);
Interest.belongsTo(User);

Apartment.hasMany(Interest);
Interest.belongsTo(Apartment);
//- end

const DatabaseConnection = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log(
      chalk.yellowBright.bgBlackBright("Database connection established")
    );
  } catch (err) {
    logger.error(err);
    console.log(
      chalk.yellowBright.bgBlackBright("Database not established, check creds")
    );
    console.log();
    //process.exit(1)
  }
};

module.exports = DatabaseConnection;
