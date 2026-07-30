import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import "../styles/MovieDetails.css";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);

  const rows = ["A", "B", "C", "D", "E"];
  const seatsPerRow = 8;

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    try {
      const res = await API.get(`/movies/${id}`);
      setMovie(res.data);

      if (res.data.showTimes?.length > 0) {
        setSelectedTime(res.data.showTimes[0]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggleSeat = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const handleBooking = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login first");
        return;
      }

      if (!selectedTime) {
        alert("Select a show time");
        return;
      }

      if (selectedSeats.length === 0) {
        alert("Select at least one seat");
        return;
      }

      const bookingData = {
        userId: user.id,
        movieId: movie._id,
        showTime: selectedTime,
        selectedSeats,
      };
        console.log(bookingData);
        console.log(movie);

      const res = await API.post("/bookings", bookingData);

      alert("🎉 Booking Successful");

      console.log(res.data);

      setSelectedSeats([]);

      fetchMovie();
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Booking Failed");
    }
  };

  if (!movie) return <h2>Loading...</h2>;

  return (
    <div className="booking-page">
      <div className="booking-card">

        <div className="left">
          <img
            src={movie.poster}
            alt={movie.title}
            className="poster"
          />
        </div>

        <div className="right">

          <h1>{movie.title}</h1>

          <p className="desc">{movie.description}</p>

          <div className="movie-info">
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Language:</strong> {movie.language}</p>
            <p><strong>Duration:</strong> {movie.duration}</p>
            <p><strong>Price:</strong> ₹{movie.price}</p>
            <p><strong>Seats Left:</strong> {movie.availableSeats}</p>
          </div>

          <h2>Select Show Time</h2>

          <div className="time-container">

            {movie.showTimes.map((time) => (

              <button
                key={time}
                className={
                  selectedTime === time
                    ? "time active-time"
                    : "time"
                }
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>

            ))}

          </div>

          <h2>Select Seats</h2>

          <div className="screen">
            SCREEN
          </div>

          <div className="seat-layout">
                        {rows.map((row) => (
              <div key={row} className="seat-row">
                {Array.from({ length: seatsPerRow }, (_, index) => {
                  const seat = `${row}${index + 1}`;

                  return (
                    <button
                      key={seat}
                      className={
                        selectedSeats.includes(seat)
                          ? "seat selected"
                          : "seat"
                      }
                      onClick={() => toggleSeat(seat)}
                    >
                      {seat}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="summary">
            <h2>Booking Summary</h2>

            <p>
              <strong>Movie:</strong> {movie.title}
            </p>

            <p>
              <strong>Show Time:</strong> {selectedTime}
            </p>

            <p>
              <strong>Seats:</strong>{" "}
              {selectedSeats.length > 0
                ? selectedSeats.join(", ")
                : "None"}
            </p>

            <p>
              <strong>Total Tickets:</strong>{" "}
              {selectedSeats.length}
            </p>

            <h2>
              ₹{selectedSeats.length * movie.price}
            </h2>
          </div>

          <button
            className="book-btn"
            onClick={handleBooking}
          >
            🎟 Confirm Booking
          </button>

        </div>
      </div>
    </div>
  );
}

export default MovieDetails;