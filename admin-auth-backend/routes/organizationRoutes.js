const express = require("express");
const router = express.Router();
const organizationController = require("../controllers/organizationController");
const multer = require("multer");
const path = require("path");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/organization'),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// MAIN ROUTES
router.get("/", organizationController.getAll);
router.get("/:id", organizationController.getById);

// IMAGE UPLOAD ROUTES
router.post("/", upload.single("image"), organizationController.create);
router.put("/:id", upload.single("image"), organizationController.update);

// --- CUSTOMER & BOOKING APIs ---
router.get("/:orgId/customers", organizationController.getAllCustomers);
router.get("/:orgId/customers/:userId/bookings", organizationController.getCustomerBookings);

router.delete("/:id", organizationController.delete);

module.exports = router;
