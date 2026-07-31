import axios from "axios";

export default axios.create({
  baseURL: "https://movie-booking-app-production-91bb.up.railway.app/api",
});