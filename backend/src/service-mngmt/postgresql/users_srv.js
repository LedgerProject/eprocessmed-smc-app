const { pool } = require('../../general/config/postgresql_connect');
const generatorRequest = require('../../general/global/functions/generator_request');
const globalFunctions = require('../../general/global/functions/global_functions');
const bockchainRequest = require('../external/server_bockchain_srv');
const { configDB, rootURI, urls, hdJson  } = require('../../general/global/data/global_data');
const { saveLogs } = globalFunctions;
const jwt = require('jsonwebtoken');
var collector = [];
const usersSrv = {};

const url = `${rootURI}${urls.genQuerySrv}`;

// Encadenar los datos para los "fetch", compatibles con JSON
const strgf = (obj) => {
  const str = JSON.stringify(obj);
  return str;
}

const prepareLog = (dataLog) => {
  const date = new Date();
  dataLog['date'] = date;
  const log = JSON.stringify(dataLog);
  saveLogs(log);
}

const sedRequest = async (reqSelet, requests, collector) => {// Generalizar la construcción de la consulta
  const resp = await generatorRequest(reqSelet, requests, collector)
  .then((resp) => { return resp })
  .catch((err) => prepareLog({ module: 'generalInquiryCtr', process: 'query', line: '30', data: '', err }));
  return resp;
}

const getHash = async () => {
    let prepareData = '';
    let process = '';
    let hash = '';
    const dataReq = {
      request: 'params-by-name',
      data: [{
        params: [{ name: 'secrets' }],
        where: {}
      }]
    };
    if (dataReq.prepareData !== undefined) {
      prepareData = dataReq.prepareData;
    }
    if (dataReq.process !== undefined) {
      process = dataReq.process;
    }
    const queryData = strgf(dataReq);
    const setQuery = { prepareData, process, input: null, ouput: dataReq.request, url, method: 'POST', data: queryData, headers: hdJson, bodyType: 'body', respFormat: 'Json' };
    const reqSelet = [setQuery];
    const requests = [];

    const getSecretRes = await sedRequest(reqSelet, requests, collector);
    const correct = getSecretRes[0].answer.correct;
    if (correct) {
        const answer = getSecretRes[0].answer.resp;
        const params = answer[0].params;
        const auth = params.find(param => param.name === 'auth'); 
        hash = auth.hash;
    }
    return hash;
}

const ncrypt = async (dataNcrypt) => {
    const hash = dataNcrypt.hash;
    const data = dataNcrypt.data;
    const resp = await bockchainRequest.ncrypt(data, hash);
    const answerNcrypt = resp.find(dta => dta.ouput === 'ncrypt');
    return answerNcrypt.answer;
}

const decrypt = async (dataNcrypt) => {
    const hash = dataNcrypt.hash;
    const data = dataNcrypt.data;
    const resp = await bockchainRequest.decrypt(data, hash);
    const answerNcrypt = resp.find(dta => dta.ouput === 'decrypt');
    return answerNcrypt.answer;
}

const getUsrByLoginPass = async (data) => {
    let prepareData = '';
    let process = '';
    let answer = [];
    const dataReq = {
      request: 'usr-by-login-pass-pass',
      data: [{
        params: [data],
        where: {}
      }]
    };
    if (dataReq.prepareData !== undefined) {
      prepareData = dataReq.prepareData;
    }
    if (dataReq.process !== undefined) {
      process = dataReq.process;
    }
    const queryData = strgf(dataReq);
    const setQuery = { prepareData, process, input: null, ouput: dataReq.request, url, method: 'POST', data: queryData, headers: hdJson, bodyType: 'body', respFormat: 'Json' };
    const reqSelet = [setQuery];
    const requests = [];
    const respQry = await sedRequest(reqSelet, requests, collector);
    const usrByLogin = respQry.find(res => res.ouput === 'usr-by-login-pass');
    const correct = usrByLogin.answer.correct;
    if (correct) {
        answer = usrByLogin.answer.resp;
    }
    return answer;
}

const ctrUpdUsers = async (dataReq) => {
    let prepareData = '';
    if (dataReq.prepareData !== undefined) {
      prepareData = dataReq.prepareData;
    }
    const objDta = [{
      params: [dataReq.data],
      where: {}
    }];
    dataReq.data = objDta;
    const queryData = strgf(dataReq);
    const setQuery = { prepareData, process: dataReq.process, input: null, ouput: dataReq.request, url, method: 'POST', data: queryData, headers: hdJson, bodyType: 'body', respFormat: 'Json' };
    const reqSelet = [setQuery];
    const requests = [];
    return sedRequest(reqSelet, requests, collector);
}

usersSrv.usrByPrm = async (req, res) => {
    const typeAut = req.body.typeAut;
    const data = req.body.data;
    let status = 400;
    let correct = false;
    let answer = [];
    let login = data.login;
    let password = '';
    const hash = await getHash();
    if (typeAut === 'standar') {
        password = data.password;
    }
    const dataNcrypt = {
        data: { 
            login,
            password
        },
        hash
    };
    const ncryptResp = await ncrypt(dataNcrypt);
    const message = ncryptResp.message;
    if (message === 'Datos encriptados correctamente') {
        const ncryptData = ncryptResp.data;
        const dataReq = {
            login: ncryptData.login,
            password: ncryptData.password
        };
        // consultar login en "tb users"
        const usr = await getUsrByLoginPass(dataReq);
        status = 200;
        correct = true;
        answer = usr;
    }
    res.status(status).json({
        correct,
        resp: answer
    });
}

usersSrv.create = async (req, res) => {
    let params = req.body;
    let status = 400;
    let correct = false;
    let answer;
    const dataReq = {
        request: 'rgt-users',
        data: params
    }
    respSrv = await ctrUpdUsers(dataReq);
    respCtrUpd = respSrv.find(resp => resp.ouput === dataReq.request);
    if (respCtrUpd !== undefined) {
        status = 200;
        correct = respCtrUpd.answer.correct;
        answer = respCtrUpd.answer.resp;
    } else {
        answer = 'Error al crear o editar';
    }
    res.status(status).json({
        correct,
        resp: answer
    });
};

usersSrv.update = async (req, res) => {// upd-users

}

usersSrv.auth = async (req, res) => {
    const params = req.body;
    const { login, password, codeOtp, idCatAccesstype } = params;
    const idCatAccType = idCatAccesstype.idCatAccesstype;
    const hash = await getHash();
    let qry;
    let where = '';
    let status = 400;
    let correct = false;
    let answer;

    const dataNcrypt = {
        data: {
            login,
            password
        },
        hash
    };
    const ncryptResp = await ncrypt(dataNcrypt);
    const message = ncryptResp.message;
    if (message === 'Datos encriptados correctamente') {
        switch (idCatAccType) {
            case '0,0,0': // google
                where = `WHERE login= '${ncryptResp.data.login}' AND status != '0'`;
                break;
            case '0,1,0': // sms
                where = `WHERE login= '${ncryptResp.data.login}' AND code_otp='${codeOtp}' AND status != '0'`;
                break;
            case '0,2,0': // 
                where = `WHERE login= '${ncryptResp.data.login}' AND password_user='${ncryptResp.data.password}' AND status != '0'`;
                break;
        }
        qry = `SELECT * FROM users ${where};`;

        try {
            poolConnect = pool(configDB);
            answerQry = await poolConnect.query(qry);
            if (answerQry.rows[0] != undefined) {
                const userReg = answerQry.rows[0];
                const idUser = userReg.id_user;
                var dni = userReg.dni;
                var name = userReg.name;
                var lastname = userReg.lastname;
                var loginD = userReg.login;
                var mail = userReg.mail;
                const codePhone = userReg.code_phone;
                var phone = userReg.phone;
                const idGoogle = userReg.id_google;
                const idHashAlastria = userReg.id_hash_alastria;
                const idCatRoluser = userReg.id_cat_roluser;
                const userStructure = userReg.user_structure;
                const idCatAccesstype = userReg.id_cat_accesstype;
                const idEstablishment = userReg.id_establishment;
                const idSpecialist = userReg.id_specialist;
                const idCatNotification = userReg.id_cat_notification;
                const keyZoom = userReg.key_zoom;
                const regStatus = userReg.regStatus;
                const token = jwt.sign({
                    idUser,
                    name,
                    lastname,
                    login,
                    phone,
                    codePhone,
                    mail,
                    idGoogle,
                    idCatRoluser
                }, hash, { expiresIn: 60 * 45 });

                //aqui voy a desencriptar los datos
                const dataDecrypt = {
                    hash,
                    data: {
                        dni: dni,
                        name: name,
                        lastname: lastname,
                        login: loginD,
                        mail: mail,
                        phone: phone,
                    }
                }

                const deyptResp = await decrypt(dataDecrypt);
                const message = deyptResp.message;
                if (message === 'Datos descifrados correctamente') {
                    dni= deyptResp.data.dni;
                    name= deyptResp.data.name;
                    lastname= deyptResp.data.lastname;
                    loginD= deyptResp.data.login;
                    mail= deyptResp.data.mail;
                    phone= deyptResp.data.phone;
                }

                answer = {
                    msg: 'Authorized',
                    data: {
                        idUser,
                        dni,
                        name,
                        lastname,
                        login: loginD,
                        phone,
                        codePhone,
                        mail,
                        idGoogle,
                        idCatRoluser,
                        userStructure,
                        idEstablishment,
                        idSpecialist,
                        idCatAccesstype,
                        idCatNotification,
                        regStatus,
                        token
                    }
                };

                status = 200;
                correct = true;

            } else {
                status = 200;
                correct = true;
                answer = 'Denied';
            }
        } catch (err) {
            // console.error('catch err', err);
            answer = err;
        }
    } else {
        // console.error('Error de encriptación');
        answer = 'Error de encriptación';
    }

    res.status(status).json({
        correct,
        resp: answer
    });
};

usersSrv.logout = async (req, res) => {
    // const { tkBlacklist } = globalData; // db token_blacklist 
    let { id, token } = req.params;

    // tks.push(token);

    // await logHistory(req, id, 'logout');

    res.json('Ok');
};

module.exports = usersSrv;