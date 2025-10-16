const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// Registration
router.post("/register", usersController.registerUser);

// Send OTP
router.post("/send-otp", usersController.sendOtp);

// Verify OTP
router.post("/verify-otp", usersController.verifyOtp);

// Login
router.post("/login", usersController.loginUser);

module.exports = router;
