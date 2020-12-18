const { pool } = require('../../config/postgresql_connect');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { secrets, nSalt }  = require('../../global/global_data');
const stablishmentSrv = {};

stablishmentSrv.list = async (req, res) => {
  const answer = await pool.query(`SELECT * FROM establishment;`);
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

stablishmentSrv.query = async (req, res) => {// data
  const { type, item, value } = req.body;
  let where = '';

  if (type === 'params') {
    if (item && value) {
      where = `WHERE ${item}='${value}'`;
    }
  }

  const qry = `SELECT usr_id, doc_id, google_id, phone, code, name, email, role, provider, status, created_on FROM stablishment ${where};`;
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

}

stablishmentSrv.create = async (req, res) => {
  const salt = bcrypt.genSaltSync(nSalt);
  let data = req.body;
  let status;

  if (data.password != null) {
    data.password = bcrypt.hashSync(data.password, salt);
  }

  if (data.provider === 'otp' || data.provider === 'google') {// active, inactive, onhold
    status = 'onhold'; 
  } else {
    status = 'active';
  }

  const d = new Date().getTime();
  const qry = `INSERT INTO stablishment (doc_id, google_id, phone, code, name, password, email, role, provider, status, created_on) VALUES ('${data.doc_id}', '${data.google_id}', '${data.phone}', '${data.code}', '${data.name}', '${data.password}', '${data.email}', '${data.role}', '${data.provider}', '${status}', ${d}) RETURNING usr_id;`;
  const answer = await pool.query(qry);

  try {
    res.status(200).json({
      correct: true,
      resp: {
        usr_id: answer.rows[0].usr_id
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      correct: false,
      resp: err
    });
  }

};

stablishmentSrv.upDate = async (req, res) => {
  const { id, type, dataset } = req.body;
  let status;
  let qry;

  console.log('req.body');
  console.log(req.body);

  switch (type) {
    case 'generic':
        qry = `UPDATE stablishment SET name = '${dataset.name}', google_id = '${dataset.description}', phone = '${dataset.phone}', email = '${dataset.email}', role = '${dataset.role}', provider = '${dataset.provider}' WHERE usr_id = ${id}`;
      break;
    case 'status':
        if (dataset.status === 'active') {
          status = 'inactive';
        } else {
          status = 'active';
        }
        qry = `UPDATE stablishment SET status = '${status}' WHERE usr_id = ${id}`;
      break;
    case 'code':
        qry = `UPDATE stablishment SET code = '${dataset.code}' WHERE usr_id = ${id}`;
      break;    
  }


  await pool.query(qry);
  try {
    res.status(200).json({
      correct: true,
      resp: `Ok`
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      correct: false,
      resp: err
    });
  } 
};


module.exports = stablishmentSrv;
