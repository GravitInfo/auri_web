const db = require("../config/db");

const Users = {
  create: async ({ user_email, u_name, u_mobile, profile_pic, address, city, zip, password }) => {
    const [result] = await db.query(
      `INSERT INTO users 
       (user_email, u_name, u_mobile, profile_pic, address, city, zip, password, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [user_email, u_name, u_mobile, profile_pic, address, city, zip, password, "inactive"]
    );
    return result.insertId;
  },

  findByEmail: async (user_email) => {
    const [rows] = await db.query("SELECT * FROM users WHERE user_email = ?", [user_email]);
    return rows[0];
  },

  updateStatus: async (user_email, status) => {
    const [result] = await db.query("UPDATE users SET status = ? WHERE user_email = ?", [status, user_email]);
    return result.affectedRows;
  },

  updateByEmail: async (user_email, fields = {}) => {
    const setParts = [];
    const values = [];
    for (const [k, v] of Object.entries(fields)) {
      setParts.push(`${k} = ?`);
      values.push(v);
    }
    if (!setParts.length) return 0;
    values.push(user_email);
    const sql = `UPDATE users SET ${setParts.join(", ")} WHERE user_email = ?`;
    const [result] = await db.query(sql, values);
    return result.affectedRows;
  },
};

module.exports = Users;


