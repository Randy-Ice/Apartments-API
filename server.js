require("dotenv").config();
const chalk = require("chalk");
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./Log/winston");
const { rateLimit } = require("express-rate-limit");
const PORT = process.env.PORT;
const express = require("express");
const app = express();
const userRouter = require("./Routes/userRoutes");
const apartmentRouter = require("./Routes/apartmentsRoutes");
const userInterests = require("./Routes/interests");
const DatabaseConnection = require("./Database/connection_associations");

//! uncaught exceptions and handlers
process.on("uncaughtException", (ex) => {
  logger.error(ex.message, ex);
  process.exit(1);
});

process.on("unhandledRejection", (ex) => {
  logger.error(ex.message, ex);
  process.exit(1);
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});
//-Middleware
app.use(limiter);
app.use(helmet());
app.use(express.json());
if (app.get("env") === "development") {
  app.use(morgan("dev"));
  console.log(chalk.greenBright.bold.bgCyanBright("Morgan enabled"));
}

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Find the right apartment for you",
  });
});

// TODO register routes here
app.use("/api/v1/user", userRouter);
app.use("/api/v1/apartments", apartmentRouter);
app.use("/api/v1/interests", userInterests);
//TODO end

//+ Catch all route, always last
app.all("*", (req, res) => {
  res.status(404).json({
    message: "No data here",
  });
});

//&  Database connection
DatabaseConnection();
app.listen(PORT, () => {
  console.log(
    chalk.redBright.bold.bgBlueBright(`Server is running on port ${PORT}`)
  );
});
