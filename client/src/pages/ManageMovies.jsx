import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import "../styles/ManageMovies.css";

function ManageMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await API.get("/movies");
      setMovies(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMovie = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/movies/${id}`);
      alert("✅ Movie Deleted Successfully");
      fetchMovies();
    } catch (err) {
      console.log(err);
      alert("❌ Delete Failed");
    }
  };

  return (
    <div className="manage-container">

      <h1 className="manage-title">
        🎬 Manage Movies
      </h1>

      <div className="table-container">

        <table className="movie-table">

          <thead>
            <tr>
              <th>Poster</th>
              <th>Movie</th>
              <th>Genre</th>
              <th>Price</th>
              <th>Seats</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {movies.length > 0 ? (
              movies.map((movie) => (
                <tr key={movie._id}>

                  <td>
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="poster-img"
                    />
                  </td>

                  <td>{movie.title}</td>

                  <td>{movie.genre}</td>

                  <td>₹{movie.price}</td>

                  <td>{movie.availableSeats}</td>

                  <td>

                    <Link to={`/admin/edit/${movie._id}`}>
                      <button className="edit-btn">
                        ✏ Edit
                      </button>
                    </Link>

                    <button
                      className="delete-btn"
                      onClick={() => deleteMovie(movie._id)}
                    >
                      🗑 Delete
                    </button>

                  </td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">
                  No Movies Found
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ManageMovies;