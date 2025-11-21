// AddReview.jsx
import React, { useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa"; // Using react-icons for stars
import "../../AddReview.css";
import { BASE_URL } from "../../utils/config";

const AddReview = ({ organizationId, user, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const body = {
        user_id: user.user_id,
        organization_id: organizationId,
        rating: rating,
        review_text: text,
        user_name: user.u_name,
        user_profile: user.profile_pic
      };

      await axios.post(`${BASE_URL}/api/reviews/add`, body);

      setMessage("Review added successfully!");
      setText("");
      setRating(5);
      setHover(0);

      if (onReviewAdded) onReviewAdded(); // 🔥 notify parent to refresh
    } catch (err) {
      console.error(err);
      setMessage("Error adding review.");
    }

    setLoading(false);
  };

  return (
    <div className="add-review-card">
      <h2 className="review-title">Share Your Feedback</h2>

      <form onSubmit={handleSubmit} className="review-form">
        <div className="rating-stars">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  value={starValue}
                  onClick={() => setRating(starValue)}
                />
                <FaStar
                  className="star"
                  color={starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                  size={30}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(0)}
                />
              </label>
            );
          })}
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your review..."
          required
          className="review-textarea"
        />

        <button type="submit" disabled={loading} className="review-submit">
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      {message && <p className="review-message">{message}</p>}
    </div>
  );
};

export default AddReview;
