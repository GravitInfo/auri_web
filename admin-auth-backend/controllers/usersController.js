const Users = require("../models/usersModel");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcryptjs");

// Simple in-memory OTP store
const otpStore = {}; // { email: { otp, expires } }
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

const sendOtpToEmail = async (email) => {
  const otp = generateOTP();
  const expires = Date.now() + 5 * 60 * 1000; // 5 min
  otpStore[email] = { otp, expires };
  console.log("🆗 OTP:", otp); // For testing

  await sendEmail(email, "Your OTP Code", `Your OTP is ${otp}. It is valid for 5 minutes.`);
  return otp;
};

// ---------------- Register ----------------
const registerUser = async (req, res) => {
  try {
    const { user_email, u_name, u_mobile, address, city, zip, password } = req.body;

    if (!user_email || !password) return res.status(400).json({ message: "Email and password required" });

    const existingUser = await Users.findByEmail(user_email);
    if (existingUser) {
      if (existingUser.status !== "active") {
        await sendOtpToEmail(user_email);
        return res.status(200).json({ message: "User not verified. OTP resent." });
      }
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Profile pic from multer
    let profile_pic = null;
    if (req.file) profile_pic = req.file.filename;

    const userId = await Users.create({
      user_email,
      u_name,
      u_mobile,
      profile_pic,
      address,
      city,
      zip,
      password: hashedPassword,
    });

    await sendOtpToEmail(user_email);

    res.json({ message: "Registered successfully. OTP sent.", userId });
  } catch (err) {
    console.error("registerUser error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Verify OTP ----------------
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: "Email and OTP required" });

    const record = otpStore[email];
    if (!record) return res.status(400).json({ message: "No OTP or expired" });

    const { otp: storedOtp, expires } = record;
    if (Date.now() > expires) {
      delete otpStore[email];
      return res.status(400).json({ message: "OTP expired" });
    }

    if (parseInt(otp) !== storedOtp) return res.status(400).json({ message: "Invalid OTP" });

    await Users.updateStatus(email, "active");
    delete otpStore[email];

    const user = await Users.findByEmail(email);
    res.json({ message: "OTP verified. Account activated.", user });
  } catch (err) {
    console.error("verifyOtp error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Login ----------------
const loginUser = async (req, res) => {
  try {
    const { user_email, password } = req.body;
    if (!user_email || !password) return res.status(400).json({ message: "Email and password required" });

    const user = await Users.findByEmail(user_email);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.status !== "active") return res.status(403).json({ message: "Account not verified" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const { password: pw, ...userSafe } = user;
    res.json({ message: "Login successful", user: userSafe });
  } catch (err) {
    console.error("loginUser error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Resend OTP ----------------
const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const user = await Users.findByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.status === "active") return res.status(400).json({ message: "User already verified" });

    await sendOtpToEmail(email);
    res.json({ message: "OTP resent to email" });
  } catch (err) {
    console.error("resendOtp error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.getAll();
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  verifyOtp,
  loginUser,
  resendOtp,
  getAllUsers,
  getUserById
};

