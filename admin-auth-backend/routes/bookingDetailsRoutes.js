const express = require("express");
const router = express.Router();
const bookingDetailsController = require("../controllers/bookingDetailsController");

router.get("/", bookingDetailsController.getAllBookingDetails);        // GET all
router.get("/:id", bookingDetailsController.getBookingDetailById);    // GET one by ID
router.get("/by-booking/:booking_id", bookingDetailsController.getByBookingId); // GET all by booking_id
router.post("/", bookingDetailsController.addBookingDetail);          // POST create
router.delete("/:id", bookingDetailsController.deleteBookingDetail);  // DELETE one

module.exports = router;
