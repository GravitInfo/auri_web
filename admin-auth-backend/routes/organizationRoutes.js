const express = require("express");
const router = express.Router();
const organizationController = require("../controllers/organizationController");
const multer = require("multer");
const path = require("path");

// ======================================
// ✅ Multer setup for Organization Image
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/organization'),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });


// ======================================
// ✅ Routes
// ======================================
router.get("/", organizationController.getAll);
router.get("/:id", organizationController.getById);

// 🔥 Upload organization image (same as serviceCat style)
router.post("/", upload.single("image"), organizationController.create);
router.put("/:id", upload.single("image"), organizationController.update);

router.delete("/:id", organizationController.delete);

module.exports = router;
