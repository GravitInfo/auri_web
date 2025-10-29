const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const orgServicesController = require("../controllers/orgServicesController");

// Multer storage

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/icons")); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});


const upload = multer({ storage });

// Create service (with optional icon)
router.post("/", upload.single("icon"), orgServicesController.create);

// Update service (with optional icon)
router.put("/:id", upload.single("icon"), orgServicesController.update);

// Other routes
router.get("/org/:orgid", orgServicesController.getAllByOrg);
router.delete("/:id", orgServicesController.delete);

module.exports = router;
