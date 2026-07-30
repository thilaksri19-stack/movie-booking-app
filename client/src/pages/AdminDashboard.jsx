import { Link } from "react-router-dom";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  return (
    <div className="admin-container">

      <h1 className="admin-title">
        🎬 Admin Dashboard
      </h1>

      <div className="admin-cards">

        <div className="admin-card">
          <h2>🎥 Add Movie</h2>

          <p>
            Add new movies to your booking application.
          </p>

          <Link className="admin-link" to="/admin/add-movie">
            <button className="admin-btn">
              Add Movie
            </button>
          </Link>
        </div>

        <div className="admin-card">
          <h2>📂 Manage Movies</h2>

          <p>
            Edit or delete existing movies.
          </p>

          <Link className="admin-link" to="/admin/movies">
            <button className="admin-btn">
              Manage Movies
            </button>
          </Link>
        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;