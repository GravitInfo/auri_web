// const ServiceCat = require("../models/serviceCatModel");

// const serviceCatController = {
//   getAll: async (req, res) => {
//     try {
//       const data = await ServiceCat.getAll();
//       res.json(data);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Server error" });
//     }
//   },
//   getById: async (req, res) => {
//     try {
//       const data = await ServiceCat.getById(req.params.id);
//       if (!data) return res.status(404).json({ message: "Service category not found" });
//       res.json(data);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Server error" });
//     }
//   },
//   create: async (req, res) => {
//     try {
//       const id = await ServiceCat.create(req.body);
//       res.status(201).json({ message: "Category created", id });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Server error" });
//     }
//   },
//   update: async (req, res) => {
//     try {
//       const affected = await ServiceCat.update(req.params.id, req.body);
//       if (!affected) return res.status(404).json({ message: "Category not found" });
//       res.json({ message: "Category updated" });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Server error" });
//     }
//   },
//   delete: async (req, res) => {
//     try {
//       const affected = await ServiceCat.delete(req.params.id);
//       if (!affected) return res.status(404).json({ message: "Category not found" });
//       res.json({ message: "Category deleted" });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Server error" });
//     }
//   }
// };

// module.exports = serviceCatController;




const ServiceCat = require("../models/serviceCatModel");
const path = require("path");
const fs = require("fs");

const serviceCatController = {
  getAll: async (req, res) => {
    try {
      const data = await ServiceCat.getAll();
      res.json(data);
    } catch (err) {
      console.error("getAll error:", err);
      res.status(500).json({ message: "Server error" });
    }
  },

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

  create: async (req, res) => {
    try {
      const { sr_name, sr_name_ar, sr_s_desc, status } = req.body;
      let icon = null;

      // ✅ If file uploaded, save its filename
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

  // update: async (req, res) => {
  //   try {
  //     const { sr_name, sr_name_ar, sr_s_desc, status } = req.body;
  //     let icon = req.body.icon;

  //     if (req.file) {
  //       icon = req.file.filename;
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

  update: async (req, res) => {
  try {
    const { sr_name, sr_name_ar, sr_s_desc, status } = req.body;
    let icon = null;

    // ✅ Only set new icon if uploaded
    if (req.file) {
      icon = req.file.filename;
    }

    // ✅ Fetch existing category to keep old image if not replaced
    const existing = await ServiceCat.getById(req.params.id);
    if (!existing) {
      return res.status(404).json({ message: "Category not found" });
    }

    // ✅ Use old image if no new one
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
};

module.exports = serviceCatController;

