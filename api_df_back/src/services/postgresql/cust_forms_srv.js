const { pool } = require('../../config/postgresql_connect');
const { msgs } = require('../../global/global_data');
const custFormsSrv = {};

custFormsSrv.list = async (req, res) => {
  const answer = await pool.query("SELECT name, description, custf_id, structure, customer_id, form_id, setting_id, created_on FROM customers_forms");
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

custFormsSrv.create = async (req, res) => {
  const data = req.body;
  const customer_id = parseInt(data.customer_id);
  const form_id = parseInt(data.form_id); 
  const setting_id = parseInt(data.setting_id);   
  const structure = JSON.stringify(data.structure);
  const d = new Date().getTime();
  const qry = `INSERT INTO customers_forms (name, description, structure, customer_id, form_id, setting_id, created_on) VALUES ('${data.name}','${data.description}','${structure}','${customer_id}','${form_id}','${setting_id}', ${d})`;
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

custFormsSrv.getById = async (req, res) => {
  const { id } = req.params;

  const qry = `SELECT name, description, structure, status, created_on FROM customers_forms WHERE form_id = ${id}`;
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

custFormsSrv.upDate = async (req, res) => {
  const { id, type, dataset } = req.params;
  const data = JSON.parse(dataset);
  let status;
  let qry;

  switch (type) {
    case 'generic':
        qry = `UPDATE customers_forms SET name = '${data.name}', description = '${data.description}' WHERE form_id = ${id}`;
      break;
    case 'status':
        if (data.status) {
          status = false;
        } else {
          status = true;
        }
        qry = `UPDATE customers_forms SET status = '${status}' WHERE form_id = ${id}`;
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

custFormsSrv.delete = async (req, res) => {
  const { id } = req.params;
  
  qry = `DELETE FROM customers_forms WHERE form_id = ${id}`;
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

module.exports = custFormsSrv;