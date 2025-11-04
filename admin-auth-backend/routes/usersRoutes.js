// const express = require("express");
// const router = express.Router();
// const usersController = require("../controllers/usersController");

// // Send OTP
// router.post("/send-otp", usersController.sendOtp);

// // Verify OTP (register/login automatically)
// router.post("/verify-otp", usersController.verifyOtp);

// // Optional manual register/login
// router.post("/register", usersController.registerUser);
// router.post("/login", usersController.loginUser);

// module.exports = router;














const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

// Register (create inactive user + send OTP)
router.post("/register", usersController.registerUser);

// Verify OTP to activate account
router.post("/verify-otp", usersController.verifyOtp);

// Login with email + password
router.post("/login", usersController.loginUser);

// Resend OTP (optional)
router.post("/resend-otp", usersController.resendOtp);

module.exports = router;
