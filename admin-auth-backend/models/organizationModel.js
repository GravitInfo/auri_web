const db = require("../config/db");

const Organization = {
  // 🔹 Get all organizations
  getAll: async () => {
    try {
      const [rows] = await db.query("SELECT * FROM organization");
      return rows;
    } catch (err) {
      console.error(" getAll() DB error:", err);
      throw err;
    }
  },

  // 🔹 Get organization by ID
  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM organization WHERE id = ?", [
      id,
    ]);
    return rows[0];
  },

  // 🔹 Get full details (organization + pics + services + providers)
  getFullDetailsById: async (id) => {
    const [orgRows] = await db.query(
      "SELECT * FROM organization WHERE id = ?",
      [id]
    );
    const organization = orgRows[0];
    if (!organization) return null;

    const [pics] = await db.query(
      "SELECT * FROM organization_pics WHERE orgid = ?",
      [id]
    );
    const [services] = await db.query(
      "SELECT * FROM org_services WHERE orgid = ?",
      [id]
    );
    const [providers] = await db.query(
      "SELECT * FROM service_providers WHERE orgid = ?",
      [id]
    );

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

  // 🔹 Update organization by ID (conditionally updates password)
  update: async (id, data) => {
    // dynamically build query
    let query = `
      UPDATE organization SET 
        name=?, email=?, type=?, address=?, city=?, pincode=?, country=?, phone_no=?, longitude=?, latitude=?, about=?, status=?`;
    const params = [
      data.name,
      data.email,
      data.type,
      data.address,
      data.city,
      data.pincode,
      data.country,
      data.phone_no,
      data.longitude,
      data.latitude,
      data.about,
      data.status,
    ];

    // ✅ include password only if provided
    if (data.password) {
      query += `, password=?`;
      params.push(data.password);
    }

    query += ` WHERE id=?`;
    params.push(id);

    const [result] = await db.query(query, params);
    return result.affectedRows;
  },

  // 🔹 Delete organization
  delete: async (id) => {
    const [result] = await db.query("DELETE FROM organization WHERE id=?", [
      id,
    ]);
    return result.affectedRows;
  },
};

module.exports = Organization;
