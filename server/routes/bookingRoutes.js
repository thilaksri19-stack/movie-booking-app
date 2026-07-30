const express = require("express");

const router = express.Router();

const {
  bookMovie,
  getMyBookings,
} = require("../controllers/bookingController");

router.post("/", bookMovie);

router.get("/:userId", getMyBookings);

module.exports = router;