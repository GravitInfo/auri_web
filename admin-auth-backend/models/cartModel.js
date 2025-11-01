const db = require("../config/db");

const Cart = {
  // Get all cart records (with user and service info)
  getAll: async () => {
    const sql = `
      SELECT c.*, 
             u.u_name, 
             u.user_email, 
             o.sr_name AS service_name
      FROM Cart c
      JOIN users u ON c.user_id = u.user_id
      JOIN org_services o ON c.org_sid = o.org_sid
    `;
    const [rows] = await db.query(sql);
    return rows;
  },

  // Get cart records by user_id
  getByUserId: async (user_id) => {
    const sql = `
      SELECT c.*, 
             u.u_name, 
             u.user_email, 
             o.sr_name AS service_name
      FROM Cart c
      JOIN users u ON c.user_id = u.user_id
      JOIN org_services o ON c.org_sid = o.org_sid
      WHERE c.user_id = ?
    `;
    const [rows] = await db.query(sql, [user_id]);
    return rows;
  },

  // Add new cart item
  create: async (data) => {
    const sql = `
      INSERT INTO Cart (user_id, org_sid, p_date, p_time, amt)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [
      data.user_id,
      data.org_sid,
      data.p_date,
      data.p_time,
      data.amt,
    ]);
    return result;
  },

  // Delete cart item by ID
  delete: async (cart_id) => {
    const sql = "DELETE FROM Cart WHERE cart_id = ?";
    const [result] = await db.query(sql, [cart_id]);
    return result;
  },
};

module.exports = Cart;
