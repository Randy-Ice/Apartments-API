const Apartment = require("../Models/apartmentModel");
const chalk = require("chalk");

const getApartments = async (req, res) => {
  const page = Number(req.query.page);
  const limit = Number(req.query.limit) || 1;
  const skip = (page - 1) * limit;
  try {
    const apartments = await Apartment.findAll({
      order: [["createdAt", "desc"]],
      limit: Number(limit),
      offset: skip || 0,
    });
    res.status(200).json(apartments);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const getApartmentId = async (req, res) => {
  const { id } = req.params;
  try {
    const apartment = await Apartment.findAll({
      where: {
        id: id,
      },
    });
    if (apartment.length === 0) {
      return res.status(404).json({
        message: "Apartment not found",
      });
    }
    res.status(200).json(apartment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//= Only adming on here can edit data below, not user

const createApartment = async () => {
  try {
    const apartment = await Apartment.create({
      name: "Apartment 2",
    });
    console.log(
      chalk.blueBright.bgCyanBright(`Apartment ${apartment} created`)
    );
  } catch (err) {
    console.log(chalk.red.bgBlack("Creating Apartment error"));
  }
};
//createApartment();
// const updateApartment = async () => {
//   const id = "9";
//   try {
//     const apartment = await Apartment.update(
//       {
//         name: "new name",
//       },
//       {
//         where: {
//           id: id,
//         },
//       }
//     );
//     console.log(
//       chalk.blueBright.bgCyanBright(`Apartment ${apartment} updated`)
//     );
//   } catch (err) {
//     console.log(chalk.red.bgBlack("Updating Apartment error"));
//   }
// };
//updateApartment();

// const deleteApartment = async () => {
//   const id = "9";
//   try {
//     await Apartment.destroy({
//       where: {
//         id: id,
//       },
//     });
//     console.log(chalk.blueBright.bgCyanBright(`Apartment ${id} deleted`));
//   } catch (err) {
//     console.log(chalk.red.bgBlack("Deleting Apartment error"));
//   }
// };
//deleteApartment();

module.exports = {
  getApartments,
  getApartmentId,
};
