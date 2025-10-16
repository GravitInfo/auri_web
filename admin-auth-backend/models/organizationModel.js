const db = require("../config/db");

const Organization = {
  // 🔹 Get all organizations
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM organization");
    return rows;
  },

  // 🔹 Get organization by ID only
  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM organization WHERE id = ?", [id]);
    return rows[0];
  },

  // 🔹 Get full details (organization + pics + services + providers)
  getFullDetailsById: async (id) => {
    // Get organization
    const [orgRows] = await db.query("SELECT * FROM organization WHERE id = ?", [id]);
    const organization = orgRows[0];
    if (!organization) return null;

    // Get related data
    const [pics] = await db.query("SELECT * FROM organization_pics WHERE orgid = ?", [id]);
    const [services] = await db.query("SELECT * FROM org_services WHERE orgid = ?", [id]);
    const [providers] = await db.query("SELECT * FROM service_providers WHERE orgid = ?", [id]);

    // Combine data
    return { organization, pics, services, providers };
  },

  // 🔹 Create new organization
  create: async (data) => {
    const {
      name,
      email,
      type,
      address,
      city,
      pincode,
      country,
      phone_no,
      longitude,
      latitude,
      about,
      password,
      status = "active",
    } = data;

    const [result] = await db.query(
      `INSERT INTO organization 
        (name, email, type, address, city, pincode, country, phone_no, longitude, latitude, about, password, status, created_dttime)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        name,
        email,
        type,
        address,
        city,
        pincode,
        country,
        phone_no,
        longitude,
        latitude,
        about,
        password,
        status,
      ]
    );

    return result.insertId;
  },

  // 🔹 Update organization by ID
  update: async (id, data) => {
    const {
      name,
      email,
      type,
      address,
      city,
      pincode,
      country,
      phone_no,
      longitude,
      latitude,
      about,
      password,
      status,
    } = data;

    const [result] = await db.query(
      `UPDATE organization 
       SET name=?, email=?, type=?, address=?, city=?, pincode=?, country=?, phone_no=?, longitude=?, latitude=?, about=?, password=?, status=? 
       WHERE id=?`,
      [
        name,
        email,
        type,
        address,
        city,
        pincode,
        country,
        phone_no,
        longitude,
        latitude,
        about,
        password,
        status,
        id,
      ]
    );

    return result.affectedRows;
  },

  // 🔹 Delete organization
  delete: async (id) => {
    const [result] = await db.query("DELETE FROM organization WHERE id=?", [id]);
    return result.affectedRows;
  },
};

module.exports = Organization;
