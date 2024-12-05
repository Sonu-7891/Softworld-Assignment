const User = require("../models/User.model");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateTokens");
require("dotenv").config()

let refreshTokens = [];

const registerUser = async (req, res) => { // controller for register route 
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email }); //find the user by email
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const user = new User({ name, email, password, role });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  // controller for login route
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }); //find the user by email
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);

    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true });
    res.json({ accessToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const refreshToken = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token)
    return res.status(403).json({ message: "Refresh token not found" });

  if (!refreshTokens.includes(token))
    return res.status(403).json({ message: "Invalid refresh token" });

  try {
    const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

const logoutUser = (req, res) => {
  const token = req.cookies.refreshToken;
  refreshTokens = refreshTokens.filter((t) => t !== token);
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out successfully" });
};

module.exports = { registerUser, loginUser, refreshToken, logoutUser };
