const express = require("express");
const router = express.Router();
const bookingMasterController = require("../controllers/bookingMasterController");

router.get("/", bookingMasterController.getAllBookings);      // GET all
router.get("/:id", bookingMasterController.getBookingById);   // GET one by ID
router.post("/", bookingMasterController.addBooking);         // POST create
router.delete("/:id", bookingMasterController.deleteBooking); // DELETE one

module.exports = router;
