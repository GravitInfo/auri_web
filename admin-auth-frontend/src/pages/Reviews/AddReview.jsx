import React, { useState } from "react";
import axios from "axios";

const AddReview = ({ organizationId, user }) => {
  const [rating, setRating] = useState(5);
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

      const res = await axios.post("/api/reviews/add", body);
      setMessage("Review added successfully!");
      setText("");
      setRating(5);
    } catch (err) {
      console.error(err);
      setMessage("Error adding review.");
    }

    setLoading(false);
  };

  return (
    <div className="add-review">
      <h3>Add a Review</h3>
      <form onSubmit={handleSubmit}>
        <label>Rating:</label>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[1,2,3,4,5].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>

        <label>Review:</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your review..."
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default AddReview;
