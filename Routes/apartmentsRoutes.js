const express = require("express");
const router = express.Router();
const {
  getApartments,
  getApartmentId,
} = require("../Controllers/apartmentController");

router.get("/", getApartments);
router.get("/:id", getApartmentId);

module.exports = router;
