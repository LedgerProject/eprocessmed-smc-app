const { pool } = require('../../config/postgresql_connect');
const { msgs } = require('../../global/global_data');
const formsSettingSrv = {};

formsSettingSrv.list = async (req, res) => {
  const answer = await pool.query("SELECT cfc_id, name, description, structure, form_id, created_on FROM forms_setting");
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

formsSettingSrv.create = async (req, res) => {
  const data = req.body;  
  const form_id = parseInt(data.form_id);
  const structure = JSON.stringify(data.structure);
  const d = new Date().getTime();
  const qry = `INSERT INTO forms_setting (name, description, structure, form_id, created_on) VALUES ('${data.name}','${data.description}','${structure}','${form_id}', ${d})`;
  await pool.query(qry);
  try {
    res.status(200).json({
      correct: true,
      resp: `${msgs.formCrtdMsg}${data.name}`
    });
  } catch (err) {
    res.status(400).json({
      correct: false,
      resp: err
    });
  }
};

formsSettingSrv.getById = async (req, res) => {
  const { id } = req.params;

  const qry = `SELECT name, description, structure, status, created_on FROM forms_setting WHERE form_id = ${id}`;
  const answer = await pool.query(qry);
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

formsSettingSrv.upDate = async (req, res) => {
  const { id, type, dataset } = req.params;
  const data = JSON.parse(dataset);
  let status;
  let qry;

  switch (type) {
    case 'generic':
        qry = `UPDATE forms_setting SET name = '${data.name}', description = '${data.description}' WHERE form_id = ${id}`;
      break;
    case 'status':
        if (data.status) {
          status = false;
        } else {
          status = true;
        }
        qry = `UPDATE forms_setting SET status = '${status}' WHERE form_id = ${id}`;
      break;
  }

  await pool.query(qry);
  try {
    res.status(200).json({
      correct: true,
      resp: `${msgs.updFormMsg}${data.name}`
    });
  } catch (err) {
    res.status(400).json({
      correct: false,
      resp: err
    });
  } 
};

formsSettingSrv.delete = async (req, res) => {
  const { id } = req.params;
  
  qry = `DELETE FROM forms_setting WHERE form_id = ${id}`;
  await pool.query(qry);
  try {
    res.status(200).json({
      correct: true,
      resp: `${msgs.dltFormMsg}${id}`
    });
  } catch (err) {
    res.status(400).json({
      correct: false,
      resp: err
    });
  }
}

module.exports = formsSettingSrv;