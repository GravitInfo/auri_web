const express = require("express");
const router = express.Router();
const orgServicesController = require("../controllers/orgServicesController");

// 🔹 Get all services by organization ID
router.get("/org/:orgid", orgServicesController.getAllByOrg);

// 🔹 Create new service
router.post("/", orgServicesController.create);

// 🔹 Update existing service
router.put("/:id", orgServicesController.update);

// 🔹 Delete service
router.delete("/:id", orgServicesController.delete);

module.exports = router;
