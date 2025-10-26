// const express = require("express");
// const router = express.Router();

// const serviceProvidersController = require("../controllers/serviceProvidersController");

// // Get all providers for an organization
// router.get("/org/:orgid", serviceProvidersController.getAllByOrg);
// router.post("/", serviceProvidersController.create);
// router.put("/:id", serviceProvidersController.update);
// router.delete("/:id", serviceProvidersController.delete);

// module.exports = router;

//   with multer
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const serviceProvidersController = require("../controllers/serviceProvidersController");

//  Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/providers"); 
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Routes
router.get("/org/:orgid", serviceProvidersController.getAllByOrg);
router.post("/", upload.single("pic"), serviceProvidersController.create);
router.put("/:id", upload.single("pic"), serviceProvidersController.update);
router.delete("/:id", serviceProvidersController.delete);

module.exports = router;
