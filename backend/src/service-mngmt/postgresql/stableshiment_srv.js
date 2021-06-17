const { pool } = require('../../general/config/postgresql_connect');
const { configDB, msgs } = require('../../general/global/data/global_data');
const { saveLogs } = require('../../general/global/functions/global_functions');
const tablesSet = require('../../general/global/data/tables_set');
const requestsSet = require('../../general/global/data/requests_set');
const stablishmentSrv = {};

stablishmentSrv.list = async (req, res) => {
  try {
    poolConnect = pool(configDB);
    const answer = await poolConnect.query(`SELECT * FROM public."Establishment" where status='1';`);
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

stablishmentSrv.getById = async (req, res) => {
  try {
    poolConnect = pool(configDB);
    const { id } = req.params;
    const qry = `SELECT * FROM public."Establishment" where  idestablishment = ${id};`;
    const answer = await poolConnect.query(qry);
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

stablishmentSrv.query = async (req, res) => {// 
  try {
    poolConnect = pool(configDB);
    const { type, item, value } = req.body;
    let where = '';

    if (type === 'params') {
      if (item && value) {
        where = `WHERE ${item}='${value}'`;
      }
    }

    const qry = `SELECT * FROM public."Establishment" ${where};`;
    const answer = await poolConnect.query(qry);

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

stablishmentSrv.create = async (req, res) => {
  try {
    poolConnect = pool(configDB);
    const data = req.body;
    const o_date = new Intl.DateTimeFormat;
    const f_date = (m_ca, m_it) => Object({ ...m_ca, [m_it.type]: m_it.value });
    const m_date = o_date.formatToParts().reduce(f_date, {});
    const dateCreation = m_date.year + '-' + m_date.month + '-' + m_date.day;
    const qry = `INSERT INTO public."Establishment"
    ("name", dni, address, phone, mail, "idLocation", "idType", "contactName", "contactPhone", "specialistSign", hash, status)
    VALUES('${data.name}', '${data.dni}', '${data.address}', '${data.phone}', '${data.mail}', '${data.idLocation}', '${data.idType}', '${data.contactName}', '${data.contactPhone}', '${data.specialistSign}', '${data.hash}', '1');`;
    const answer = await poolConnect.query(qry);
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

stablishmentSrv.upDate = async (req, res) => {
  try {
    poolConnect = pool(configDB);
    const { body } = req;
    const { id } = req.params;
    const qry = `UPDATE public."Establishment"
    SET "name"='${body.name}', dni='${body.dni}', address='${body.address}', mail='${body.mail}', "idLocation"='${body.idlocation}', "idType"='${body.idtype}', "contactName"='${body.contactname}', "contactPhone"='${body.contactphone}', "specialistSign"='${body.specialistsign}', hash='${body.hash}'
    WHERE idestablishment= ${id};`;
    await poolConnect.query(qry);
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

stablishmentSrv.delete = async (req, res) => {
  try {
    poolConnect = pool(configDB);
    const { id } = req.params;
    const qry = `UPDATE public."Establishment" SET status=0 WHERE idestablishment= ${id};`;
    await poolConnect.query(qry);
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

module.exports = stablishmentSrv;
