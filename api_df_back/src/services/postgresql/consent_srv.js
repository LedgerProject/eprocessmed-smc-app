const { pool } = require('../../config/postgresql_connect');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { secrets, nSalt,msgs }  = require('../../global/global_data');
const consentSrv = {};

consentSrv.list = async (req, res) => {
  const answer = await pool.query(`SELECT * FROM consent;`);
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

consentSrv.query = async (req, res) => {// data
  const { type, item, value } = req.body;
  let where = '';

  if (type === 'params') {
    if (item && value) {
      where = `WHERE ${item}='${value}'`;
    }
  }

  const qry = `SELECT usr_id, doc_id, google_id, phone, code, name, email, role, provider, status, created_on FROM Consent ${where};`;
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

consentSrv.create = async (req, res) => {
  const data = req.body;
  const patient = parseInt(data.patient);
  const specialist = parseInt(data.specialist);
  const specialty = parseInt(data.specialty);
  const process =parseInt(data.process);
  const risk =parseInt(data.risk);
  const video =parseInt(data.video);
  // const dateCreation = new Date();
  const o_date = new Intl.DateTimeFormat;
  const f_date = (m_ca, m_it) => Object({...m_ca, [m_it.type]: m_it.value});
  const m_date = o_date.formatToParts().reduce(f_date, {});
  const dateCreation= m_date.year+ '-' +  m_date.month + '-' +m_date.day ;
  console.log(dateCreation);


  //const qry = `INSERT INTO forms_data (name, description, structure, answered_check, customer_id, respondents_id, custf_id, created_on ) VALUES ('${data.name}', '${data.description}', '${data.structure}', '${data.answered_check}', ${customer_id}, ${respondents_id}, ${custf_id}, ${d});`;
  const qry = `INSERT INTO public.consent
  (patient, specialist, specialty, process, risk, video, show_video, "firmPacient", "firmRepresentative", "firmSpecialist", "firmRevoked", "hashFpacient", "hashFrepresentative", "hashFspecialist", "hashFrevoked", "audioAcceptance", "repAudioAcceptance ", state, "stateRevoked", "dateCreation", "dateReview", "dateAcceptance", "dateRejected", "urlPdf", "patientCompleted", "specialistCompleted ", site, "homeFirm", opt, "validFirmHome", "codeCie", laterality, priority, "inputMode", antelation, anesthesia, "afternoonSurgery", "maSurgery", "bloodSaver", anticoagulant, intensifier, "allergyLatex", diabetes1, sarm, "estimatedLife", "attentionBillable", "path", "userId", "formId", "type", hashpdf)  
  VALUES(${patient}, ${specialist}, ${specialty}, ${process}, ${risk}, ${video}, 1, '', '', '', '', '', '', '', '', 0, '', 1, 0, '2020-12-14', '2020-12-14', '2020-12-14', '2020-12-14', '', 0, '', 0, 0, 0, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, '', 0, '', 0, 0, 0, '${data.hashpdf}');`;
  


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

module.exports = consentSrv;
