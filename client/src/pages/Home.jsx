import { useEffect, useState } from "react";
import API from "../services/api";
import MovieCard from "../components/MovieCard";
import "../styles/Home.css";
import "../styles/Hero.css";

function Home() {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState("All");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const res = await API.get("/movies");
      console.log(res.data);
      setMovies(res.data);
    } catch (err) {
      console.log(err);
    }finally {
    setLoading(false);
  }
  };
const filteredMovies = movies.filter((movie) => {
  const title = movie.title || "";
  const genreName = movie.genre || "";

  const matchesTitle = title
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesGenre =
    genre === "All" || genreName === genre;

  return matchesTitle && matchesGenre;
});
 if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading movies...</h2>;
  }

  return (
  <>
  <div className="hero">
  <div className="overlay">
    <div className="hero-content">
      <h1>🎬 Welcome to Movie Booking</h1>

      <p>
        Discover the latest blockbusters and book your favorite
        movies with just one click.
      </p>

      <button className="book-btn">
        🎟 Explore Movies
      </button>
    </div>
  </div>
</div>
  <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    marginBottom: "30px",
  }}
>
  <input
    type="text"
    placeholder="🔍 Search movies..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      width: "350px",
      padding: "12px",
      fontSize: "16px",
      borderRadius: "8px",
      border: "1px solid #ccc",
    }}
  />

  <select
    value={genre}
    onChange={(e) => setGenre(e.target.value)}
    style={{
      padding: "12px",
      borderRadius: "8px",
    }}
  >
    <option value="All">All</option>
    <option value="Action">Action</option>
    <option value="Comedy">Comedy</option>
    <option value="Drama">Drama</option>
    <option value="Horror">Horror</option>
    <option value="Romance">Romance</option>
    <option value="Sci-Fi">Sci-Fi</option>
  </select>
</div>

    <div className="home">
      <h1>🎬 Now Showing</h1>

      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
          />
        ))}
      </div>
    </div>
  </>
);
}

export default Home;