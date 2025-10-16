const express = require("express");
const router = express.Router();
const serviceProvidersController = require("../controllers/serviceProvidersController");

// Get all providers for an organization
router.get("/org/:orgid", serviceProvidersController.getAllByOrg);

router.post("/", serviceProvidersController.create);
router.put("/:id", serviceProvidersController.update);
router.delete("/:id", serviceProvidersController.delete);

module.exports = router;
