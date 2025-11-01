const db = require("../config/db");

const ServiceProviders = {
  // Get all providers for a specific organization
  getAllByOrg: async (orgid) => {
    const [rows] = await db.query(
      `SELECT 
          sp.*, 
          os.sr_name AS service_name
       FROM service_providers sp
       LEFT JOIN org_services os ON sp.org_sid = os.org_sid
       WHERE sp.orgid = ?`,
      [orgid]
    );
    return rows;
  },

  // Create new provider
  create: async (data) => {
    const { orgid, sp_name, pic, designation, status, org_sid } = data;
    const [result] = await db.query(
      `INSERT INTO service_providers 
       (sp_name, pic, designation, status, orgid, org_sid) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [sp_name, pic, designation, status, orgid, org_sid]
    );
    return result.insertId;
  },

// module.exports = ServiceProviders;
// ✅ Update
  update: async (sp_id, data) => {
    const { sp_name, pic, designation, status, org_sid } = data || {};

    // Dynamically handle optional pic
    const fields = ["sp_name = ?", "designation = ?", "status = ?", "org_sid = ?"];
    const values = [sp_name, designation, status, org_sid];

    if (pic) {
      fields.push("pic = ?");
      values.push(pic);
    }

    values.push(sp_id);

    const sql = `UPDATE service_providers SET ${fields.join(", ")} WHERE sp_id = ?`;
    const [result] = await db.query(sql, values);
    return result.affectedRows;
  },

  delete: async (sp_id) => {
    const [result] = await db.query("DELETE FROM service_providers WHERE sp_id=?", [sp_id]);
    return result.affectedRows;
  },
};

module.exports = ServiceProviders;