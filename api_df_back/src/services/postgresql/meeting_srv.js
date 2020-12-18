const { pool } = require('../../config/postgresql_connect');
const { urlSrv, urls, rootOtp, msgs } = require('../../global/global_data');
const meetingSrv = {};

meetingSrv.list = async (req, res) => {
  const answer = await pool.query("SELECT mt_id, request, answer_api, usr_id, patient_id, dfh_id, status, created_on FROM meetings");
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

meetingSrv.create = async (req, res) => {
  const { body } = req;
  const request = body.request;
  const stgRequest = JSON.stringify(request);
  const answerApiZoom = body.answerApiZoom;
  const usrId = request.usr_id;
  const patientId = request.resp_id;
  const dfhId = request.dfh_id;
  const key = body.key;
  const status = 'onhold'; // onhold, confirmed, terminated, expired, rescheduled
  const dataTime = new Date(`${request.date} ${request.time}`).getTime();
  const d = new Date().getTime();

  const qry = `INSERT INTO meetings (request, answer_api, usr_id, patient_id, dfh_id, confirmation_key, status, datatime, created_on) VALUES ('${stgRequest}', '${answerApiZoom}', '${usrId}', '${patientId}', '${dfhId}', '${key}', '${status}', ${dataTime}, ${d}) RETURNING mt_id;`;
  const answer = await pool.query(qry);
  try {
    res.status(200).json({
      correct: true,
      resp: {
        mt_id: answer.rows[0].mt_id
      }
    });
  } catch (err) {
    res.status(400).json({
      correct: false,
      resp: err
    });
  }
};

meetingSrv.getById = async (req, res) => {
  const { id } = req.params;
  const qry = `SELECT mt_id, request, answer_api, usr_id, patient_id, dfh_id, confirmation_key, status, created_on FROM meetings WHERE form_id = ${id}`;
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


meetingSrv.getByKey = async (req, res) => {
  const { key } = req.params;
  const qry = `SELECT status FROM meetings WHERE confirmation_key = '${key}'`;
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

meetingSrv.upDate = async (req, res) => {

  console.log('meetingSrv.upDate req.body');
  console.log(req.body);

  const { id, type, dataset, key, status } = req.body;
  let qry;
  switch (type) {
    case 'generic':
        qry = `UPDATE meetings SET name = '${data.name}', description = '${data.description}' WHERE mt_id = ${id}`;
      break;
    case 'status': // Altualiza statos por el id: onhold, confirmed, terminated, expired, rescheduled
        qry = `UPDATE meetings SET status = '${status}' WHERE mt_id = ${id}`;
      break;
    case 'status_key': // Altualiza status por el key
        qry = `UPDATE meetings SET status = '${status}' WHERE confirmation_key = '${key}'`;
      break;      
    case 'data_confirmation': // Altualiza key por el id
        qry = `UPDATE meetings SET confirmation_key = '${key}' WHERE mt_id = ${id}`;
      break;   
  }
  
  const answer = await pool.query(qry);
  try {
    res.status(200).json({
      correct: true,
      resp: 'ok'
    });
  } catch (err) {      
    res.status(400).json({
      correct: false,
      resp: err
    });
  } 
};

meetingSrv.delete = async (req, res) => {
  const { id } = req.params;
  qry = `DELETE FROM meetings WHERE mt_id = ${id}`;
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

module.exports = meetingSrv;