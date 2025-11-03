const BookingDetails = require("../models/bookingDetailsModel");

// ✅ Get all booking details
exports.getAllBookingDetails = async (req, res) => {
  try {
    const details = await BookingDetails.getAll();
    res.json(details);
  } catch (err) {
    console.error("❌ Error fetching booking details:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Get booking detail by booking_dt_id
exports.getBookingDetailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const rows = await BookingDetails.getById(id);

    if (!rows || rows.length === 0) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching booking details:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Get all booking details by booking_id
exports.getByBookingId = async (req, res) => {
  try {
    const { booking_id } = req.params;
    const details = await BookingDetails.getByBookingId(booking_id);

    if (!details || details.length === 0) {
      return res.status(404).json({ message: "No booking details found for this booking_id" });
    }

    res.json(details);
  } catch (err) {
    console.error("❌ Error fetching booking details by booking_id:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Get bookings by organization ID
exports.getBookingsByOrganization = async (req, res) => {
  try {
    const { orgId } = req.params;
    const details = await BookingDetails.getByOrganization(orgId);

    res.json(details);
  } catch (err) {
    console.error("❌ Error fetching bookings for organization:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ Add new booking detail
exports.addBookingDetail = async (req, res) => {
  try {
    const { booking_id, org_sid, p_date, p_time, sp_id } = req.body;

    if (!booking_id || !org_sid || !sp_id) {
      return res.status(400).json({ error: "booking_id, org_sid, and sp_id are required" });
    }

    const result = await BookingDetails.create({ booking_id, org_sid, p_date, p_time, sp_id });

    res.status(201).json({
      message: "Booking detail added successfully",
      booking_dt_id: result.insertId,
    });
  } catch (err) {
    console.error("❌ Error creating booking detail:", err);
    res.status(500).json({ error: "Failed to create booking detail" });
  }
};

// ✅ Delete booking detail
exports.deleteBookingDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await BookingDetails.delete(id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Booking detail not found" });
    }

    res.json({ message: "Booking detail deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting booking detail:", err);
    res.status(500).json({ error: "Failed to delete booking detail" });
  }
};
