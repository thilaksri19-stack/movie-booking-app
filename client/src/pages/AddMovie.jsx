import { useState } from "react";
import API from "../services/api";

function AddMovie() {
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    genre: "",
    language: "",
    duration: "",
    releaseDate: "",
    poster: "",
    price: "",
    availableSeats: "",
  });

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };
  const [showTimes, setShowTimes] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/movies", movie);

      alert("✅ Movie Added Successfully");

      setMovie({
        title: "",
        description: "",
        genre: "",
        language: "",
        duration: "",
        releaseDate: "",
        poster: "",
        price: "",
        availableSeats: "",
      });
    } catch (err) {
      console.log(err);
      alert("Failed to Add Movie");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto" }}>
      <h1>Add Movie</h1>

      <form onSubmit={handleSubmit}>
        {Object.keys(movie).map((key) => (
          <input
            key={key}
            type={key === "releaseDate" ? "date" : "text"}
            name={key}
            placeholder={key}
            value={movie[key]}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
            }}
          />
        ))}

        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
}

export default AddMovie;