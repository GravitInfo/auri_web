const Users = require("../models/usersModel");

// Temporary in-memory OTP store
const otpStore = {};  // { email: { otp: 123456, expires: Date } }

// Generate random 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

// Send OTP
const sendOtp = (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const otp = generateOTP();
  const expires = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
  otpStore[email] = { otp, expires };

  console.log(`OTP for ${email} is ${otp}`); // For testing; replace with email service

  res.json({ message: "OTP sent to email" });
};

// Verify OTP
const verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  if (!otpStore[email]) return res.status(400).json({ message: "No OTP sent" });

  const { otp: storedOtp, expires } = otpStore[email];
  if (Date.now() > expires) {
    delete otpStore[email];
    return res.status(400).json({ message: "OTP expired" });
  }

  if (parseInt(otp) !== storedOtp)
    return res.status(400).json({ message: "Invalid OTP" });

  delete otpStore[email];
  res.json({ message: "OTP verified successfully" });
};

// Register new user
const registerUser = async (req, res) => {
  try {
    const { user_email, u_name, u_mobile, profile_pic, address, city, zip } = req.body;

    const existingUser = await Users.findByEmail(user_email);
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const userId = await Users.create({
      user_email,
      u_name,
      u_mobile,
      profile_pic,
      address,
      city,
      zip,
    });

    res.json({ message: "User registered successfully", userId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Login user by email
const loginUser = async (req, res) => {
  try {
    const { user_email } = req.body;
    if (!user_email) return res.status(400).json({ message: "Email is required" });

    const user = await Users.findByEmail(user_email);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Login successful", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  sendOtp,
  verifyOtp,
  registerUser,
  loginUser,
};
