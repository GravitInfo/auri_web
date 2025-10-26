// const db = require("../config/db");
// const fs = require("fs");
// const path = require("path");

// const OrganizationPics = {
//   // Get all pictures
//   getAll: async (req, res) => {
//     try {
//       const [rows] = await db.query("SELECT * FROM organization_pics");
//       res.json(rows);
//     } catch (err) {
//       console.error("getAll error:", err);
//       res.status(500).json({ message: "Server error", details: err.message });
//     }
//   },

//   // Get pics by organization ID
//   getByOrgId: async (req, res) => {
//     try {
//       const orgid = req.params.orgid;
//       const [rows] = await db.query(
//         "SELECT * FROM organization_pics WHERE orgid = ?",
//         [orgid]
//       );
//       res.json(rows);
//     } catch (err) {
//       console.error("getByOrgId error:", err);
//       res.status(500).json({ message: "Server error", details: err.message });
//     }
//   },

//   // Upload multiple pictures
//   uploadPics: async (req, res) => {
//     try {
//       const orgid = req.params.orgid;

//       if (!req.files || req.files.length === 0) {
//         return res.status(400).json({ message: "No images uploaded" });
//       }

//       const insertData = req.files.map((file) => [
//         orgid,
//         file.filename,
//         "active",
//         new Date(),
//       ]);

//       const [result] = await db.query(
//         "INSERT INTO organization_pics (orgid, image, status, created_dttime) VALUES ?",
//         [insertData]
//       );

//       res.status(201).json({
//         message: `${req.files.length} image(s) uploaded successfully`,
//         insertedIds: result.insertId,
//       });
//     } catch (err) {
//       console.error("uploadPics error:", err);
//       res.status(500).json({ message: "Server error", details: err.message });
//     }
//   },

//   // Delete a picture by id
//   deletePic: async (req, res) => {
//     try {
//       const id = req.params.id;

//       // Find file name first
//       const [rows] = await db.query(
//         "SELECT * FROM organization_pics WHERE org_pic_id = ?",
//         [id]
//       );

//       if (rows.length === 0)
//         return res.status(404).json({ message: "Picture not found" });

//       const filePath = path.join(__dirname, "../uploads", rows[0].image);

//       // Delete file from disk
//       if (fs.existsSync(filePath)) {
//         fs.unlinkSync(filePath);
//       }

//       // Delete from DB
//       await db.query("DELETE FROM organization_pics WHERE org_pic_id = ?", [id]);

//       res.json({ message: "Picture deleted successfully" });
//     } catch (err) {
//       console.error("deletePic error:", err);
//       res.status(500).json({ message: "Server error", details: err.message });
//     }
//   },
// };

// module.exports = OrganizationPics;
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

  // Upload multiple pictures
  uploadPics: async (req, res) => {
    try {
      const orgid = req.params.orgid;

      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No images uploaded" });
      }

      const insertData = req.files.map((file) => [
        orgid,
        file.filename,
        "active",
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
// update pic
updatePic: async (req, res) => {
  try {
    const picId = req.params.id;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const file = req.files[0];
    const image = file.filename;

    // Find old file to delete
    const [rows] = await db.query(
      "SELECT * FROM organization_pics WHERE org_pic_id = ?",
      [picId]
    );
    if (rows.length === 0) return res.status(404).json({ message: "Picture not found" });

    const oldFilePath = path.join(__dirname, "../uploads/orgs", rows[0].image);
    if (fs.existsSync(oldFilePath)) {
      fs.unlinkSync(oldFilePath); // remove old file
    }

    //  Update DB with new filename (without updated_dttime)
    await db.query(
      "UPDATE organization_pics SET image = ? WHERE org_pic_id = ?",
      [image, picId]
    );

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

