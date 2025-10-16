const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/adminController");

// Register admin
router.post("/register", register);

// Login admin
router.post("/login", login);

module.exports = router;
