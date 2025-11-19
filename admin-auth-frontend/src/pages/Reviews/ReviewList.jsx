import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import { BASE_URL } from "../../utils/config";

const ReviewList = ({ organizationId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReviews = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `${BASE_URL}/api/reviews/org/${organizationId}`
      );
      setReviews(res.data?.reviews || []);
    } catch (err) {
      console.error(err);
      setError("Failed to load reviews.");
      setReviews([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (organizationId) fetchReviews();
  }, [organizationId]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} className="text-yellow-500 w-4 h-4" />);
      } else {
        stars.push(<Star key={i} className="text-gray-500 w-4 h-4" />);
      }
    }
    return stars;
  };

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="review-list space-y-6">
      <h2 className="text-2xl font-semibold text-[#1b3a7a] mb-4">
        Reviews & Ratings
      </h2>

      {reviews.length === 0 && <p className="text-gray-500">No reviews yet.</p>}

      <div className="grid grid-cols-1 md:grid-cols-1 gap-5">
        {reviews.map((r) => (
          <div
            key={r.review_id}
            className="bg-white border border-[#cceae6] rounded-2xl p-4 shadow hover:shadow-lg transition flex gap-4"
          >
            <img
              src={
                r.user_profile
                  ? r.user_profile
                  : "https://cdn-icons-png.flaticon.com/512/10337/10337609.png"
              }
              alt={r.user_name}
              className="w-16 h-16 rounded-full object-cover border-2 border-[#14b8a6]"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <strong className="text-[#1b3a7a]">{r.user_name}</strong>
                <span className="text-gray-400 text-sm">{r.time_ago}</span>
              </div>
              <div className="flex items-center gap-1 mb-2">
                {renderStars(r.rating)}
                <span className="text-sm text-gray-500 ml-2">{r.rating}/5</span>
              </div>
              <p className="text-[#1b3a7a]">{r.review_text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
