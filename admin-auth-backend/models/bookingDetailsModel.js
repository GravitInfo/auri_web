const db = require("../config/db");

const BookingDetails = {
  // ✅ Get all booking details
  getAll: async () => {
    const sql = `
      SELECT bd.*, 
             bm.user_id, bm.date_of_pur, bm.amt AS booking_amount,
             os.sr_name AS service_name, os.rate AS service_rate,
             sp.sp_name AS provider_name, sp.pic AS provider_pic
      FROM Booking_Details bd
      JOIN Booking_Master bm ON bd.booking_id = bm.booking_id
      JOIN org_services os ON bd.org_sid = os.org_sid
      JOIN service_providers sp ON bd.sp_id = sp.sp_id
      ORDER BY bd.booking_dt_id DESC
    `;
    const [rows] = await db.query(sql);
    return rows;
  },

  // ✅ Get booking detail by booking_dt_id
  getById: async (id) => {
    const sql = `
      SELECT bd.*, 
             bm.user_id, bm.date_of_pur, bm.amt AS booking_amount,
             os.sr_name AS service_name, os.rate AS service_rate,
             sp.sp_name AS provider_name, sp.pic AS provider_pic
      FROM Booking_Details bd
      JOIN Booking_Master bm ON bd.booking_id = bm.booking_id
      JOIN org_services os ON bd.org_sid = os.org_sid
      JOIN service_providers sp ON bd.sp_id = sp.sp_id
      WHERE bd.booking_dt_id = ?
    `;
    const [rows] = await db.query(sql, [id]);
    return rows[0];
  },

  // ✅ Get all booking details by booking_id
  getByBookingId: async (bookingId) => {
    const sql = `
      SELECT bd.*, 
             os.sr_name AS service_name, os.rate AS service_rate,
             sp.sp_name AS provider_name, sp.pic AS provider_pic
      FROM Booking_Details bd
      JOIN org_services os ON bd.org_sid = os.org_sid
      JOIN service_providers sp ON bd.sp_id = sp.sp_id
      WHERE bd.booking_id = ?
    `;
    const [rows] = await db.query(sql, [bookingId]);
    return rows;
  },

  // ✅ Create new booking detail
  create: async (data) => {
    const sql = `
      INSERT INTO Booking_Details (booking_id, org_sid, p_date, p_time, sp_id)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [
      data.booking_id,
      data.org_sid,
      data.p_date,
      data.p_time,
      data.sp_id,
    ]);
    return result;
  },

  // ✅ Delete booking detail
  delete: async (id) => {
    const sql = `DELETE FROM Booking_Details WHERE booking_dt_id = ?`;
    const [result] = await db.query(sql, [id]);
    return result;
  },
};

module.exports = BookingDetails;
