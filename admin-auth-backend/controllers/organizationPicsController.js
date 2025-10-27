const db = require("../config/db");
const fs = require("fs");
const path = require("path");

const OrganizationPics = {
  // Get all pictures
  getAll: async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM organization_pics");
      res.json(rows);
    } catch (err) {
      console.error("getAll error:", err);
      res.status(500).json({ message: "Server error", details: err.message });
    }
  },

  // Get pics by organization ID
  getByOrgId: async (req, res) => {
    try {
      const orgid = req.params.orgid;
      const [rows] = await db.query(
        "SELECT * FROM organization_pics WHERE orgid = ?",
        [orgid]
      );
      res.json(rows);
    } catch (err) {
      console.error("getByOrgId error:", err);
      res.status(500).json({ message: "Server error", details: err.message });
    }
  },

 
  uploadPics: async (req, res) => {
  try {
    const orgid = req.params.orgid;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    // Use status from frontend, default to "active"
    const status = req.body.status === "inactive" ? "inactive" : "active";

    const insertData = req.files.map((file) => [
      orgid,
      file.filename,
      status, //  use status from frontend
      new Date(),
    ]);

    const [result] = await db.query(
      "INSERT INTO organization_pics (orgid, image, status, created_dttime) VALUES ?",
      [insertData]
    );

    res.status(201).json({
      message: `${req.files.length} image(s) uploaded successfully`,
      insertedIds: result.insertId,
    });
  } catch (err) {
    console.error("uploadPics error:", err);
    res.status(500).json({ message: "Server error", details: err.message });
  }
},




updatePic: async (req, res) => {
  try {
    const picId = req.params.id;
    const status = req.body.status; // read status from frontend
    let image;

    // Only update image if new file uploaded
    if (req.files && req.files.length > 0) {
      image = req.files[0].filename;

      // Delete old file
      const [rows] = await db.query(
        "SELECT * FROM organization_pics WHERE org_pic_id = ?",
        [picId]
      );
      if (rows.length === 0) return res.status(404).json({ message: "Picture not found" });

      const oldFilePath = path.join(__dirname, "../uploads/orgs", rows[0].image);
      if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
    }

    // Update DB
    const updateQuery = image
      ? "UPDATE organization_pics SET image = ?, status = ? WHERE org_pic_id = ?"
      : "UPDATE organization_pics SET status = ? WHERE org_pic_id = ?";

    const params = image ? [image, status, picId] : [status, picId];

    await db.query(updateQuery, params);

    res.json({ message: "Picture updated successfully" });
  } catch (err) {
    console.error("updatePic error:", err);
    res.status(500).json({ message: "Server error", details: err.message });
  }
},




  // Delete a picture by id
  deletePic: async (req, res) => {
    try {
      const id = req.params.id;

      // Find file name first
      const [rows] = await db.query(
        "SELECT * FROM organization_pics WHERE org_pic_id = ?",
        [id]
      );

      if (rows.length === 0)
        return res.status(404).json({ message: "Picture not found" });

      const filePath = path.join(__dirname, "../uploads/orgs", rows[0].image);

      // Delete file from disk
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }

      // Delete from DB
      await db.query("DELETE FROM organization_pics WHERE org_pic_id = ?", [id]);

      res.json({ message: "Picture deleted successfully" });
    } catch (err) {
      console.error("deletePic error:", err);
      res.status(500).json({ message: "Server error", details: err.message });
    }
  },
};

module.exports = OrganizationPics;

