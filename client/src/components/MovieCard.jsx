import { Link } from "react-router-dom";
import "../styles/MovieCard.css";

function MovieCard({ movie }) {
  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} />

      <div className="movie-content">
        <h2>{movie.title}</h2>

        <p>🎭 {movie.genre}</p>
        <p>🗣️ {movie.language}</p>
        <p>⏱️ {movie.duration}</p>
        <p>💺 {movie.availableSeats} seats left</p>
        <h3>${movie.price}</h3>

        <Link to={`/movie/${movie._id}`}>
          <button>Book Now</button>
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;