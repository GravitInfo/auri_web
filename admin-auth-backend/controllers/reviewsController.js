const Reviews = require("../models/reviewsModel");

// Time Ago Utility
function timeAgo(date) {
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };

  for (let key in intervals) {
    const value = Math.floor(seconds / intervals[key]);
    if (value > 0) return `${value} ${key}${value > 1 ? "s" : ""} ago`;
  }

  return "Just now";
}

// ➤ Add Review
const createReview = async (req, res) => {
  try {
    let reviewData = { ...req.body };

    // If image uploaded
    if (req.file) {
      reviewData.user_profile = `http://localhost:6001/uploads/profile/${req.file.filename}`;
    }

    const id = await Reviews.addReview(reviewData);

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review_id: id,
    });
  } catch (err) {
    console.error("createReview error:", err);
    res.status(500).json({ success: false, message: "Error adding review" });
  }
};

// ➤ Get Reviews
const getOrgReviews = async (req, res) => {
  try {
    const reviews = await Reviews.getReviewsByOrg(req.params.orgId);

    const formatted = reviews.map((r) => ({
      ...r,
      time_ago: timeAgo(new Date(r.created_at)),
    }));

    res.json({ success: true, reviews: formatted });
  } catch (err) {
    console.error("getOrgReviews error:", err);
    res.status(500).json({ success: false, message: "Error fetching reviews" });
  }
};

// ➤ Delete Review
const removeReview = async (req, res) => {
  try {
    await Reviews.deleteReview(req.params.reviewId);
    res.json({ success: true, message: "Review deleted successfully" });
  } catch (err) {
    console.error("removeReview error:", err);
    res.status(500).json({ success: false, message: "Error deleting review" });
  }
};

module.exports = {
  createReview,
  getOrgReviews,
  removeReview,
};
