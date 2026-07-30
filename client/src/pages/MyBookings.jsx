import { useEffect, useState } from "react";
import API from "../services/api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      const res = await API.get(`/bookings/${user.id}`);

      setBookings(res.data.bookings);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>🎟 My Bookings</h1>

      {bookings.length === 0 ? (
        <h3>No bookings found.</h3>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking._id}
            style={{
              border: "1px solid gray",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
            }}
          >
          {booking.movie ? (
  <>
    <img
      src={booking.movie.poster}
      alt={booking.movie.title}
    />

    <h2>{booking.movie.title}</h2>

    <p>🎭 {booking.movie.genre}</p>

    <p>🌐 {booking.movie.language}</p>
  </>
) : (
  <>
    <h2>Movie Not Available</h2>
    <p>This movie has been removed.</p>
  </>
)}
          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;