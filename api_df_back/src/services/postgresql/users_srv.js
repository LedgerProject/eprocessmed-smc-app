const { pool } = require('../../config/postgresql_connect');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { secrets, nSalt }  = require('../../global/global_data');
const usersSrv = {};

usersSrv.list = async (req, res) => {
  const answer = await pool.query(`SELECT usr_id, doc_id, google_id, phone, code, name, email, role, provider, status, created_on FROM users;`);
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

usersSrv.query = async (req, res) => {// data
  const { type, item, value } = req.body;
  let where = '';

  if (type === 'params') {
    if (item && value) {
      where = `WHERE ${item}='${value}'`;
    }
  }

  const qry = `SELECT usr_id, doc_id, google_id, phone, code, name, email, role, provider, status, created_on FROM users ${where};`;
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

usersSrv.create = async (req, res) => {
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
  const qry = `INSERT INTO users (doc_id, google_id, phone, code, name, password, email, role, provider, status, created_on) VALUES ('${data.doc_id}', '${data.google_id}', '${data.phone}', '${data.code}', '${data.name}', '${data.password}', '${data.email}', '${data.role}', '${data.provider}', '${status}', ${d}) RETURNING usr_id;`;
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

usersSrv.upDate = async (req, res) => {
  const { id, type, dataset } = req.body;
  let status;
  let qry;

  console.log('req.body');
  console.log(req.body);

  switch (type) {
    case 'generic':
        qry = `UPDATE users SET name = '${dataset.name}', google_id = '${dataset.description}', phone = '${dataset.phone}', email = '${dataset.email}', role = '${dataset.role}', provider = '${dataset.provider}' WHERE usr_id = ${id}`;
      break;
    case 'status':
        if (dataset.status === 'active') {
          status = 'inactive';
        } else {
          status = 'active';
        }
        qry = `UPDATE users SET status = '${status}' WHERE usr_id = ${id}`;
      break;
    case 'code':
        qry = `UPDATE users SET code = '${dataset.code}' WHERE usr_id = ${id}`;
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

usersSrv.auth = async (req, res) => {
  const SEED = secrets.jwt.secret;
  const { provider } = req.body
  var qry;
  var data = {};
  var answer;

  switch (provider) {
    case 'default':
        const { name, password } = req.body;
        qry = `SELECT usr_id, name, password, role, status, created_on FROM users WHERE name = '${name}' AND status != 'inactive';`;
      
        answer = await pool.query(qry);
        try {
          if (answer.rows[0] != undefined) {
            let id = answer.rows[0]['usr_id'];
            let name = answer.rows[0]['name'];
            let role = answer.rows[0]['role'];
            let status = answer.rows[0]['status'];
            bcrypt.compare(password, answer.rows[0]['password'], async (err, isMatch) => {
              if (err) {
                return res.status(400).json({
                  error: `Error checking user: ${err}`
                });
              }
      
              if (isMatch) {
                let token = jwt.sign({
                    id,
                    name,
                    role,
                    status
                }, SEED, { expiresIn: 60 * 45 });
      
                data = {
                  msg: 'Authorized',
                  id,
                  name,
                  role,
                  status,
                  token
                };
                // await logHistory(req, id, 'login');
              } else {
                data = {
                  msg: 'Denied'
                };
              }
      
              res.status(200).json(data);
            })
      
          } else {
            data = {
              msg: 'Denied',
            };
            res.status(200).json(data);
          }
      
        } catch (err) {
          res.status(400).json({
            correct: false,
            resp: err
          });
        }
      break;
    case 'google':
        const { google_id } = req.body;

        qry = `SELECT usr_id, name, role, status, created_on FROM users WHERE google_id= '${google_id}' AND status != 'inactive';`;
        answer = await pool.query(qry);

        if (answer.rows[0] != undefined) {
          let id = answer.rows[0]['usr_id'];
          let name = answer.rows[0]['name'];
          let role = answer.rows[0]['role'];
          let status = answer.rows[0]['status'];

          let token = jwt.sign({
            id,
            name,
            role,
            status
          }, SEED, { expiresIn: 60 * 45 });

          data = {
            msg: 'Authorized',
            id,
            name,
            role,
            status,
            token
          };
          res.status(200).json(data);
        } else {
          data = {
            msg: 'Denied',
          };
          res.status(200).json(data);
        }
      break;
    case 'otp':
        const { phone, code } = req.body;

        qry = `SELECT usr_id, name, role, status, created_on FROM users WHERE phone='${phone}' and code='${code}' AND status != 'inactive';`;
        answer = await pool.query(qry);

        if (answer.rows[0] != undefined) {
          let id = answer.rows[0]['usr_id'];
          let name = answer.rows[0]['name'];
          let role = answer.rows[0]['role'];
          let status = answer.rows[0]['status'];

          let token = jwt.sign({
            id,
            name,
            role,
            status
          }, SEED, { expiresIn: 60 * 45 });

          data = {
            msg: 'Authorized',
            id,
            name,
            role,
            status,
            token
          };
          res.status(200).json(data);
        }  else {
          data = {
            msg: 'Denied',
          };
          res.status(200).json(data);
        }
      break;      
  }

};

usersSrv.logout = async (req, res) => {
  // const { tkBlacklist } = globalData; // db token_blacklist 
  let { id, token } = req.params;

  // tks.push(token);

  // await logHistory(req, id, 'logout');

  res.json('Ok');
};

module.exports = usersSrv;
