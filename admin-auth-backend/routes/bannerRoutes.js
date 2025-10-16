const express = require('express');
const router = express.Router();
const bannerController = require('../controllers/bannerController');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Ensure uploads/banners directory exists
const uploadPath = path.join(__dirname, '../uploads/banners');
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
router.get('/', bannerController.getAllBanners);
router.get('/:id', bannerController.getBannerById);
router.post('/', upload.single('pic'), bannerController.createBanner);
router.put('/:id', upload.single('pic'), bannerController.updateBanner);
router.delete('/:id', bannerController.deleteBanner);

module.exports = router;
