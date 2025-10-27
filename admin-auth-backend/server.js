// const express = require("express");
// const cors = require("cors");
// const path = require("path");

// // Routes
// const adminRoutes = require("./routes/adminRoutes");
// const organizationRoutes = require("./routes/organizationRoutes");
// const organizationPicsRoutes = require("./routes/organizationPicsRoutes");
// const serviceCatRoutes = require("./routes/serviceCatRoutes");
// const orgServicesRoutes = require("./routes/orgServicesRoutes");
// const serviceProvidersRoutes = require("./routes/serviceProvidersRoutes");
// const usersRoutes = require('./routes/usersRoutes');
// const bannerRoutes = require('./routes/bannerRoutes');

// const app = express();

// // ===== Middleware =====
// app.use(cors());
// app.use(express.json()); // parse JSON
// app.use(express.urlencoded({ extended: true })); // parse form data

// // ✅ Serve static folders
//  app.use("/uploads/orgs", express.static(path.join(__dirname, "uploads/orgs")));
// app.use("/uploads/icons", express.static(path.join(__dirname, "uploads/icons")));
// app.use("/uploads/providers", express.static(path.join(__dirname, "uploads/providers")));
// app.use('/uploads/banners', express.static(path.join(__dirname, 'uploads/banners')));



// // ===== Routes =====
// app.use("/api/admin", adminRoutes);
// app.use("/api/organization", organizationRoutes);
// app.use("/api/organization-pics", organizationPicsRoutes);
// app.use("/api/service-cat", serviceCatRoutes);
// app.use("/api/org-services", orgServicesRoutes);
// app.use("/api/service-providers", serviceProvidersRoutes);
// app.use("/api/users", usersRoutes);
// app.use('/api/banners', bannerRoutes);

// // ===== Default root route =====
// app.get("/", (req, res) => {
//   res.send("🚀 API is working. Use /api/admin, /api/organization, etc.");
// });

// // ===== 404 handler =====
// app.use((req, res) => {
//   res.status(404).json({ message: "Route not found" });
// });

// // ===== Global error handler =====
// app.use((err, req, res, next) => {
//   console.error(" Global Error:", err);
//   res.status(500).json({ message: "Server error", details: err.message });
// });

// // ===== Start Server =====
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`✅ Server running on port ${PORT}`);
// });




const express = require("express");
const cors = require("cors");
const path = require("path");

// Routes
const adminRoutes = require("./routes/adminRoutes");
const organizationRoutes = require("./routes/organizationRoutes");
const organizationPicsRoutes = require("./routes/organizationPicsRoutes");
const serviceCatRoutes = require("./routes/serviceCatRoutes");
const orgServicesRoutes = require("./routes/orgServicesRoutes");
const serviceProvidersRoutes = require("./routes/serviceProvidersRoutes");
const usersRoutes = require("./routes/usersRoutes");
const bannerRoutes = require("./routes/bannerRoutes");

const app = express();

// ===== Middleware =====
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Static uploads
app.use("/uploads/orgs", express.static(path.join(__dirname, "uploads/orgs")));
app.use("/uploads/icons", express.static(path.join(__dirname, "uploads/icons")));
app.use("/uploads/providers", express.static(path.join(__dirname, "uploads/providers")));
app.use("/uploads/banners", express.static(path.join(__dirname, "uploads/banners")));

// ===== Routes =====
app.use("/api/admin", adminRoutes);
app.use("/api/organization", organizationRoutes);
app.use("/api/organization-pics", organizationPicsRoutes);
app.use("/api/service-cat", serviceCatRoutes);
app.use("/api/org-services", orgServicesRoutes);
app.use("/api/service-providers", serviceProvidersRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/banners", bannerRoutes);

// ===== Root route =====
app.get("/", (req, res) => {
  res.send("🚀 API is working. Use /api/... endpoints");
});

// ===== 404 handler =====
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ===== Global error handler =====
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({ message: "Server error", details: err.message });
});

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
