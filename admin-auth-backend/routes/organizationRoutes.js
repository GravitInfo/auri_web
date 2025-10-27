// const express = require("express");
// const router = express.Router();
// const organizationController = require("../controllers/organizationController");

// // Get all organizations
// router.get("/", organizationController.getAll);

// // Get full organization details (with pics, services, providers)
// router.get("/:id", organizationController.getById);

// // Create new organization
// router.post("/", organizationController.create);

// // Update organization
// router.put("/:id", organizationController.update);

// // Delete organization
// router.delete("/:id", organizationController.delete);

// module.exports = router;



const express = require("express");
const router = express.Router();
const organizationController = require("../controllers/organizationController");

router.get("/", organizationController.getAll);
router.get("/:id", organizationController.getById);
router.post("/", organizationController.create);
router.put("/:id", organizationController.update);
router.delete("/:id", organizationController.delete);

module.exports = router;

