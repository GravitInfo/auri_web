import React, { useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import "../../../AddReview.css";
import { BASE_URL } from "../../../utils/config";

export default function OrganizationAddReview({ orgId, onReviewAdded }) {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const body = {
        user_id: null, // system or admin
        organization_id: orgId,
        rating,
        review_text: text,
        user_name: "Organization Admin",
        user_profile: null
      };

      await axios.post(`${BASE_URL}/api/reviews/add`, body);

      setMsg("Review submitted successfully!");
      setText("");
      setRating(5);

      if (onReviewAdded) onReviewAdded();
    } catch (err) {
      console.error(err);
      setMsg("Error submitting review.");
    }

    setLoading(false);
  };

  return (
    <div className="add-review-card mt-6">
      <h2 className="review-title">Add Review About Your Organization</h2>

      <form onSubmit={handleSubmit} className="review-form">
        <div className="rating-stars">
          {[...Array(5)].map((_, i) => {
            const val = i + 1;
            return (
              <label key={val}>
                <input
                  type="radio"
                  name="rating"
                  value={val}
                  onClick={() => setRating(val)}
                />
                <FaStar
                  className="star"
                  size={28}
                  color={val <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                  onMouseEnter={() => setHover(val)}
                  onMouseLeave={() => setHover(0)}
                />
              </label>
            );
          })}
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write something..."
          required
          className="review-textarea"
        />

        <button className="review-submit" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      {msg && <p className="review-message">{msg}</p>}
    </div>
  );
}
