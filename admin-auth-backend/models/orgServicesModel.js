const db = require("../config/db");

const OrgServices = {
  getAllByOrg: async (orgId) => {
    const sql = `
      SELECT s.*, sc.icon, sc.sr_name AS sr_name_cat
      FROM org_services s
      JOIN service_cat sc ON s.sc_id = sc.sc_id
      WHERE s.orgid = ?
    `;
    const [rows] = await db.query(sql, [orgId]);
    return rows;
  },

  create: async (data) => {
    const { orgid, sc_id, sr_type, duration, rate, available_on, timing_from, timing_to } = data;
    const [result] = await db.query(
      `INSERT INTO org_services (orgid, sc_id, sr_type, duration, rate, available_on, timing_from, timing_to)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [orgid, sc_id, sr_type, duration, rate, available_on, timing_from, timing_to]
    );
    return result.insertId;
  },

  update: async (id, data) => {
    const { sc_id, sr_type, duration, rate, available_on, timing_from, timing_to } = data;
    const [result] = await db.query(
      `UPDATE org_services 
       SET sc_id=?, sr_type=?, duration=?, rate=?, available_on=?, timing_from=?, timing_to=? 
       WHERE org_sid=?`,
      [sc_id, sr_type, duration, rate, available_on, timing_from, timing_to, id]
    );
    return result.affectedRows;
  },

  delete: async (id) => {
    const [result] = await db.query(
      `DELETE FROM org_services WHERE org_sid=?`,
      [id]
    );
    return result.affectedRows;
  }
};

module.exports = OrgServices;
