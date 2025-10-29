// const mysql = require("mysql2/promise");
// const dotenv = require("dotenv");

// dotenv.config();

// const db = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });

// console.log("MySQL pool created");

// module.exports = db;

















const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000, // 10 seconds connection timeout
  enableKeepAlive: true, // 🟢 keeps socket alive
  keepAliveInitialDelay: 0, // start immediately
});

db.getConnection()
  .then(() => console.log("✅ MySQL pool created"))
  .catch((err) => console.error("❌ MySQL connection error:", err));

/** Optional: keep the pool alive to prevent idle disconnects */
setInterval(async () => {
  try {
    await db.query("SELECT 1");
  } catch (err) {
    console.error("⚠️ MySQL keepalive failed:", err.message);
  }
}, 60000); // every 1 min

module.exports = db;

