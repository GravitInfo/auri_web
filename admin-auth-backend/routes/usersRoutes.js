const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// Send OTP
router.post("/send-otp", usersController.sendOtp);

// Verify OTP (register/login automatically)
router.post("/verify-otp", usersController.verifyOtp);

// Optional manual register/login
router.post("/register", usersController.registerUser);
router.post("/login", usersController.loginUser);

module.exports = router;
