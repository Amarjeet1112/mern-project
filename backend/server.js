const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cors());

// ✅ MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

// ✅ User Model
const User = mongoose.model("User", new mongoose.Schema({
  email: String,
  password: String,
}));

// ==========================
// 🔥 TEST ROUTE
// ==========================
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});


// ==========================
// 🔥 REGISTER
// ==========================
app.post("/register", async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("All fields required");
    }

    email = email.trim().toLowerCase();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
    });

    await user.save();

    res.json("User Registered Successfully ✅");

  } catch (err) {
    res.status(500).json(err.message);
  }
});


// ==========================
// 🔥 LOGIN
// ==========================
app.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("All fields required");
    }

    email = email.trim().toLowerCase();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json("Wrong password");
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        email: user.email,
      },
    });

  } catch (err) {
    res.status(500).json(err.message);
  }
});


// ==========================
// 🔐 VERIFY TOKEN
// ==========================
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json("Access denied ❌");
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json("No token provided ❌");
  }

  try {
    const verified = jwt.verify(
      token,
      process.env.JWT_SECRET || "secret123"
    );

    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json("Invalid token ❌");
  }
};


// ==========================
// 🔥 PROFILE (REAL DATA)
// ==========================
app.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      email: user.email,
      id: user._id
    });

  } catch (err) {
    res.status(500).json(err.message);
  }
});


// ==========================
// 🔥 DASHBOARD
// ==========================
app.get("/dashboard", verifyToken, (req, res) => {
  res.json("Welcome to Dashboard 🔐");
});


// ==========================
// 🚀 SERVER START
// ==========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});