const ServiceProviders = require("../models/serviceProvidersModel");

const serviceProvidersController = {
  getAllByOrg: async (req, res) => {
    try {
      const data = await ServiceProviders.getAllByOrg(req.params.orgid);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
//   create: async (req, res) => {
//     try {
//       const id = await ServiceProviders.create(req.body);
//       res.status(201).json({ message: "Provider added", id });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Server error" });
//     }
//   },
//   update: async (req, res) => {
//     try {
//       const affected = await ServiceProviders.update(req.params.id, req.body);
//       if (!affected) return res.status(404).json({ message: "Provider not found" });
//       res.json({ message: "Provider updated" });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Server error" });
//     }
//   },
//   delete: async (req, res) => {
//     try {
//       const affected = await ServiceProviders.delete(req.params.id);
//       if (!affected) return res.status(404).json({ message: "Provider not found" });
//       res.json({ message: "Provider deleted" });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Server error" });
//     }
//   }
// };

// module.exports = serviceProvidersController;
 create: async (req, res) => {
    try {
      const data = { ...req.body };
      if (req.file) data.pic = req.file.filename; // ✅ handle uploaded file
      const id = await ServiceProviders.create(data);
      res.status(201).json({ message: "Provider added", id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  update: async (req, res) => {
    try {
      const data = { ...req.body };
      if (req.file) data.pic = req.file.filename; // ✅ update picture if new uploaded
      const affected = await ServiceProviders.update(req.params.id, data);
      if (!affected) return res.status(404).json({ message: "Provider not found" });
      res.json({ message: "Provider updated" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },

  delete: async (req, res) => {
    try {
      const affected = await ServiceProviders.delete(req.params.id);
      if (!affected) return res.status(404).json({ message: "Provider not found" });
      res.json({ message: "Provider deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
};

module.exports = serviceProvidersController;
