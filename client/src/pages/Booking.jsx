import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Booking.css";

function Booking() {
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
    <div className="booking-container">

      <h1>🎟 My Bookings</h1>

      {bookings.length === 0 ? (
        <h2>No Bookings Yet</h2>
      ) : (
        bookings.map((booking) => (
          <div className="booking-card" key={booking._id}>

            <img
              src={booking.movie.poster}
              alt={booking.movie.title}
            />

            <div className="booking-info">

              <h2>{booking.movie.title}</h2>

              <p>🎭 {booking.movie.genre}</p>

              <p>🌐 {booking.movie.language}</p>

              <p>🎟 Tickets : {booking.seats}</p>

              <p>💰 Total : ₹{booking.totalPrice}</p>

            </div>

          </div>
        ))
      )}

    </div>
  );
}

export default Booking;