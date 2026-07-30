import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

function EditMovie() {
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    try {
      const res = await API.get(`/movies/${id}`);

      setMovie({
        ...res.data,
        releaseDate: res.data.releaseDate.split("T")[0],
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/movies/${id}`, movie);

      alert("Movie Updated Successfully");

      navigate("/admin/movies");
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto" }}>
      <h1>Edit Movie</h1>

      <form onSubmit={handleSubmit}>
        {Object.keys(movie).map((key) => {
          if (key === "_id" || key === "__v" || key === "createdAt" || key === "updatedAt") {
            return null;
          }

          return (
            <input
              key={key}
              type={key === "releaseDate" ? "date" : "text"}
              name={key}
              value={movie[key]}
              onChange={handleChange}
              placeholder={key}
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
              }}
            />
          );
        })}

        <button type="submit">Update Movie</button>
      </form>
    </div>
  );
}

export default EditMovie;