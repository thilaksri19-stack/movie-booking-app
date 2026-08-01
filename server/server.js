const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const movieRoutes = require("./routes/movieRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

// Middleware


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 10000,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error("❌ Connection Error:");
    console.error(err);
  });

// Test Route
app.get("/", (req, res) => {
  res.send("Movie Booking API Running...");
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Backend is working",
  });
});