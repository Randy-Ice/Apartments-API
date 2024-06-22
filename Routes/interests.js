const express = require("express");
const router = express.Router();
const {
  allInterests,
  postInterest,
} = require("../Controllers/userInterestsController");
const Auth = require("../Middleware/auth");

router.get("/", allInterests);

router.use(Auth);
router.post("/", postInterest);

module.exports = router;
