const db = require("../config/db");

const Banner = {
  getAll: () => db.query('SELECT * FROM banners'),
  getById: (id) => db.query('SELECT * FROM banners WHERE bn_id = ?', [id]),
  create: (data) => db.query(
    'INSERT INTO banners (bn_name, deal_desc, `desc`, pic, colours, status, link) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [data.bn_name, data.deal_desc, data.desc, data.pic || null, data.colours, data.status, data.link]
  ),
  update: (id, data) => db.query(
    'UPDATE banners SET bn_name=?, deal_desc=?, `desc`=?, pic=?, colours=?, status=?, link=? WHERE bn_id=?',
    [data.bn_name, data.deal_desc, data.desc, data.pic || null, data.colours, data.status, data.link, id]
  ),
  delete: (id) => db.query('DELETE FROM banners WHERE bn_id=?', [id])
};

module.exports = Banner;
