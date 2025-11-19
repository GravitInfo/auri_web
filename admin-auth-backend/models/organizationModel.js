const db = require("../config/db");

const Organization = {

  // Get all organizations with average reviews
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

  // Get single organization by ID
  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM organization WHERE id = ?", [id]);
    return rows[0];
  },

  // Get full details by ID (including pics, services, providers, reviews)
  getFullDetailsById: async (id) => {
    const [orgRows] = await db.query(
      "SELECT * FROM organization WHERE id = ?",
      [id]
    );
    const organization = orgRows[0];
    if (!organization) return null;

    // Organization Pics
    const [pics] = await db.query(
      "SELECT * FROM organization_pics WHERE orgid = ?",
      [id]
    );

    // Services
    const [services] = await db.query(
      "SELECT * FROM org_services WHERE orgid = ?",
      [id]
    );

    // Providers
    const [providers] = await db.query(
      "SELECT * FROM service_providers WHERE orgid = ?",
      [id]
    );

    // Reviews with user info
    const [reviews] = await db.query(
      "SELECT * FROM reviews WHERE organization_id = ? ORDER BY created_at DESC",
      [id]
    );

    // Format time_ago for each review
    const formattedReviews = reviews.map((r) => {
      const diffMs = new Date() - new Date(r.created_at);
      const diffMin = Math.floor(diffMs / (1000 * 60));
      let time_ago = "";
      if (diffMin < 60) time_ago = `${diffMin} min ago`;
      else if (diffMin < 1440) time_ago = `${Math.floor(diffMin / 60)} h ago`;
      else time_ago = `${Math.floor(diffMin / 1440)} d ago`;
      return { ...r, time_ago };
    });

    // Calculate average rating and review count
    const avg_rating =
      reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 0;
    const review_count = reviews.length;

    return {
      organization,
      pics,
      services,
      providers,
      reviews: formattedReviews,
      avg_rating,
      review_count,
    };
  },

  // CREATE
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
      image,
      intro,
      password,
      status = "active",
    } = data;

    const [result] = await db.query(
      `INSERT INTO organization 
      (name, email, type, address, city, pincode, country, phone_no, longitude, latitude, about, image, intro, password, status, created_dttime)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
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
        image,
        intro,
        password,
        status,
      ]
    );

    return result.insertId;
  },

  // UPDATE
  update: async (id, data) => {
    const query = `
      UPDATE organization SET 
        name=?, email=?, type=?, address=?, city=?, pincode=?, country=?, phone_no=?, longitude=?, latitude=?, about=?, image=?, intro=?, status=?${
          data.password ? ", password=?" : ""
        }
      WHERE id=?`;

    const params = [
      data.name || "",
      data.email || "",
      data.type || "general",
      data.address || "",
      data.city || "",
      data.pincode || "",
      data.country || "",
      data.phone_no || "",
      data.longitude ? parseFloat(data.longitude) : null,
      data.latitude ? parseFloat(data.latitude) : null,
      data.about || null,
      data.image || null,
      data.intro || null,
      data.status || "active",
    ];

    if (data.password && data.password.trim() !== "") {
      params.push(data.password);
    }

    params.push(id);

    const [result] = await db.query(query, params);
    return result.affectedRows;
  },

  // DELETE
  delete: async (id) => {
    const [result] = await db.query("DELETE FROM organization WHERE id=?", [id]);
    return result.affectedRows;
  },
};

module.exports = Organization;
