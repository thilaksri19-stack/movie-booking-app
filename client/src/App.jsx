import { Routes, Route } from "react-router-dom";
import MyBookings from "./pages/MyBookings";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MovieDetails from "./pages/MovieDetails";
import AdminDashboard from "./pages/AdminDashboard";
import AddMovie from "./pages/AddMovie";
import ManageMovies from "./pages/ManageMovies";
import EditMovie from "./pages/EditMovie";
import Booking from "./pages/Booking";

import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/bookings" element={<MyBookings />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route
  path="/admin"
  element={
    <ProtectedRoute adminOnly={true}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/add-movie"
  element={
    <ProtectedRoute adminOnly={true}>
      <AddMovie />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/movies"
  element={
    <ProtectedRoute adminOnly={true}>
      <ManageMovies />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/edit/:id"
  element={
    <ProtectedRoute adminOnly={true}>
      <EditMovie />
    </ProtectedRoute>
  }
/>
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/admin/movies" element={<ManageMovies />} />
        <Route path="/admin/edit/:id" element={<EditMovie />} />
      </Routes>
    </>
  );
}

export default App;