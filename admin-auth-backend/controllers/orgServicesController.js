const OrgServices = require("../models/orgServicesModel");

//  Helper to calculate duration from timing
const calculateDuration = (from, to) => {
  if (!from || !to) return null;
  const [fromH, fromM] = from.split(":").map(Number);
  const [toH, toM] = to.split(":").map(Number);
  let hours = toH - fromH;
  let minutes = toM - fromM;

  if (minutes < 0) {
    hours -= 1;
    minutes += 60;
  }

  return `${hours}h ${minutes}m`;
};

const orgServicesController = {
  //  Get all services for an organization
  getAllByOrg: async (req, res) => {
    try {
      const data = await OrgServices.getAllByOrg(req.params.orgid);
      res.json(data);
    } catch (err) {
      console.error(" getAllByOrg error:", err);
      res.status(500).json({ message: "Server error", details: err.message });
    }
  },

  //  Create service
  create: async (req, res) => {
    try {
      let duration = req.body.duration || null;

      //  Auto-calculate duration if timing is provided
      if (req.body.timing_from && req.body.timing_to) {
        duration = calculateDuration(req.body.timing_from, req.body.timing_to);
      }

      const data = {
        ...req.body,
        duration,                       
        icon: req.file ? req.file.filename : null, 
      };

      const id = await OrgServices.create(data);
      res.status(201).json({ message: "Service created successfully", id });
    } catch (err) {
      console.error(" create error:", err);
      res.status(500).json({ message: "Server error", details: err.message });
    }
  },

  // 🔹 Update service
  update: async (req, res) => {
    try {
      let duration = req.body.duration || null;

      //  Auto-calculate duration if timing is provided
      if (req.body.timing_from && req.body.timing_to) {
        duration = calculateDuration(req.body.timing_from, req.body.timing_to);
      }

      const data = {
        ...req.body,
        duration,                       // auto-calculated or manual
        icon: req.file ? req.file.filename : req.body.icon || null, // keep existing if no new file
      };

      const affected = await OrgServices.update(req.params.id, data);
      if (!affected)
        return res.status(404).json({ message: "Service not found" });

      res.json({ message: "Service updated successfully" });
    } catch (err) {
      console.error(" update error:", err);
      res.status(500).json({ message: "Server error", details: err.message });
    }
  },

  //  Delete service
  delete: async (req, res) => {
    try {
      const affected = await OrgServices.delete(req.params.id);
      if (!affected) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json({ message: "Service deleted successfully" });
    } catch (err) {
      console.error("delete error:", err);
      res.status(500).json({ message: "Server error", details: err.message });
    }
  },
};

module.exports = orgServicesController;
