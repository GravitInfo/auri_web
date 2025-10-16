const express = require("express");
const router = express.Router();
const serviceCatController = require("../controllers/serviceCatController");

router.get("/", serviceCatController.getAll);
router.get("/:id", serviceCatController.getById);
router.post("/", serviceCatController.create);
router.put("/:id", serviceCatController.update);
router.delete("/:id", serviceCatController.delete);

module.exports = router;
