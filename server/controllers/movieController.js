const Movie = require("../models/Movie");

// Add Movie
exports.addMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);

    res.status(201).json({
      message: "Movie Added Successfully",
      movie,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Movies
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();

    res.json(movies);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Movie By ID
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      return res.status(404).json({
        message: "Movie Not Found",
      });
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Movie
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Movie Updated Successfully",
      movie,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Movie
exports.deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);

    res.json({
      message: "Movie Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};