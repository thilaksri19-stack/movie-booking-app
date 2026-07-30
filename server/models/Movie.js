const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    genre: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      required: true,
    },

    duration: {
      type: String,
      required: true,
    },

    releaseDate: {
      type: Date,
      required: true,
    },

    poster: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    showTimes: {
      type: [String],
      default: [
        "10:00 AM",
        "1:30 PM",
        "4:30 PM",
        "7:30 PM",
        "10:30 PM",
      ],
    },

    availableSeats: {
      type: Number,
      default: 100,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", movieSchema);