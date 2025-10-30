// const ServiceCat = require("../models/serviceCatModel");
// const path = require("path");
// const fs = require("fs");

// const serviceCatController = {
//   getAll: async (req, res) => {
//     try {
//       const data = await ServiceCat.getAll();
//       res.json(data);
//     } catch (err) {
//       console.error("getAll error:", err);
//       res.status(500).json({ message: "Server error" });
//     }
//   },

//   getById: async (req, res) => {
//     try {
//       const data = await ServiceCat.getById(req.params.id);
//       if (!data) return res.status(404).json({ message: "Service category not found" });
//       res.json(data);
//     } catch (err) {
//       console.error("getById error:", err);
//       res.status(500).json({ message: "Server error" });
//     }
//   },

//   create: async (req, res) => {
//     try {
//       const { sr_name, sr_name_ar, sr_s_desc, status } = req.body;
//       let icon = null;

//       // ✅ If file uploaded, save its filename
//       if (req.file) {
//         icon = req.file.filename;
//       }

//       if (!sr_name || !sr_name_ar)
//         return res.status(400).json({ message: "Required fields missing" });

//       const id = await ServiceCat.create({
//         sr_name,
//         sr_name_ar,
//         sr_s_desc,
//         icon,
//         status,
//       });

//       res.status(201).json({ message: "Category created successfully", id });
//     } catch (err) {
//       console.error("create error:", err);
//       res.status(500).json({ message: err.message || "Server error" });
//     }
//   },

//   update: async (req, res) => {
//   try {
//     const { sr_name, sr_name_ar, sr_s_desc, status } = req.body;
//     let icon = null;

//     // ✅ Only set new icon if uploaded
//     if (req.file) {
//       icon = req.file.filename;
//     }

//     // ✅ Fetch existing category to keep old image if not replaced
//     const existing = await ServiceCat.getById(req.params.id);
//     if (!existing) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     // ✅ Use old image if no new one
//     if (!icon) {
//       icon = existing.icon;
//     }

//     const affected = await ServiceCat.update(req.params.id, {
//       sr_name,
//       sr_name_ar,
//       sr_s_desc,
//       icon,
//       status,
//     });

//     if (!affected) return res.status(404).json({ message: "Category not found" });

//     res.json({ message: "Category updated successfully" });
//   } catch (err) {
//     console.error("update error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// },

//   delete: async (req, res) => {
//     try {
//       const affected = await ServiceCat.delete(req.params.id);
//       if (!affected) return res.status(404).json({ message: "Category not found" });
//       res.json({ message: "Category deleted successfully" });
//     } catch (err) {
//       console.error("delete error:", err);
//       res.status(500).json({ message: "Server error" });
//     }
//   },
// };

// module.exports = serviceCatController
















const db = require("../config/db");
const ServiceCat = require("../models/serviceCatModel");
const path = require("path");
const fs = require("fs");

const serviceCatController = {
  // ✅ Get all service categories
  getAll: async (req, res) => {
    try {
      const data = await ServiceCat.getAll();
      res.json(data);
    } catch (err) {
      console.error("getAll error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  // ✅ Get one category by ID
  getById: async (req, res) => {
    try {
      const data = await ServiceCat.getById(req.params.id);
      if (!data) return res.status(404).json({ message: "Service category not found" });
      res.json(data);
    } catch (err) {
      console.error("getById error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  // ✅ Create category
  create: async (req, res) => {
    try {
      const { sr_name, sr_name_ar, sr_s_desc, status } = req.body;
      let icon = null;

      if (req.file) {
        icon = req.file.filename;
      }

      if (!sr_name || !sr_name_ar)
        return res.status(400).json({ message: "Required fields missing" });

      const id = await ServiceCat.create({
        sr_name,
        sr_name_ar,
        sr_s_desc,
        icon,
        status,
      });

      res.status(201).json({ message: "Category created successfully", id });
    } catch (err) {
      console.error("create error:", err);
      res.status(500).json({ message: err.message || "Server error" });
    }
  },

  // ✅ Update category
  update: async (req, res) => {
    try {
      const { sr_name, sr_name_ar, sr_s_desc, status } = req.body;
      let icon = null;

      if (req.file) {
        icon = req.file.filename;
      }

      const existing = await ServiceCat.getById(req.params.id);
      if (!existing) {
        return res.status(404).json({ message: "Category not found" });
      }

      if (!icon) {
        icon = existing.icon;
      }

      const affected = await ServiceCat.update(req.params.id, {
        sr_name,
        sr_name_ar,
        sr_s_desc,
        icon,
        status,
      });

      if (!affected) return res.status(404).json({ message: "Category not found" });

      res.json({ message: "Category updated successfully" });
    } catch (err) {
      console.error("update error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  // ✅ Delete category
  delete: async (req, res) => {
    try {
      const affected = await ServiceCat.delete(req.params.id);
      if (!affected) return res.status(404).json({ message: "Category not found" });
      res.json({ message: "Category deleted successfully" });
    } catch (err) {
      console.error("delete error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

  // ✅ Get organizations by category
  // getOrganizationsByCategory: async (req, res) => {
  //   const { sc_id } = req.params;

  //   try {
  //     const [rows] = await db.query(
  //       `
  //       SELECT DISTINCT 
  //         o.id AS org_id,
  //         o.name AS org_name,
  //         o.email,
  //         o.phone_no,
  //         o.address,
  //         o.city,
  //         o.country,
  //         o.type,
  //         o.status
  //       FROM org_services os
  //       INNER JOIN organization o ON os.orgid = o.id
  //       WHERE os.sc_id = ?
  //       `,
  //       [sc_id]
  //     );

  //     if (rows.length === 0) {
  //       return res.status(404).json({ message: "No organizations found for this category" });
  //     }

  //     res.json(rows);
  //   } catch (err) {
  //     console.error("Error fetching organizations by category:", err);
  //     res.status(500).json({ message: "Server error", details: err.message });
  //   }
  // },



  getOrganizationsByCategory: async (req, res) => {
  const { sc_id } = req.params;

  try {
    // fetch entire organization rows
    const [rows] = await db.query(
      `
      SELECT DISTINCT
        o.* 
      FROM org_services os
      INNER JOIN organization o ON os.orgid = o.id
      WHERE os.sc_id = ?
      `,
      [sc_id]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "No organizations found for this category" });
    }

    // remove any password-like fields before sending
    const cleanRows = rows.map((row) => {
      const copy = { ...row };
      // common possible password column names
      delete copy.password;
      delete copy.pwd;
      delete copy.pass;
      // if your password column has another name, add it here
      return copy;
    });

    res.json(cleanRows);
  } catch (err) {
    console.error("Error fetching organizations by category:", err);
    res.status(500).json({ message: "Server error", details: err.message });
  }
},


};

module.exports = serviceCatController;





























