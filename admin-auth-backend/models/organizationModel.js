const db = require("../config/db");

const Organization = {

  // NOT NEEDED HERE — handled in controller (better practice)

  getAllWithReviews: async () => {
    const sql = `
      SELECT 
        o.*,
        IFNULL(AVG(r.rating), 0) AS avg_rating,
        COUNT(r.review_id) AS review_count
      FROM organization o
      LEFT JOIN reviews r ON o.id = r.organization_id
      GROUP BY o.id
      ORDER BY o.created_dttime DESC
    `;
    const [rows] = await db.query(sql);
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM organization WHERE id = ?", [id]);
    return rows[0];
  },

  getFullDetailsById: async (id) => {
    const [orgRows] = await db.query("SELECT * FROM organization WHERE id = ?", [id]);
    const organization = orgRows[0];
    if (!organization) return null;

    const [pics] = await db.query("SELECT * FROM organization_pics WHERE orgid = ?", [id]);
    const [services] = await db.query("SELECT * FROM org_services WHERE orgid = ?", [id]);
    const [providers] = await db.query("SELECT * FROM service_providers WHERE orgid = ?", [id]);
    const [reviews] = await db.query("SELECT * FROM reviews WHERE organization_id = ? ORDER BY created_at DESC", [id]);

    const avg_rating = reviews.length
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      : 0;

    return {
      organization,
      pics,
      services,
      providers,
      reviews,
      avg_rating,
      review_count: reviews.length,
    };
  },

  create: async (data) => {
    const {
      name, email, type, address, city, pincode,
      country, phone_no, longitude, latitude,
      about, image, intro, password, status = "active",
    } = data;

    const [result] = await db.query(
      `INSERT INTO organization 
        (name, email, type, address, city, pincode, country, phone_no, longitude, latitude, about, image, intro, password, status, created_dttime)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW())`,
      [name, email, type, address, city, pincode, country, phone_no, longitude, latitude, about, image, intro, password, status]
    );

    return result.insertId;
  },

  update: async (id, data) => {
    const query = `
      UPDATE organization SET 
        name=?, email=?, type=?, address=?, city=?, pincode=?, country=?, phone_no=?, longitude=?, latitude=?, about=?, image=?, intro=?, status=?
        ${data.password ? ", password=?" : ""}
      WHERE id=?
    `;

    const params = [
      data.name, data.email, data.type, data.address, data.city,
      data.pincode, data.country, data.phone_no,
      data.longitude, data.latitude, data.about,
      data.image, data.intro, data.status,
    ];

    if (data.password) params.push(data.password);
    params.push(id);

    const [res] = await db.query(query, params);
    return res.affectedRows;
  },

  delete: async (id) => {
    const [result] = await db.query("DELETE FROM organization WHERE id=?", [id]);
    return result.affectedRows;
  },
};

module.exports = Organization;
