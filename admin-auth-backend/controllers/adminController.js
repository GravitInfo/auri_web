const Admin = require("../models/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password, phone, address, city, pincode } = req.body;

    console.log("➡️ Register request:", req.body); // 👈 log body

    if (!name || !email || !password || !city || !pincode) {
      return res.status(400).json({ error: "Please fill all required fields" });
    }

    const existing = await Admin.findByEmail(email);
    console.log("Existing admin:", existing); // 👈 log DB result

    if (existing.length > 0) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashedPassword);

    const result = await Admin.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      city,
      pincode,
    });

    console.log("Insert result:", result);

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    console.error("❌ Register error:", err); // 👈 log actual error
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admins = await Admin.findByEmail(email);

    if (admins.length === 0) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const admin = admins[0];
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { register, login };
