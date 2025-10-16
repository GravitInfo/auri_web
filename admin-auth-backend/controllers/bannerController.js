const Banner = require('../models/bannerModel');

exports.getAllBanners = async (req, res) => {
  try {
    const [rows] = await Banner.getAll();
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBannerById = async (req, res) => {
  try {
    const [rows] = await Banner.getById(req.params.id);
    if (rows.length === 0) return res.status(404).json({ message: 'Banner not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new banner
exports.createBanner = async (req, res) => {
  try {
    // console.log("✅ Incoming Banner Data:", req.body);
    // console.log("✅ Uploaded File:", req.file);

    const data = req.body;
    if (req.file) data.pic = req.file.filename;

    const [result] = await Banner.create(data);
    res.status(201).json({ message: 'Banner created', id: result.insertId });
  } catch (err) {
    //console.error("❌ Error in createBanner:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) data.pic = req.file.filename;
    const [result] = await Banner.update(req.params.id, data);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Banner not found' });
    res.json({ message: 'Banner updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const [result] = await Banner.delete(req.params.id);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Banner not found' });
    res.json({ message: 'Banner deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
