const BookingMaster = require("../models/bookingMasterModel");

// ✅ Get all bookings
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await BookingMaster.getAll();
    res.json(bookings);
  } catch (err) {
    console.error("❌ Error fetching bookings:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Get booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await BookingMaster.getById(id);

    if (!booking) return res.status(404).json({ error: "Booking not found" });

    res.json(booking);
  } catch (err) {
    console.error("❌ Error fetching booking:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Add new booking
exports.addBooking = async (req, res) => {
  try {
    const { user_id, date_of_pur, amt } = req.body;

    if (!user_id || !amt) {
      return res.status(400).json({ error: "user_id and amt are required" });
    }

    const result = await BookingMaster.create({ user_id, date_of_pur, amt });

    res.status(201).json({
      message: "Booking created successfully",
      booking_id: result.insertId,
    });
  } catch (err) {
    console.error("❌ Error creating booking:", err);
    res.status(500).json({ error: "Failed to create booking" });
  }
};

// ✅ Delete booking
exports.deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await BookingMaster.delete(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.json({ message: "Booking deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting booking:", err);
    res.status(500).json({ error: "Failed to delete booking" });
  }
};
