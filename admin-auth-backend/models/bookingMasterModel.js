const db = require("../config/db");

const BookingMaster = {
  // ✅ Get all bookings with user details
  getAll: async () => {
    const sql = `
      SELECT bm.*, u.u_name, u.user_email, u.u_mobile
      FROM Booking_Master bm
      JOIN users u ON bm.user_id = u.user_id
      ORDER BY bm.booking_id DESC
    `;
    const [rows] = await db.query(sql);
    return rows;
  },

  // ✅ Get booking by ID
  getById: async (id) => {
    const sql = `
      SELECT bm.*, u.u_name, u.user_email, u.u_mobile
      FROM Booking_Master bm
      JOIN users u ON bm.user_id = u.user_id
      WHERE bm.booking_id = ?
    `;
    const [rows] = await db.query(sql, [id]);
    return rows[0];
  },

  // ✅ Create new booking
  create: async (data) => {
    const sql = `
      INSERT INTO Booking_Master (user_id, date_of_pur, amt)
      VALUES (?, ?, ?)
    `;
    const [result] = await db.query(sql, [data.user_id, data.date_of_pur, data.amt]);
    return result;
  },

  // ✅ Delete booking by ID
  delete: async (id) => {
    const sql = "DELETE FROM Booking_Master WHERE booking_id = ?";
    const [result] = await db.query(sql, [id]);
    return result;
  },
};

module.exports = BookingMaster;
