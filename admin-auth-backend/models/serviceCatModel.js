// const db = require("../config/db");

// const ServiceCat = {
//   getAll: async () => {
//     const [rows] = await db.query("SELECT * FROM service_cat");
//     return rows;
//   },
//   getById: async (id) => {
//     const [rows] = await db.query("SELECT * FROM service_cat WHERE sc_id=?", [id]);
//     return rows[0];
//   },
//   create: async (data) => {
//     const { sr_name, sr_name_ar, sr_s_desc, icon, status } = data;
//     const [result] = await db.query(
//       "INSERT INTO service_cat (sr_name,sr_name_ar,sr_s_desc,icon,status) VALUES (?,?,?,?,?)",
//       [sr_name, sr_name_ar, sr_s_desc, icon, status || "active"]
//     );
//     return result.insertId;
//   },
//   update: async (id, data) => {
//     const { sr_name, sr_name_ar, sr_s_desc, icon, status } = data;
//     const [result] = await db.query(
//       "UPDATE service_cat SET sr_name=?, sr_name_ar=?, sr_s_desc=?, icon=?, status=? WHERE sc_id=?",
//       [sr_name, sr_name_ar, sr_s_desc, icon, status, id]
//     );
//     return result.affectedRows;
//   },
//   delete: async (id) => {
//     const [result] = await db.query("DELETE FROM service_cat WHERE sc_id=?", [id]);
//     return result.affectedRows;
//   }
// };

// module.exports = ServiceCat;



const db = require("../config/db");

const ServiceCat = {
  getAll: async () => {
    const [rows] = await db.query("SELECT * FROM service_cat");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query("SELECT * FROM service_cat WHERE sc_id = ?", [id]);
    return rows[0];
  },

  create: async (data) => {
    const { sr_name, sr_name_ar, sr_s_desc, icon, status } = data;

    const [result] = await db.query(
      "INSERT INTO service_cat (sr_name, sr_name_ar, sr_s_desc, icon, status) VALUES (?, ?, ?, ?, ?)",
      [sr_name, sr_name_ar, sr_s_desc, icon, status || "active"]
    );

    return result.insertId;
  },

  update: async (id, data) => {
    const { sr_name, sr_name_ar, sr_s_desc, icon, status } = data;
    const [result] = await db.query(
      "UPDATE service_cat SET sr_name=?, sr_name_ar=?, sr_s_desc=?, icon=?, status=? WHERE sc_id=?",
      [sr_name, sr_name_ar, sr_s_desc, icon, status, id]
    );
    return result.affectedRows;
  },

  delete: async (id) => {
    const [result] = await db.query("DELETE FROM service_cat WHERE sc_id=?", [id]);
    return result.affectedRows;
  },
};

module.exports = ServiceCat;

