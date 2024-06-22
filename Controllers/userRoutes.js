const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const chalk = require("chalk");
const validator = require("validator");

const genToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "1d" });
};

const registration = async (req, res) => {
  const { name, email, password, confirmPassword, phone } = req.body;
  if (!name || !email || !password || !confirmPassword || !phone) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      message: "Invalid email",
    });
  }
  if (!validator.isStrongPassword(password)) {
    res.status(400).json({ message: "Please enter a stronger password" });
  }

  try {
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match",
      });
    }
    const isNewUser = await User.findOne({
      where: {
        email: email,
      },
    });
    if (isNewUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({
      name,
      email,
      password: hash,
      phone,
    });
    const token = genToken(user.id);
    res.status(201).json({ id: user.id, token: token });
    console.log(chalk.green.bgBlue(user));
  } catch (err) {
    res.status(500).send(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  try {
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(400).json({
        message: "Email does not exist",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        message: "Incorrect password",
      });
    }
    const token = genToken(user.id);
    res.status(200).json({ id: user.id, token: token });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  registration,
  login,
};
