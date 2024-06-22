const Interest = require("../Models/userInterest");
const User = require("../Models/userModel");
const Apartment = require("../Models/apartmentModel");
const allInterests = async (req, res) => {
  try {
    const interest = await Interest.findAll({
      order: [["createdAt", "desc"]],

      include: [
        {
          model: User,
          attributes: ["name", "email", "phone"],
        },
        {
          model: Apartment,
          attributes: ["name"],
        },
      ],
      attributes: {
        exclude: ["userId"],
      },
    });
    res.status(200).json({
      status: "ok",
      count: interest.length,
      interest,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const postInterest = async (req, res) => {
  const { information, apartmentId } = req.body;
  if (!information || !apartmentId) {
    return res.status(400).json({
      message: "Please provide information and apartmentId",
    });
  }

  try {
    const interest = await Interest.create({
      information,
      userId: req.user.id,
      apartmentId,
    });
    res.status(201).json(interest);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  allInterests,
  postInterest,
};
