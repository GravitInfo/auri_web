// const express = require("express");
// const router = express.Router();
// const organizationPicsController = require("../controllers/organizationPicsController");
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // ===== Create uploads folder if not exists =====
// const uploadDir = path.join(__dirname, "../uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// // ===== Multer setup =====
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDir);
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       Date.now() + "-" + file.fieldname + path.extname(file.originalname)
//     );
//   },
// });
// const upload = multer({ storage });

// // ===== Routes =====
// router.get("/", organizationPicsController.getAll);
// router.get("/org/:orgid", organizationPicsController.getByOrgId);
// router.post(
//   "/upload/:orgid",
//   upload.array("images", 10),
//   organizationPicsController.uploadPics
// );
// router.delete("/:id", organizationPicsController.deletePic);

// module.exports = router


const express = require("express");
const router = express.Router();
const organizationPicsController = require("../controllers/organizationPicsController");
const multer = require("multer");
const path = require("path");
const fs = require("fs");


// ===== Create uploads/orgs folder if not exists =====
const uploadDir = path.join(__dirname, "../uploads/orgs");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// ===== Multer setup =====
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); // ✅ Save all pics to uploads/orgs
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });


// ===== Routes =====
router.get("/", organizationPicsController.getAll);
router.get("/org/:orgid", organizationPicsController.getByOrgId);
router.post(
  "/upload/:orgid",
  upload.array("images", 10),
  organizationPicsController.uploadPics
);
router.put("/:id", upload.array("images", 10), organizationPicsController.updatePic);

router.delete("/:id", organizationPicsController.deletePic);

module.exports = router