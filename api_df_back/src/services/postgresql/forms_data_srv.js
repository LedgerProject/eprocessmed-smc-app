const { pool } = require('../../config/postgresql_connect');
const { rootDocs, msgs } = require('../../global/global_data');
const formsDataSrv = {};

formsDataSrv.list = async (req, res) => {
  const answer = await pool.query("SELECT dfh_id, name, description, customer_id, structure, answered_check, respondents_id, custf_id, created_on, status FROM forms_data");
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

formsDataSrv.create = async (req, res) => {
  const data = req.body;
  const respondents_id = parseInt(data.respondents_id);
  const custf_id = parseInt(data.custf_id);
  const customer_id = parseInt(data.customer_id);
  const structure = JSON.stringify(data.structure);
  const d = new Date().getTime();

  // falta status

  const qry = `INSERT INTO forms_data (name, description, structure, answered_check, customer_id, respondents_id, custf_id, created_on ) VALUES ('${data.name}', '${data.description}', '${data.structure}', '${data.answered_check}', ${customer_id}, ${respondents_id}, ${custf_id}, ${d});`;
  await pool.query(qry);
  try {
    res.status(200).json({
      correct: true,
      resp: `${msgs.formCrtdMsg}${data.respondents_id}`
    });
  } catch (err) {
    res.status(400).json({
      correct: false,
      resp: err
    });
  }
};

formsDataSrv.getById = async (req, res) => {
  const { id } = req.params;
  const qry = `SELECT dfh_id, name, description, structure, answered_check, customer_id, respondents_id, custf_id, created_on FROM forms_data WHERE dfh_id = ${id}`;
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

formsDataSrv.getByIdUsr = async (req, res) => {
  const { id } = req.body;
  const qry = `SELECT dfh_id, name, description, structure, answered_check, customer_id, respondents_id, custf_id, created_on FROM forms_data WHERE respondents_id = ${id}`;
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

formsDataSrv.upDate = async (req, res) => {
  const { body } = req;
  const type = body.type;
  const structure = JSON.stringify(body.structure);
  let id;
  let qry;

  switch (type) {
    case 'generic':
        id = body.dfh_id;
        qry = `UPDATE forms_data SET name = '${body.name}', description = '${body.description}', structure = '${structure}', status='${body.status}', answered_check = true  WHERE dfh_id = ${body.dfh_id}`;
      break;
    case 'status':
        id = body.id;
        qry = `UPDATE forms_data SET status = '${body.data.status}' WHERE dfh_id = ${body.id}`;
      break;
  }

  const answer = await pool.query(qry);
  try {
    res.status(200).json({
      correct: true,
      resp: `${msgs.updFormMsg}${id}`
    });
  } catch (err) {
    res.status(400).json({
      correct: false,
      resp: err
    });
  }
};

formsDataSrv.upfile = (req, res) => {
  const fileData = req.files.file;
  const fileName = fileData.name;
  fileData.mv(`${rootDocs}/${fileName}`, err => {
    if (!err) {
      res.status(200).json({
        correct: true,
        resp: `File upload`
      });

    } else {
      res.status(400).json({
        correct: false,
        resp: err
      });
    }
  });
};

formsDataSrv.delete = async (req, res) => {
  const { id } = req.params;
  qry = `DELETE FROM forms_data WHERE form_id = ${id}`;
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

module.exports = formsDataSrv;