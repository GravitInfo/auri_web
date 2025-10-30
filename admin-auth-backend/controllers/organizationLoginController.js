const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Organization = require("../models/organizationLoginModel");

const JWT_SECRET = "your_secret_key"; // ✅ ideally use process.env.JWT_SECRET

const loginOrganization = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔍 Check if organization exists
    const org = await Organization.findByEmail(email);
    if (!org) {
      return res.status(404).json({ message: "Organization not found" });
    }

    // 🔑 Compare password
    const isMatch = await bcrypt.compare(password, org.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // 🎟️ Generate JWT token
    const token = jwt.sign(
      { id: org.id, email: org.email },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ Return full organization data
    res.status(200).json({
      message: "Login successful",
      token,
      organization: {
        id: org.id,
        name: org.name,
        email: org.email,
        type: org.type,
        address: org.address,
        city: org.city,
        pincode: org.pincode,
        country: org.country,
        phone_no: org.phone_no,
        longitude: org.longitude,
        latitude: org.latitude,
        about: org.about,
        status: org.status,
        created_dttime: org.created_dttime,
      },
    });
  } catch (err) {
    console.error("Error in loginOrganization:", err);
    res.status(500).json({ message: "Server error", details: err.message });
  }
};

module.exports = { loginOrganization };
