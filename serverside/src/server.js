// server.js

const express = require("express");
const connectDB = require("../src/config/db"); 
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

const cors = require("cors");
const app = express();

// ✅ Parse JSON bodies
app.use(express.json());

// ✅ Allow only your Vercel frontend
app.use(cors({
  origin: "https://blog-app-neon-three-19.vercel.app", // frontend domain
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true
}));

// ✅ Connect DB then start server
connectDB().then(() => {
  // Mount routes
  app.use("/auth", authRoutes);
  app.use("/posts", postRoutes);
  app.use("/comments", commentRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
