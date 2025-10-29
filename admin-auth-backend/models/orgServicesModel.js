const db = require("../config/db");

const OrgServices = {
  //  Get all services for an organization (with service_cat icon & name)
  getAllByOrg: async (orgId) => {
    const sql = `
      SELECT 
        s.*, 
        sc.icon AS cat_icon,      -- Category icon
        sc.sr_name AS sr_name_cat
      FROM org_services s
      JOIN service_cat sc ON s.sc_id = sc.sc_id
      WHERE s.orgid = ?
    `;
    const [rows] = await db.query(sql, [orgId]);
    return rows;
  },

  //  Create new service
  create: async (data) => {
    const {
      orgid,
      sc_id,
      sr_name,
      sr_name_ar,
      sr_type,
      sr_short_desc,
      sr_long_desc,
      duration,
      rate,
      available_on,
      timing_from,
      timing_to,
      icon, 
    } = data;

    const sql = `
      INSERT INTO org_services (
        orgid, sc_id, sr_name, sr_name_ar, sr_type, sr_short_desc, sr_long_desc,
        duration, rate, available_on, timing_from, timing_to, icon
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [
      orgid,
      sc_id,
      sr_name,
      sr_name_ar,
      sr_type,
      sr_short_desc,
      sr_long_desc,
      duration,
      rate,
      available_on,
      timing_from,
      timing_to,
      icon, 
    ]);

    return result.insertId;
  },

  //  Update service
  update: async (id, data) => {
    const {
      sc_id,
      sr_name,
      sr_name_ar,
      sr_type,
      sr_short_desc,
      sr_long_desc,
      duration,
      rate,
      available_on,
      timing_from,
      timing_to,
      icon, 
    } = data;

    const sql = `
      UPDATE org_services 
      SET sc_id=?, sr_name=?, sr_name_ar=?, sr_type=?, sr_short_desc=?, sr_long_desc=?,
          duration=?, rate=?, available_on=?, timing_from=?, timing_to=?, icon=?
      WHERE org_sid=?
    `;
    const [result] = await db.query(sql, [
      sc_id,
      sr_name,
      sr_name_ar,
      sr_type,
      sr_short_desc,
      sr_long_desc,
      duration,
      rate,
      available_on,
      timing_from,
      timing_to,
      icon, 
      id,
    ]);

    return result.affectedRows;
  },

  //  Delete service
  delete: async (id) => {
    const [result] = await db.query(
      `DELETE FROM org_services WHERE org_sid=?`,
      [id]
    );
    return result.affectedRows;
  },
};

module.exports = OrgServices;
