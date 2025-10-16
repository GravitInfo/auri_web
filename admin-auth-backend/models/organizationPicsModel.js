const db = require("../config/db");

const OrganizationPics = {
  getAllByOrg: async (orgid) => {
    const [rows] = await db.query("SELECT * FROM organization_pics WHERE orgid=?", [orgid]);
    return rows;
  },
  create: async (data) => {
    const { orgid, image, status } = data;
    const [result] = await db.query(
      "INSERT INTO organization_pics (orgid,image,status) VALUES (?,?,?)",
      [orgid,image,status || "active"]
    );
    return result.insertId;
  },
  delete: async (id) => {
    const [result] = await db.query("DELETE FROM organization_pics WHERE org_pic_id=?", [id]);
    return result.affectedRows;
  }
};

module.exports = OrganizationPics;
