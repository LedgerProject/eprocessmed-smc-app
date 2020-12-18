const { pool } = require('../../config/postgresql_connect');
const { msgs } = require('../../global/global_data');
const customersSrv = {};

customersSrv.list = async (req, res) => {
  const answer = await pool.query("SELECT usr_id, name, password, role, created_on FROM users WHERE role='customer'");
  try {
    res.status(200).json({
      correct: true,
      resp: answer.rows
    });
  } catch (err) {
    res.status(400).json({
      correct: false,
      resp: err
    });
  }
};

// customersSrv.create = async (req, res) => {
//   const { dataSet } = req.params;
//   const data = JSON.parse(dataSet);
//   const status = true;
//   const d = new Date().getTime();
//   const qry = `INSERT INTO forms_data (name, description, status, created_on) VALUES ('${data.name}', '${data.description}', '${status}', ${d})`;

//   await pool.query(qry);
//   try {
//     res.status(200).json({
//       correct: true,
//       resp: `${msgs.formCrtdMsg}${data.name}`
//     });
//   } catch (err) {
//     res.status(400).json({
//       correct: false,
//       resp: err
//     });
//   }
// };

// customersSrv.getById = async (req, res) => {
//   const { id } = req.params;
//   const qry = `SELECT name, description, status, created_on FROM forms_data WHERE form_id = ${id}`;

//   const answer = await pool.query(qry);
//   try {
//     res.status(200).json({
//       correct: true,
//       resp: answer.rows
//     });
//   } catch (err) {
//     res.status(400).json({
//       correct: false,
//       resp: err
//     });
//   }
// };

// customersSrv.upDate = async (req, res) => {
//   const { id, type, dataset } = req.params;
//   const data = JSON.parse(dataset);
//   let status,
//       qry;

//   switch (type) {
//     case 'generic':
//         qry = `UPDATE forms_data SET name = '${data.name}', description = '${data.description}' WHERE form_id = ${id}`;
//       break;
//     case 'status':
//         if (data.status) {
//           status = false;
//         } else {
//           status = true;
//         }
//         qry = `UPDATE forms_data SET status = '${status}' WHERE form_id = ${id}`;
//       break;
//   }

//   await pool.query(qry);
//   try {
//     res.status(200).json({
//       correct: true,
//       resp: `${msgs.updFormMsg}${data.name}`
//     });
//   } catch (err) {
//     res.status(400).json({
//       correct: false,
//       resp: err
//     });
//   } 
// };

// customersSrv.delete = async (req, res) => {
//   const { id } = req.params;
//   qry = `DELETE FROM forms_data WHERE form_id = ${id}`;
//   await pool.query(qry);
//   try {
//     res.status(200).json({
//       correct: true,
//       resp: `${msgs.dltFormMsg}${id}`
//     });
//   } catch (err) {
//     res.status(400).json({
//       correct: false,
//       resp: err
//     });
//   }
// }

module.exports = customersSrv;