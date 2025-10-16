const db = require("../config/db");

const OrgServices = {
  // Get all services for a specific organization
  getAllByOrg: async (orgid) => {
    const [rows] = await db.query(
      `SELECT os.*, sc.service_cat_name 
       FROM org_services os
       LEFT JOIN service_cat sc ON os.service_cat_id = sc.service_cat_id
       WHERE os.orgid = ?`,
      [orgid]
    );
    return rows;
  },

  // Create a new org service
  create: async (data) => {
    const { orgid, service_cat_id, service_name, price, description } = data;
    const [result] = await db.query(
      "INSERT INTO org_services (orgid, service_cat_id, service_name, price, description) VALUES (?, ?, ?, ?, ?)",
      [orgid, service_cat_id, service_name, price, description]
    );
    return result.insertId;
  },

  // Update a service
  update: async (id, data) => {
    const { service_name, price, description } = data;
    const [result] = await db.query(
      "UPDATE org_services SET service_name=?, price=?, description=? WHERE org_service_id=?",
      [service_name, price, description, id]
    );
    return result.affectedRows;
  },

  // Delete a service
  delete: async (id) => {
    const [result] = await db.query(
      "DELETE FROM org_services WHERE org_service_id=?",
      [id]
    );
    return result.affectedRows;
  },
};

module.exports = OrgServices;
