const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const {
  createReview,
  getOrgReviews,
  removeReview,
} = require("../controllers/reviewsController");

// ===============================
// 🟢 MULTER SETUP for review user_profile image
// ===============================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/profile"); // folder must exist
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // unique filename
  },
});

const upload = multer({ storage });

// ===============================
// 🟢 ROUTES
// ===============================

// ADD NEW REVIEW WITH IMAGE
router.post("/add", upload.single("user_profile"), createReview);

// GET REVIEWS OF ORGANIZATION
router.get("/org/:orgId", getOrgReviews);

// DELETE REVIEW
router.delete("/delete/:reviewId", removeReview);

module.exports = router;
