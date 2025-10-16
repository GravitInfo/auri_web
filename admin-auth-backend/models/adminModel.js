const db = require("../config/db");

const Admin = {
  create: async (admin) => {
    const sql = `
      INSERT INTO admins 
      (name, email, password, phone, address, city, pincode) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [
      admin.name,
      admin.email,
      admin.password,
      admin.phone,
      admin.address,
      admin.city,
      admin.pincode,
    ]);
    return result;
  },

  findByEmail: async (email) => {
    const [rows] = await db.query("SELECT * FROM admins WHERE email = ?", [email]);
    return rows;
  },
};

module.exports = Admin;
