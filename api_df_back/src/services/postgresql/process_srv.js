const { pool } = require('../../config/postgresql_connect');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { secrets, nSalt,msgs }  = require('../../global/global_data');
const processSrv = {};

processSrv.list = async (req, res) => {
  const answer = await pool.query(`SELECT * FROM process;`);
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

processSrv.query = async (req, res) => {// data
  const { type, item, value } = req.body;
  let where = '';

  if (type === 'params') {
    if (item && value) {
      where = `WHERE ${item}='${value}'`;
    }
  }

  const qry = `SELECT usr_id, doc_id, google_id, phone, code, name, email, role, provider, status, created_on FROM process ${where};`;
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

processSrv.create = async (req, res) => {
  const data = req.body;
  // const dateCreation = new Date();
  const o_date = new Intl.DateTimeFormat;
  const f_date = (m_ca, m_it) => Object({ ...m_ca, [m_it.type]: m_it.value });
  const m_date = o_date.formatToParts().reduce(f_date, {});
  const dateCreation = m_date.year + '-' + m_date.month + '-' + m_date.day;
  console.log(dateCreation);


  //const qry = `INSERT INTO forms_data (name, description, structure, answered_check, customer_id, respondents_id, custf_id, created_on ) VALUES ('${data.name}', '${data.description}', '${data.structure}', '${data.answered_check}', ${customer_id}, ${respondents_id}, ${custf_id}, ${d});`;
  const qry = `INSERT INTO process("name", "acceptantText", "rejectionText", "representativeAcceptantText", "representativeRejectionText", "consentText", state)
VALUES('${data.name}', '${data.acceptant_text}', '${data.rejection_text}', '${data.represent_acept_text}', '${data.represent_reject_text}', '${data.consent_text}', '1');`;



  await pool.query(qry);
  try {
    res.status(200).json({
      correct: true,
      resp: `${msgs.formCrtdMsg}`
    });
  } catch (err) {
    res.status(400).json({
      correct: false,
      resp: err
    });
  }
};

processSrv.upDate = async (req, res) => {
  const { id, type, dataset } = req.body;
  let status;
  let qry;

  console.log('req.body');
  console.log(req.body);

  switch (type) {
    case 'generic':
      qry = `UPDATE process SET name = '${dataset.name}', google_id = '${dataset.description}', phone = '${dataset.phone}', email = '${dataset.email}', role = '${dataset.role}', provider = '${dataset.provider}' WHERE usr_id = ${id}`;
      break;
    case 'status':
      if (dataset.status === 'active') {
        status = 'inactive';
      } else {
        status = 'active';
      }
      qry = `UPDATE process SET status = '${status}' WHERE usr_id = ${id}`;
      break;
    case 'code':
      qry = `UPDATE process SET code = '${dataset.code}' WHERE usr_id = ${id}`;
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


module.exports = processSrv;
