const express = require("express");
const {
  registerUser,
  loginUser,
  refreshToken,
  logoutUser,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);// route for register user
router.post("/login", loginUser);// route for login user
router.post("/refresh-token", refreshToken);
router.post("/logout", logoutUser);// route for logout user

module.exports = router;
