const { pool } = require('../../config/postgresql_connect');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { secrets, nSalt,msgs }  = require('../../global/global_data');
const patientsSrv = {};

patientsSrv.list = async (req, res) => {
  const answer = await pool.query(`SELECT * FROM patients;`);
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

patientsSrv.query = async (req, res) => {// data
  const { type, item, value } = req.body;
  let where = '';

  if (type === 'params') {
    if (item && value) {
      where = `WHERE ${item}='${value}'`;
    }
  }

  const qry = `SELECT usr_id, doc_id, google_id, phone, code, name, email, role, provider, status, created_on FROM patients ${where};`;
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

patientsSrv.create = async (req, res) => {
  const data = req.body;
   const historia_c = parseInt(data.no_historia_c);
  const pais = parseInt(data.country);
console.log(data);
 //const qry = `INSERT INTO forms (name, description, structure, created_on) VALUES ('${data.name}', '${data.description}','${structure}', ${d})`;
const qry =`INSERT INTO patients("noClinicHistory", dni, picture, "name", lastname, gender, languages, "birthDate", "civilStatus", address, mail, "idCountry", phone, "idEstablishment", "legalRepresentative", "dniRepLegal", "nameRepLegal", "lastnameRepLegal", "addressRepLegal", "mailRepLegal", "phoneRepLegal", "Emergencycontact", "RelationshipEmeCon", "nameEmeCon", "lastnameEmeCon", "phoneEmeCon", "addressEmeCon", "genderEmeCon", state)
VALUES(${historia_c}, '${data.dni}', '', '${data.name}', '${data.lastname}', '${data.gender}', '${data.language}', '${data.birthdate}', '${data.civilstatus}', '${data.address}', '${data.mail}', ${pais}, '${data.phone}', 1, '0', '', '', '', '', '', '', '', '', '', '', '', '', '', '1');`;
  

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

patientsSrv.upDate = async (req, res) => {
  const { id, type, dataset } = req.body;
  let status;
  let qry;

  console.log('req.body');
  console.log(req.body);

  switch (type) {
    case 'generic':
        qry = `UPDATE patients SET name = '${dataset.name}', google_id = '${dataset.description}', phone = '${dataset.phone}', email = '${dataset.email}', role = '${dataset.role}', provider = '${dataset.provider}' WHERE usr_id = ${id}`;
      break;
    case 'status':
        if (dataset.status === 'active') {
          status = 'inactive';
        } else {
          status = 'active';
        }
        qry = `UPDATE patients SET status = '${status}' WHERE usr_id = ${id}`;
      break;
    case 'code':
        qry = `UPDATE patients SET code = '${dataset.code}' WHERE usr_id = ${id}`;
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


module.exports = patientsSrv;
