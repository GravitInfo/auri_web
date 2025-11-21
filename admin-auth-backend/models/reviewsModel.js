const db = require("../config/db");

const Reviews = {
  // ➤ Add a new review
  addReview: async (data) => {
    const {
      user_id,
      organization_id,
      rating,
      review_text,
      user_name,
      user_profile
    } = data;

    const sql = `
      INSERT INTO reviews 
      (user_id, organization_id, rating, review_text, user_name, user_profile) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    // FIX: user_id = null allowed, NOT 0
    const [result] = await db.query(sql, [
      user_id || null,
      organization_id,
      rating,
      review_text,
      user_name,
      user_profile || null
    ]);

    return result.insertId;
  },

  // ➤ Get reviews for an organization
  getReviewsByOrg: async (organization_id) => {
    const sql = `
      SELECT * FROM reviews
      WHERE organization_id = ?
      ORDER BY created_at DESC
    `;
    const [rows] = await db.query(sql, [organization_id]);
    return rows;
  },

  // ➤ Delete review
  deleteReview: async (review_id) => {
    const sql = `DELETE FROM reviews WHERE review_id = ?`;
    const [result] = await db.query(sql, [review_id]);
    return result;
  },
};

module.exports = Reviews;
