const express = require("express");
const router = express.Router();
const serviceCatController = require("../controllers/serviceCatController");
const multer = require("multer");
const path = require("path");

// ===== Multer setup for icon upload =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/icons"));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname.replace(/\s+/g, "_");
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ===== Routes =====
router.get("/", serviceCatController.getAll);
router.get("/:id", serviceCatController.getById);
router.post("/", upload.single("icon"), serviceCatController.create);
router.put("/:id", upload.single("icon"), serviceCatController.update);
router.delete("/:id", serviceCatController.delete);

module.exports = router;
