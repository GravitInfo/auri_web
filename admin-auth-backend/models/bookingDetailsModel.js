const db = require("../config/db");

const BookingDetails = {
  // ✅ Get all booking details
  getAll: async () => {
    const sql = `
      SELECT 
        bd.booking_dt_id,
        bd.booking_id,
        bd.org_sid,
        bd.p_date,
        bd.p_time,
        bd.sp_id,

        bm.date_of_pur AS booking_date,
        bm.amt AS booking_amount,

        u.user_id,
        u.u_name AS user_name,
        u.user_email,
        u.u_mobile,
        u.profile_pic AS user_profile_pic,

        o.id AS org_id,
        o.name AS org_name,
        o.email AS org_email,
        o.phone_no AS org_phone,
        o.city AS org_city,
        o.address AS org_address,

        os.sr_name AS service_name,
        os.rate AS service_rate,
        os.duration,
        os.icon AS service_icon,

        sp.sp_name AS provider_name,
        sp.pic AS provider_pic,
        sp.designation AS provider_designation

      FROM Booking_Details bd
      JOIN Booking_Master bm ON bd.booking_id = bm.booking_id
      JOIN users u ON bm.user_id = u.user_id
      JOIN org_services os ON bd.org_sid = os.org_sid
      JOIN organization o ON os.orgid = o.id
      JOIN service_providers sp ON bd.sp_id = sp.sp_id
      ORDER BY bd.booking_dt_id DESC
    `;
    const [rows] = await db.query(sql);
    return rows;
  },

  // ✅ Get booking detail by booking_dt_id
  getById: async (id) => {
    const sql = `
      SELECT 
        bd.booking_dt_id,
        bd.booking_id,
        bd.org_sid,
        bd.sp_id,
        bd.p_date,
        bd.p_time,

        bm.date_of_pur AS booking_date,
        bm.amt AS booking_amount,

        u.user_id,
        u.u_name AS user_name,
        u.user_email,
        u.u_mobile,
        u.profile_pic AS user_profile_pic,

        o.id AS org_id,
        o.name AS org_name,
        o.email AS org_email,
        o.phone_no AS org_phone,
        o.city AS org_city,
        o.address AS org_address,

        os.sr_name AS service_name,
        os.rate AS service_rate,
        os.duration,
        os.icon AS service_icon,

        sp.sp_name AS provider_name,
        sp.pic AS provider_pic,
        sp.designation AS provider_designation

      FROM Booking_Details bd
      JOIN Booking_Master bm ON bd.booking_id = bm.booking_id
      JOIN users u ON bm.user_id = u.user_id
      JOIN org_services os ON bd.org_sid = os.org_sid
      JOIN organization o ON os.orgid = o.id
      JOIN service_providers sp ON bd.sp_id = sp.sp_id
      WHERE bd.booking_dt_id = ?
    `;
    const [rows] = await db.query(sql, [id]);
    return rows;
  },

  // ✅ Get all booking details by booking_id
  getByBookingId: async (bookingId) => {
    const sql = `
      SELECT 
        bd.booking_dt_id,
        bd.booking_id,
        bd.org_sid,
        bd.p_date,
        bd.p_time,
        bd.sp_id,

        bm.date_of_pur AS booking_date,
        bm.amt AS booking_amount,

        u.user_id,
        u.u_name AS user_name,
        u.user_email,
        u.u_mobile,
        u.profile_pic AS user_profile_pic,

        o.id AS org_id,
        o.name AS org_name,
        o.email AS org_email,
        o.phone_no AS org_phone,
        o.city AS org_city,
        o.address AS org_address,

        os.sr_name AS service_name,
        os.rate AS service_rate,
        os.duration,
        os.icon AS service_icon,

        sp.sp_name AS provider_name,
        sp.pic AS provider_pic,
        sp.designation AS provider_designation

      FROM Booking_Details bd
      JOIN Booking_Master bm ON bd.booking_id = bm.booking_id
      JOIN users u ON bm.user_id = u.user_id
      JOIN org_services os ON bd.org_sid = os.org_sid
      JOIN organization o ON os.orgid = o.id
      JOIN service_providers sp ON bd.sp_id = sp.sp_id
      WHERE bd.booking_id = ?
      ORDER BY bd.booking_dt_id DESC
    `;
    const [rows] = await db.query(sql, [bookingId]);
    return rows;
  },

  getByOrganization: async (orgId) => {
    const sql = `
      SELECT 
        bd.booking_dt_id,
        bd.booking_id,
        bd.org_sid,
        bd.p_date,
        bd.p_time,
        bd.sp_id,

        bm.date_of_pur AS booking_date,
        bm.amt AS booking_amount,

        u.user_id,
        u.u_name AS user_name,
        u.user_email,
        u.u_mobile,
        u.profile_pic AS user_profile_pic,

        o.id AS org_id,
        o.name AS org_name,
        o.email AS org_email,
        o.phone_no AS org_phone,
        o.city AS org_city,
        o.address AS org_address,

        os.sr_name AS service_name,
        os.rate AS service_rate,
        os.duration,
        os.icon AS service_icon,

        sp.sp_name AS provider_name,
        sp.pic AS provider_pic,
        sp.designation AS provider_designation

      FROM Booking_Details bd
      JOIN Booking_Master bm ON bd.booking_id = bm.booking_id
      JOIN users u ON bm.user_id = u.user_id
      JOIN org_services os ON bd.org_sid = os.org_sid
      JOIN organization o ON os.orgid = o.id
      JOIN service_providers sp ON bd.sp_id = sp.sp_id
      WHERE o.id = ?
      ORDER BY bd.booking_dt_id DESC
    `;
    const [rows] = await db.query(sql, [orgId]);
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

























