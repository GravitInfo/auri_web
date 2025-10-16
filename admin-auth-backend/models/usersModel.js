const db = require("../config/db");

const Users = {
  // Create/register a new user
  create: async ({ user_email, u_name, u_mobile, profile_pic, address, city, zip }) => {
    const [result] = await db.query(
      `INSERT INTO users 
       (user_email, u_name, u_mobile, profile_pic, address, city, zip) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_email, u_name, u_mobile, profile_pic, address, city, zip]
    );
    return result.insertId;
  },

  // Find user by email
  findByEmail: async (user_email) => {
    const [rows] = await db.query(
      "SELECT * FROM users WHERE user_email = ?",
      [user_email]
    );
    return rows[0];
  },
};

module.exports = Users;
