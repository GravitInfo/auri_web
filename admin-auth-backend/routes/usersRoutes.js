const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");
const multer = require("multer");
const path = require("path");

// ==================== Multer Setup ====================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/profile"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) cb(null, true);
  else cb(new Error("Only images are allowed"));
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB max

// ==================== Routes ====================

router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getUserById);

// Register user with optional profile image
router.post("/register", upload.single("profile_pic"), usersController.registerUser);

// Verify OTP
router.post("/verify-otp", usersController.verifyOtp);

// Login
router.post("/login", usersController.loginUser);

// Resend OTP
router.post("/resend-otp", usersController.resendOtp);

module.exports = router;
