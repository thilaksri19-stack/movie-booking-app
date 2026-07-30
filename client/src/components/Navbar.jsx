import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <nav className="navbar">
      <h2>🎬 Movie Booking</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>

        {user && (
          <>
            <Link to="/my-bookings">My Bookings</Link>
          </>
        )}

        {user?.role === "admin" && (
          <>
            <Link to="/admin">Admin</Link>
          </>
        )}

        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <span>👋 {user.name}</span>

            <button onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;