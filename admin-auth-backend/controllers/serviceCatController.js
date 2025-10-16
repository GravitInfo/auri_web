const ServiceCat = require("../models/serviceCatModel");

const serviceCatController = {
  getAll: async (req, res) => {
    try {
      const data = await ServiceCat.getAll();
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
  getById: async (req, res) => {
    try {
      const data = await ServiceCat.getById(req.params.id);
      if (!data) return res.status(404).json({ message: "Service category not found" });
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
  create: async (req, res) => {
    try {
      const id = await ServiceCat.create(req.body);
      res.status(201).json({ message: "Category created", id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
  update: async (req, res) => {
    try {
      const affected = await ServiceCat.update(req.params.id, req.body);
      if (!affected) return res.status(404).json({ message: "Category not found" });
      res.json({ message: "Category updated" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  },
  delete: async (req, res) => {
    try {
      const affected = await ServiceCat.delete(req.params.id);
      if (!affected) return res.status(404).json({ message: "Category not found" });
      res.json({ message: "Category deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  }
};

module.exports = serviceCatController;
