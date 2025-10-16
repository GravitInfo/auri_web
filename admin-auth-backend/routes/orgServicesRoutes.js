const express = require("express");
const router = express.Router();
const orgServicesController = require("../controllers/orgServicesController");

// Get all services for an organization
router.get("/org/:orgid", orgServicesController.getAllByOrg);

router.post("/", orgServicesController.create);
router.put("/:id", orgServicesController.update);
router.delete("/:id", orgServicesController.delete);

module.exports = router;
