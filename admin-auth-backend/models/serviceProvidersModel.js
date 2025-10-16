const db = require("../config/db");

const ServiceProviders = {
  // Get all providers for a specific organization
  getAllByOrg: async (orgid) => {
    const [rows] = await db.query(
      `SELECT sp.*, os.service_name 
       FROM service_providers sp
       LEFT JOIN org_services os ON sp.service_id = os.org_service_id
       WHERE sp.orgid = ?`,
      [orgid]
    );
    return rows;
  },

  // Create new provider
  create: async (data) => {
    const { orgid, name, email, phone, service_id, experience } = data;
    const [result] = await db.query(
      "INSERT INTO service_providers (orgid, name, email, phone, service_id, experience) VALUES (?, ?, ?, ?, ?, ?)",
      [orgid, name, email, phone, service_id, experience]
    );
    return result.insertId;
  },

  // Update provider
  update: async (id, data) => {
    const { name, email, phone, experience } = data;
    const [result] = await db.query(
      "UPDATE service_providers SET name=?, email=?, phone=?, experience=? WHERE provider_id=?",
      [name, email, phone, experience, id]
    );
    return result.affectedRows;
  },

  // Delete provider
  delete: async (id) => {
    const [result] = await db.query(
      "DELETE FROM service_providers WHERE provider_id=?",
      [id]
    );
    return result.affectedRows;
  },
};

module.exports = ServiceProviders;
