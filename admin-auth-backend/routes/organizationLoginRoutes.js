const express = require("express");
const router = express.Router();
const { loginOrganization } = require("../controllers/organizationLoginController");

// POST /api/organization/login
router.post("/login", loginOrganization);

module.exports = router;
