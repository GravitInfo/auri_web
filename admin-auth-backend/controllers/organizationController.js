const bcrypt = require("bcrypt");
const Organization = require("../models/organizationModel");

const OrganizationController = {
  // 🔹 Get all organizations with avg rating and review count
  getAll: async (req, res) => {
    try {
      const data = await Organization.getAllWithReviews(); // ✅ use the method with LEFT JOIN
      res.json(data);
    } catch (err) {
      console.error("❌ getAll error:", err);
      res.status(500).json({ message: "Server error", details: err.message });
    }
  },

  // 🔹 Get single organization by ID (with pics, services, providers, reviews)
  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await Organization.getFullDetailsById(id);

      if (!data) {
        return res.status(404).json({ message: "Organization not found" });
      }

      res.json(data); // ✅ now includes formatted reviews + avg_rating + review_count
    } catch (err) {
      console.error("❌ getById error:", err);
      res.status(500).json({ message: "Server error", details: err.message });
    }
  },

  // 🔹 Create organization
  create: async (req, res) => {
    try {
      const orgData = { ...req.body };

      if (req.file) orgData.image = "uploads/organization/" + req.file.filename;

      if (orgData.password) {
        const saltRounds = 10;
        orgData.password = await bcrypt.hash(orgData.password, saltRounds);
      }

      const id = await Organization.create(orgData);
      const newOrg = await Organization.getById(id);

      res.status(201).json({
        message: "Organization created successfully",
        organization: newOrg,
      });
    } catch (err) {
      console.error("❌ create error:", err);
      res.status(500).json({ message: "Server error", details: err.message });
    }
  },

  // 🔹 Update organization
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const orgData = { ...req.body };

      if (req.file) orgData.image = "uploads/organization/" + req.file.filename;

      if (orgData.password && orgData.password.trim() !== "") {
        const saltRounds = 10;
        orgData.password = await bcrypt.hash(orgData.password, saltRounds);
      } else {
        delete orgData.password;
      }

      const affected = await Organization.update(id, orgData);

      if (!affected) {
        return res.status(404).json({ message: "Organization not found" });
      }

      res.json({ message: "Organization updated successfully" });
    } catch (err) {
      console.error("❌ update error:", err);
      res.status(500).json({ message: "Server error", details: err.message });
    }
  },

  // 🔹 Delete organization
  delete: async (req, res) => {
    try {
      const affected = await Organization.delete(req.params.id);
      if (!affected) return res.status(404).json({ message: "Organization not found" });

      res.json({ message: "Organization deleted successfully" });
    } catch (err) {
      console.error("❌ delete error:", err);
      res.status(500).json({ message: "Server error", details: err.message });
    }
  },
};

module.exports = OrganizationController;
