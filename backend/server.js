const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* ✅ FIXED CORS */
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://food-ordering-app-rose-chi.vercel.app"
    ],
    credentials: true
  })
);

app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🚀" });
});

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/restaurants", require("./routes/restaurantRoutes"));
app.use("/api/foods", require("./routes/foodRoutes"));
app.use("/api/orders", require("./routes/OrderRoutes"));

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
