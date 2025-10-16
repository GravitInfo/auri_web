const OrgServices = require("../models/orgServicesModel");

const orgServicesController = {
  getAllByOrg: async (req, res) => {
    try {
      const data = await OrgServices.getAllByOrg(req.params.orgid);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
  create: async (req, res) => {
    try {
      const id = await OrgServices.create(req.body);
      res.status(201).json({ message: "Service added", id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
  update: async (req, res) => {
    try {
      const affected = await OrgServices.update(req.params.id, req.body);
      if (!affected) return res.status(404).json({ message: "Service not found" });
      res.json({ message: "Service updated" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
  delete: async (req, res) => {
    try {
      const affected = await OrgServices.delete(req.params.id);
      if (!affected) return res.status(404).json({ message: "Service not found" });
      res.json({ message: "Service deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
};

module.exports = orgServicesController;
