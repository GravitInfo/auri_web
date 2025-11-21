const express = require("express");
const router = express.Router();
const bookingDetailsController = require("../controllers/bookingDetailsController");

// --- STATIC ROUTES FIRST ---
router.get("/", bookingDetailsController.getAllBookingDetails);
router.get("/by-booking/:booking_id", bookingDetailsController.getByBookingId);
router.get("/org/:orgId", bookingDetailsController.getBookingsByOrganization);

// ✅ Customer booking route (MUST be above /:id)
router.get("/customer/:userId", bookingDetailsController.getByCustomer);

// --- DYNAMIC ROUTES AT BOTTOM ---
router.get("/:id", bookingDetailsController.getBookingDetailsById);
router.post("/", bookingDetailsController.addBookingDetail);
router.delete("/:id", bookingDetailsController.deleteBookingDetail);

module.exports = router;
