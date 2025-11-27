const express = require("express");
const connectDB = require("../src/config/db"); 
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");

const app = express();
app.use(express.json());

// ✅ CORS setup (allow local + deployed frontend)
const cors = require("cors");
const allowedOrigins = [
  "http://localhost:5173",
  "https://blog-app-neon-three-19.vercel.app"
];
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

// ✅ Connect DB then start server
connectDB().then(() => {
  app.use("/api/auth", authRoutes);
  app.use("/api/posts", postRoutes);
  app.use("/api/comments", commentRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on ${PORT}`));
});
