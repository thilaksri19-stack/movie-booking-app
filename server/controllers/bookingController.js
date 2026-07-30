const Booking = require("../models/Booking");
const Movie = require("../models/Movie");

// Book Movie
exports.bookMovie = async (req, res) => {
  console.log("BODY:", req.body);

  try {
    const {
      userId,
      movieId,
      showTime,
      selectedSeats,
    } = req.body;

    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found",
      });
    }

    if (!showTime) {
      return res.status(400).json({
        message: "Please select a show time",
      });
    }

    if (!selectedSeats || selectedSeats.length === 0) {
      return res.status(400).json({
        message: "Please select seats",
      });
    }

    if (movie.availableSeats < selectedSeats.length) {
      return res.status(400).json({
        message: "Not enough seats available",
      });
    }

    const booking = await Booking.create({
      user: userId,
      movie: movieId,
      showTime,
      selectedSeats,
      totalPrice: selectedSeats.length * movie.price,
    });

    movie.availableSeats -= selectedSeats.length;

    await movie.save();

    res.status(201).json({
      message: "Booking Successful",
      booking,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get My Bookings
exports.getMyBookings = async (req, res) => {
  try {

    const { userId } = req.params;

    const bookings = await Booking.find({
      user: userId,
    })
      .populate("movie")
      .populate("user", "name email");

    res.status(200).json({
      totalBookings: bookings.length,
      bookings,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};