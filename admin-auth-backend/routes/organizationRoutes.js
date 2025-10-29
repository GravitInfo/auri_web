const express = require("express");
const router = express.Router();
const organizationController = require("../controllers/organizationController");

router.get("/", organizationController.getAll);
router.get("/:id", organizationController.getById);
router.post("/", organizationController.create);
router.put("/:id", organizationController.update);
router.delete("/:id", organizationController.delete);

module.exports = router;

