// const Users = require("../models/usersModel");
// const sendEmail = require("../utils/sendEmail");

// const otpStore = {};
// const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

// // ✅ Send OTP to user's email (console only)
// const sendOtp = async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) return res.status(400).json({ message: "Email is required" });

//     // Generate and store OTP
//     const otp = generateOTP();
//     const expires = Date.now() + 5 * 60 * 1000; // valid for 5 minutes
//     otpStore[email] = { otp, expires };

//     // ✅ Send OTP email (this line actually sends the mail)
//     await sendEmail(email, "Your OTP Code", `Your OTP for login is ${otp}`);

//     // ✅ Success message
//     res.json({ message: "OTP sent to your email successfully" });
//   } catch (err) {
//     console.error("❌ Error in sendOtp:", err);
//     res.status(500).json({ message: "Failed to send OTP" });
//   }
// };

// // ✅ Verify OTP and login/register user
// const verifyOtp = async (req, res) => {
//   try {
//     const { email, otp } = req.body;
//     if (!otpStore[email]) return res.status(400).json({ message: "No OTP sent" });

//     const { otp: storedOtp, expires } = otpStore[email];

//     if (Date.now() > expires) {
//       delete otpStore[email];
//       return res.status(400).json({ message: "OTP expired" });
//     }

//     if (parseInt(otp) !== storedOtp)
//       return res.status(400).json({ message: "Invalid OTP" });

//     delete otpStore[email];

//     // ✅ Check if user exists, otherwise create new one
//     let user = await Users.findByEmail(email);
//     if (!user) {
//       const newUserId = await Users.create({
//         user_email: email,
//         u_name: "New User",
//         u_mobile: null,
//         profile_pic: null,
//         address: null,
//         city: null,
//         zip: null,
//       });
//       user = await Users.findByEmail(email);
//       console.log("🆕 New user registered:", newUserId);
//     }

//     res.json({
//       message: "OTP verified successfully",
//       user,
//     });
//   } catch (err) {
//     console.error("Error in verifyOtp:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ Manual user registration (optional)
// const registerUser = async (req, res) => {
//   try {
//     const { user_email, u_name, u_mobile, profile_pic, address, city, zip } = req.body;
//     const existingUser = await Users.findByEmail(user_email);
//     if (existingUser)
//       return res.status(400).json({ message: "User already exists" });

//     const userId = await Users.create({
//       user_email,
//       u_name,
//       u_mobile,
//       profile_pic,
//       address,
//       city,
//       zip,
//     });

//     res.json({ message: "User registered successfully", userId });
//   } catch (err) {
//     console.error("Error in registerUser:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // ✅ Manual login (email only)
// const loginUser = async (req, res) => {
//   try {
//     const { user_email } = req.body;
//     if (!user_email) return res.status(400).json({ message: "Email is required" });

//     const user = await Users.findByEmail(user_email);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     res.json({ message: "Login successful", user });
//   } catch (err) {
//     console.error("Error in loginUser:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports = {
//   sendOtp,
//   verifyOtp,
//   registerUser,
//   loginUser,
// };





























const Users = require("../models/usersModel");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcryptjs");

const otpStore = {}; // simple in-memory store: { email: { otp, expires } }
const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

// Helper: send OTP and store it
const sendOtpToEmail = async (email) => {
  const otp = generateOTP();
  const expires = Date.now() + 5 * 60 * 1000;
  otpStore[email] = { otp, expires };

  console.log("🆗 OTP generated for testing:", otp); // <-- Add this line

  await sendEmail(email, "Your OTP Code", `Your OTP is ${otp}. It is valid for 5 minutes.`);
  return otp;
};

// ----------------- Register (collect info + password, create inactive user, send otp) -----------------
const registerUser = async (req, res) => {
  try {
    const { user_email, u_name, u_mobile, profile_pic, address, city, zip, password } = req.body;

    if (!user_email || !password) return res.status(400).json({ message: "Email and password are required" });

    const existingUser = await Users.findByEmail(user_email);
    if (existingUser) {
      // if user exists but inactive you can resend OTP, else reject
      if (existingUser.status !== "active") {
        // resend OTP
        await sendOtpToEmail(user_email);
        return res.status(200).json({ message: "User already registered but not verified. OTP resent to email." });
      }
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with status 'inactive' (model sets it too)
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

    // Send OTP to email
    await sendOtpToEmail(user_email);

    res.json({ message: "Registered successfully. OTP sent to email for verification.", userId });
  } catch (err) {
    console.error("Error in registerUser:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ----------------- Verify OTP (activate account) -----------------
const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: "Email and OTP are required" });

    const record = otpStore[email];
    if (!record) return res.status(400).json({ message: "No OTP sent or OTP expired" });

    const { otp: storedOtp, expires } = record;

    if (Date.now() > expires) {
      delete otpStore[email];
      return res.status(400).json({ message: "OTP expired" });
    }

    if (parseInt(otp) !== storedOtp) return res.status(400).json({ message: "Invalid OTP" });

    // OTP valid -> activate user
    await Users.updateStatus(email, "active");
    delete otpStore[email];

    const user = await Users.findByEmail(email);
    res.json({ message: "OTP verified. Account activated.", user });
  } catch (err) {
    console.error("Error in verifyOtp:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ----------------- Login with email + password (only active users) -----------------
const loginUser = async (req, res) => {
  try {
    const { user_email, password } = req.body;
    if (!user_email || !password) return res.status(400).json({ message: "Email and password are required" });

    const user = await Users.findByEmail(user_email);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.status !== "active") return res.status(403).json({ message: "Account not verified. Please verify your email." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Success — return user object (avoid sending password field)
    const { password: pw, ...userSafe } = user;
    res.json({ message: "Login successful", user: userSafe });
  } catch (err) {
    console.error("Error in loginUser:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ----------------- Optional: Resend OTP (if user didn't get it) -----------------
const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await Users.findByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.status === "active") return res.status(400).json({ message: "User already verified" });

    await sendOtpToEmail(email);
    res.json({ message: "OTP resent to email" });
  } catch (err) {
    console.error("Error in resendOtp:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser,
  verifyOtp,
  loginUser,
  resendOtp,
};
