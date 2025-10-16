const Organization = require("../models/organizationModel");

const organizationController = {
  // 🔹 Get all organizations
  getAll: async (req, res) => {
    try {
      const data = await Organization.getAll();
      res.json(data);
    } catch (err) {
      console.error("❌ getAll error:", err);
      res.status(500).json({ message: "Server error", details: err.message });
    }
  },

  // 🔹 Get single organization (with pics, services, providers)
  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await Organization.getFullDetailsById(id);

      if (!data) {
        return res.status(404).json({ message: "Organization not found" });
      }

      res.json(data);
    } catch (err) {
      console.error("❌ getById error:", err);
      res.status(500).json({ message: "Server error", details: err.message });
    }
  },

  // 🔹 Create organization
  create: async (req, res) => {
    try {
      const id = await Organization.create(req.body);
      res.status(201).json({ message: "Organization created successfully", id });
    } catch (err) {
      console.error("❌ create error:", err);
      res.status(500).json({ message: "Server error", details: err.message });
    }
  },

  // 🔹 Update organization
  update: async (req, res) => {
    try {
      const affected = await Organization.update(req.params.id, req.body);
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
      if (!affected) {
        return res.status(404).json({ message: "Organization not found" });
      }
      res.json({ message: "Organization deleted successfully" });
    } catch (err) {
      console.error("❌ delete error:", err);
      res.status(500).json({ message: "Server error", details: err.message });
    }
  },
};

module.exports = organizationController;
