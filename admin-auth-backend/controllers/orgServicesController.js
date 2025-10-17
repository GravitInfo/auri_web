const OrgServices = require("../models/orgServicesModel");

const orgServicesController = {
  // 🔹 Get all services for an organization
  getAllByOrg: async (req, res) => {
    try {
      const data = await OrgServices.getAllByOrg(req.params.orgid);
      res.json(data);
    } catch (err) {
      console.error("❌ getAllByOrg error:", err);
      res.status(500).json({ message: "Server error", details: err.message });
    }
  },

  // 🔹 Create service
  create: async (req, res) => {
    try {
      const id = await OrgServices.create(req.body);
      res.status(201).json({ message: "Service created successfully", id });
    } catch (err) {
      console.error("❌ create error:", err);
      res.status(500).json({ message: "Server error", details: err.message });
    }
  },

  // 🔹 Update service
  update: async (req, res) => {
    try {
      const affected = await OrgServices.update(req.params.id, req.body);
      if (!affected) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json({ message: "Service updated successfully" });
    } catch (err) {
      console.error("❌ update error:", err);
      res.status(500).json({ message: "Server error", details: err.message });
    }
  },

  // 🔹 Delete service
  delete: async (req, res) => {
    try {
      const affected = await OrgServices.delete(req.params.id);
      if (!affected) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json({ message: "Service deleted successfully" });
    } catch (err) {
      console.error("❌ delete error:", err);
      res.status(500).json({ message: "Server error", details: err.message });
    }
  },
};

module.exports = orgServicesController;
