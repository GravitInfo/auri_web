const bcrypt = require("bcrypt");
const Organization = require("../models/organizationModel");
const db = require("../config/db");

const OrganizationController = {

  // 🔹 GET ALL CUSTOMERS FOR THIS ORG
  getAllCustomers: async (req, res) => {
    try {
      const { orgId } = req.params;

      const sql = `
        SELECT DISTINCT 
          u.user_id,
          u.u_name,
          u.user_email,
          u.u_mobile,
          u.profile_pic
        FROM users u
        JOIN Booking_Master bm ON bm.user_id = u.user_id
        JOIN Booking_Details bd ON bd.booking_id = bm.booking_id
        WHERE bd.org_sid IN (
          SELECT org_sid FROM org_services WHERE orgid = ?
        )
        ORDER BY u.u_name
      `;

      const [rows] = await db.query(sql, [orgId]);

      res.json(rows);
    } catch (err) {
      console.error("❌ getAllCustomers error:", err);
      res.status(500).json({ message: "Server error", details: err.message });
    }
  },

  // 🔹 GET ALL BOOKINGS OF A SPECIFIC CUSTOMER FOR THIS ORG
  getCustomerBookings: async (req, res) => {
    try {
      const { orgId, userId } = req.params;

      const sql = `
        SELECT 
          bm.booking_id,
          bm.date_of_pur,
          bm.amt,

          bd.p_date,
          bd.p_time,
          bd.sp_id,

          s.service_name,
          sp.sp_name AS provider_name

        FROM Booking_Master bm
        JOIN Booking_Details bd ON bm.booking_id = bd.booking_id
        JOIN org_services s ON bd.org_sid = s.org_sid
        JOIN service_providers sp ON bd.sp_id = sp.sp_id

        WHERE s.orgid = ? AND bm.user_id = ?

        ORDER BY bd.p_date DESC, bd.p_time DESC
      `;

      const [rows] = await db.query(sql, [orgId, userId]);
      res.json(rows);
    } catch (err) {
      console.error("❌ getCustomerBookings error:", err);
      res.status(500).json({ message: "Server error", details: err.message });
    }
  },

  // ----- ALREADY EXISTING FUNCTIONS BELOW -----

  getAll: async (req, res) => {
    try {
      const data = await Organization.getAllWithReviews();
      res.json(data);
    } catch (err) {
      res.status(500).json({ message: "Server error", details: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await Organization.getFullDetailsById(id);
      if (!data) return res.status(404).json({ message: "Organization not found" });

      res.json(data);
    } catch (err) {
      res.status(500).json({ message: "Server error", details: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const orgData = { ...req.body };
      if (req.file) orgData.image = "uploads/organization/" + req.file.filename;

      if (orgData.password) {
        const saltRounds = 10;
        orgData.password = await bcrypt.hash(orgData.password, saltRounds);
      }

      const id = await Organization.create(orgData);
      const newOrg = await Organization.getById(id);

      res.status(201).json({
        message: "Organization created successfully",
        organization: newOrg,
      });
    } catch (err) {
      res.status(500).json({ message: "Server error", details: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const id = req.params.id;
      const orgData = { ...req.body };

      if (req.file) orgData.image = "uploads/organization/" + req.file.filename;

      if (orgData.password && orgData.password.trim() !== "") {
        orgData.password = await bcrypt.hash(orgData.password, 10);
      } else delete orgData.password;

      const affected = await Organization.update(id, orgData);
      if (!affected) return res.status(404).json({ message: "Organization not found" });

      res.json({ message: "Organization updated successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error", details: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const affected = await Organization.delete(req.params.id);
      if (!affected) return res.status(404).json({ message: "Organization not found" });

      res.json({ message: "Organization deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error", details: err.message });
    }
  },
};

module.exports = OrganizationController;
