const mongoose = require("mongoose");

const uri =
  "mongodb+srv://thilaksri19_db_user:Movie12345@moviebooking.gxomko8.mongodb.net/movieBookingDB?retryWrites=true&w=majority&appName=moviebooking";

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ Connection Failed");
    console.error(err);
    process.exit(1);
  });