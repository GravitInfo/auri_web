const db = require("../config/db");

const Organization = {
  findByEmail: async (email) => {
    const [rows] = await db.query("SELECT * FROM organization WHERE email = ?", [email]);
    return rows[0];
  },
};

module.exports = Organization;
