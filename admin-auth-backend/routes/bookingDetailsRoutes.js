const express = require("express");
const router = express.Router();
const bookingDetailsController = require("../controllers/bookingDetailsController");

router.get("/", bookingDetailsController.getAllBookingDetails);
router.get("/by-booking/:booking_id", bookingDetailsController.getByBookingId);

// ✅ Must come BEFORE /:id
router.get("/org/:orgId", bookingDetailsController.getBookingsByOrganization);

// Dynamic route at the end
router.get("/:id", bookingDetailsController.getBookingDetailsById);

router.post("/", bookingDetailsController.addBookingDetail);
router.delete("/:id", bookingDetailsController.deleteBookingDetail);

module.exports = router;

