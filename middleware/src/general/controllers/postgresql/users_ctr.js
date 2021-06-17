const request = require("request");
const generatorRequest = require('../../global/functions/generator_request');
const bockchainRequest = require('../services/server_bockchain_ctr');
const { urlSrv, urls, rootOtp, hdJson, hdForm } = require('../../global/data/global_data');
const fetch = require('node-fetch');
const url = `${urlSrv}${urls.genQuerySrv}`;
const urlCrtUsrSrv = `${urlSrv}${urls.crtUsrSrv}`;
const urlUpdUsrSrv = `${urlSrv}${urls.updUsrSrv}`;
const emailUrl = 'https://smartconsent.e-processmed.com/smartConsentWeb/control/apiapp/send_mail_Forms';

const urlUsrByPrmSrv = `${urlSrv}${urls.usrByPrmSrv}`;
const urlAuthUsrSrv = `${urlSrv}${urls.authUsrSrv}`;
const urlServerOtp = `${rootOtp}${urls.scriptOtpSrv}`;

// const urlLogauth = urlSrv+urls.lgutUsrSrv;
var collector = [];
const usersCtr = {};

// Encadenar los datos para los "fetch", compatibles con JSON
const strgf = (obj) => {
  const str = JSON.stringify(obj);
  return str;
}

const prepareLog = (dataLog) => {
  const date = new Date();
  dataLog['date'] = date;
  const log = JSON.stringify(dataLog);
  // saveLogs(log);
}

const sedRequest = async (reqSelet, requests, collector) => {// Generalizar la construcción de la consulta
  const resp = await generatorRequest(reqSelet, requests, collector)
  .then((resp) => { return resp })
  .catch((err) => prepareLog({ module: 'generalInquiryCtr', process: 'query', line: '35', data: '', err }));
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

  return '0x80a6ae5d429838e8d279ac1bff4c0524d26eec4e9aa18d643166f9c1c5e21f86';
}

const ncrypt = async (dataNcrypt) => {
  const hash = dataNcrypt.hash;
  const data = dataNcrypt.data;
  const resp = await bockchainRequest.ncrypt(data, hash);
  const answerNcrypt = resp.find(dta => dta.ouput === 'ncrypt');
  return answerNcrypt.answer;
}

const decrypt = async (dataDecrypt) => {
  const hash = dataDecrypt.hash;
  const data = dataDecrypt.data;
  const resp = await bockchainRequest.decrypt(data, hash);
  const answerNcrypt = resp.find(dta => dta.ouput === 'decrypt');
  return answerNcrypt.answer;
}

//*
const getUserByDNI = async (dni) => {//* optimizar en una sola función
  let prepareData = '';
  let process = '';
  const dataReq = {
    request: 'usr-by-dni',
    data: [{
      params: [{ dni }],
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
  const ouput = respQry.find(resp => resp.ouput === dataReq.request);
  return ouput.answer;
}

//*
const getUserByLogin = async (login) => {// optimizar en una sola función
  let prepareData = '';
  let process = '';
  const dataReq = {
    request: 'usr-by-login',
    data: [{
      params: [{ login }],
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
  const ouput = respQry.find(resp => resp.ouput === dataReq.request);
  return ouput.answer;
}

const generateLogin = async (login, hash, accountant, collector) => {
  // Encripta login
  const dataNcrypt = {
    hash,
    data: {
      login
    }
  }
  const ncryptData = await ncrypt(dataNcrypt);
  if (ncryptData.message === 'Datos encriptados correctamente') {
    // Consulta si exite el "login"
    const userByLogin = await getUserByLogin(ncryptData.data.login);
    if (userByLogin.correct) {
      if (userByLogin.resp.length > 0) {// Existe el login
        accountant ++;
        login = `${login}${accountant}`;
        await generateLogin(login, hash, accountant, collector);
      } else {

        answer = {
          login,
          loginNcryp: ncryptData.data.login
        };

      }
    } else {
      answer = { correct: false, resp: 'Error al consultar Login de usuario' };
    }
  } else {
    answer = { correct: false, resp: 'Error al encriptar' };
  }
  const coll = collector.find(col => col.ouput === 'generate-login');
  if (coll === undefined) {
    collector.push({ ouput: 'generate-login', answer: { correct: true, resp: answer } });
  } else {
    coll.answer = { correct: true, resp: answer };
  }
}

/* --- Consulta si exite el usuario. --- */
const getUser = async (dataReq) => {
  const resp = await fetch(
    urlUsrByPrmSrv,
    {
      method: 'post',
      body: JSON.stringify(dataReq),
      headers: { 'Content-Type': 'application/json' }
    }
  )
  .then(res => res.json())
  .then(json => { return json })
  .catch(err => console.log(err));
  return resp;
}

// Crear usuario (datos No Encriptados)
const sendCtrUsers = async (dataReq) => {// 
  let resp = await fetch(
    urlCrtUsrSrv,
    {
      method: 'post',
      body: JSON.stringify(dataReq),
      headers: { 'Content-Type': 'application/json' }
    }
  )
  .then(res => res.json())
  .then(json => { return json })
  .catch(err => console.log(err));
  return resp;
}

// Crear usuario (datos Encriptados)
const sendCtrUsersNcrypt = async (data) => {
  let prepareData = '';
  let process = '';
  const dataReq = {
    request: 'rgt-users',
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
  const ouput = respQry.find(resp => resp.ouput === dataReq.request);
  return ouput.answer;
}

const sendCredentialsMail = async (name, lastname, module, mail, login, password) => {
  const nombre = `${name} ${lastname}`;
  const correo = mail;
  const request = 'send-ctr-mail';
  let texto = '';
  switch (module) {
    case 'admin':
        texto = `E PROCESS MED informa. Estimad@ ${name} ${lastname}, sus credenciales para acceder son: Usuario ${login} y Password ${password}`;
      break;
    case 'mobile-consent':
        texto = `E PROCESS MED informa. Estimad@ ${name} ${lastname}, su enlace para firmar su consentimiento es: http://ledger.e-processmed.com/login, y sus credenciales para acceder son: Usuario ${login} y Password ${password}`;
      break;      
  }
  const queryData = `nombre=${nombre}&texto=${texto}&correo=${correo}`;
  const setQuery = { prepareData: '', process: '', input: null, ouput: request, url: emailUrl, method: 'POST', data: queryData, headers: hdForm, bodyType: 'body', respFormat: 'Text' };
  const reqSelet = [setQuery];
  const requests = [];
  const getSecretRes = await sedRequest(reqSelet, requests, collector);
  const ouput = getSecretRes.find(resp => resp.ouput === request);
  return ouput.answer;
}

// Actualizar usuario
const genericUpdUsers = async (dataReq) => {
  let prepareData = '';
  let process = '';
  if (dataReq.prepareData !== undefined) {
    prepareData = dataReq.prepareData;
  }
  if (dataReq.process !== undefined) {
    process = dataReq.process;
  }
  const dta = {
    request: dataReq.request,
    data: [{
      params: [dataReq.data],
      where: {}
    }]
  };
  const queryData = strgf(dta);
  const setQuery = { prepareData, process, input: null, ouput: dta.request, url, method: 'POST', data: queryData, headers: hdJson, bodyType: 'body', respFormat: 'Json' };
  const reqSelet = [setQuery];
  const requests = [];
  const respQry = await sedRequest(reqSelet, requests, collector);
  const answerReq = respQry.find((res) => res.ouput === dataReq.request);
  return answerReq.answer;
}

const capitalizeFirstLetter = (str) => {
  const strLowerCase = str.toLowerCase();
  const upFirstL = str.charAt(0).toUpperCase();
  const restName = strLowerCase.slice(1);
  return `${upFirstL}${restName}`;
}

// Recorre JSON de Catalogos general.
const switchJsonParse = async (data, strTraceId, collector, ouput) => {
  const traceIdStr = strTraceId.split(',');
  const traceId = traceIdStr.map(parseInter);
  const id = traceId[0];
  const record = data[id];
  let resp;
  traceId.splice(0, 1);
  if (traceId.length > 0) {
    const strId = traceId.toString();
    await switchJsonParse(record.children, strId, collector, ouput);
  } else {
    const resp = { 
      ouput, 
      answer: { 
        correct: true, 
        resp:  [record]
      } 
    }
    collector.push(resp);
  }
}

const parseInter = (str) => {
  return parseInt(str);
}

const queryCodePhone = async (codePhone) => {
  let prepareData = '';
  let process = '';
  const dataReq = {
    request: 'catl-by-desc',
    data: [{
      params: [{ description: 'countries' }],
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
  const ouput = 'int-phone-code';
  const respQry = await sedRequest(reqSelet, requests, collector);
  const catalogQry = respQry.find(qry => qry.ouput === dataReq.request);
  const countries = catalogQry.answer.resp[0].data_jb;
  await switchJsonParse([countries], codePhone, collector, ouput);
  const answerReq = collector.find((res) => res.ouput === ouput);
  const correct = answerReq.answer.correct;
  const resp = answerReq.answer.resp;
  const intPhoneCode = resp[0].value;
  return intPhoneCode;
}

const getEstablishment = async (idEstablishment) => {
  const dataReq = {
    request: 'estab-by-id',
    data: {
      idEstablishment,
    }
  }
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
  const query = await sedRequest(reqSelet, requests, collector);
  const establishment = query.find(qry => qry.ouput === dataReq.request);
  return establishment.answer;
}

const sendAuth = async (dataReq) => {
  const resp = await fetch(
    urlAuthUsrSrv,
    {
      method: 'post',
      body: JSON.stringify(dataReq.data),
      headers: { 'Content-Type': 'application/json' }
    }
  )
  .then(res => res.json())
  .then(json => { return json })
  .catch(err => console.log(err));
  return resp;
}

const ctrUser = async (dataReq) => {
  let data = dataReq.data;
  const hash = await getHash();
  const name = data.name;
  const lastname = data.lastname;
  const module = dataReq.module;
  const mail = data.mail;
  const lastN = lastname.toUpperCase();
  const firstN = name.charAt(0).toUpperCase();
  const baseLogin = `${lastN}${firstN}`;
  const password = Math.floor(Math.random()*(10000-1000))+1000;
  let dataNcrypt = {
      hash,
      data: {
        dni: data.dni,
        name: data.name,
        lastname: data.lastname,
        login: baseLogin,
        password: password,
        mail: data.mail,
        phone: data.phone,
        idGoogle: data.idGoogle,
      }
  }
  let status = 400;
  let correct = false;
  let answer = '';

  let ncryptData = await ncrypt(dataNcrypt);
  if (ncryptData.message === 'Datos encriptados correctamente') {
    for (const key in ncryptData.data) {
      data[key] = ncryptData.data[key];
    }

    // Consulta si existe el DNI:
    const userByDNI = await getUserByDNI(data.dni);
    if (userByDNI.correct) {
      if (userByDNI.resp.length === 0) {
        var accountant = 0;

        // Genera login
        await generateLogin(baseLogin, hash, accountant, collector);
        const coll = collector.find(col => col.ouput === 'generate-login');
        if (coll !== undefined) {
          const collCorrect = coll.answer.correct;
          const resp = coll.answer.resp;
          const login = resp.login;
          const loginNcryp = resp.loginNcryp;

          if (collCorrect) {
            // Actualiza "login" en data
            data['login'] = loginNcryp;

            // Crea usuario
            const respCtrUsers = await sendCtrUsersNcrypt(data);

            if (respCtrUsers.correct) {

              try {
                // Envia correo
                const respCredMail = await sendCredentialsMail(name, lastname, module, mail, login, password);
                const objResp = JSON.parse(respCredMail);

                if (objResp.correct) {
                  status = 200;
                  correct = true;
                  answer = objResp.resp;
                } else {
                  answer = 'User created. Error sending credentials';
                }

              } catch (error) {
                answer = 'User created. Error sending credentials';
              }

            } else {
              answer = 'Error creating user';
            }
          } else {
            answer = 'Error generating login';
          }
        } else {
          answer = 'Error generating login: Undefined';
        }

      } else {// Usuario exite
        const userData = userByDNI.resp[0];

        // Desencriptar credenciales
        const dataDecrypt = {
          hash,
          data: {
            name: userData.name,
            lastname: userData.lastname,
            login: userData.login,
            password: userData.password_user,
            mail: userData.mail
          }
        }

        decryptData = await decrypt(dataDecrypt);

        if (decryptData.message === 'Datos descifrados correctamente') {

          try {
            // Envia correo
            const respCredMail = await sendCredentialsMail(decryptData.data.name, decryptData.data.lastname, module, decryptData.data.mail, decryptData.data.login, decryptData.data.password);
            const objResp = JSON.parse(respCredMail);

            if (objResp.correct) {
              status = 200;
              correct = true;
              answer = objResp.resp;
            } else {
              answer = 'User created. Error sending credentials';
            }

          } catch (error) {
            answer = 'User created. Error sending credentials';
          }

        } else {
          answer = 'Encrypt error';
        }

        status = 200;
        correct = true;
        answer = 'User exists';

      }

    } else {
      answer = 'Error when consulting user ID';
    }

  } else {
      answer = 'Encrypt error';
  }

  return { status, correct, answer };

}

usersCtr.getHashExt = async (req, res) => {
  const hash = await getHash();

  res.status(200).json({
    correct: true,
    resp: hash
  });
}

// 
usersCtr.sendOtp = async (req, res) => {
  const params = req.body;
  const { name, lastname, codePhone, phone, idEstablishment } = params;
  const codeOtp = Math.floor(Math.random()*(10000-1000))+1000;
  var collector = [];
  let status = 400;
  let correct = false;
  let respCtrUpd = {
    correct: false
  };
  let answer = '';
  let respSrv;
  const intPhoneCode = await queryCodePhone(codePhone);

  const dataReq = {
    request: 'usr-by-login-pass',
    typeAut: 'otp', // standar | otp | google
    data: {
      login: `${intPhoneCode}${phone}`
    }
  };

  /* --- Consulta si exite el usuario --- */
  const userQry = await getUser(dataReq);

  if (userQry.correct) {
    const ansUsrQry = userQry.resp;
    if (ansUsrQry.length > 0) {

      /* --- Si existe el usuario --- */
      // Actualiza codeOtp
      const dataReqUpate = {
        request: 'upd-users',
        data: {
          idUser: ansUsrQry[0].id_user,
          codeOtp,
        }
      };
      respCtrUpd = await genericUpdUsers(dataReqUpate);
      
    } else {
      /* --- Si No existe el usuario. --- */
      // Crea el usuario
      const dataCrtUser = {
        dni: '',
        name,
        lastname,
        login: `${intPhoneCode}${phone}`,
        password: '',
        mail: '',
        codePhone: JSON.stringify({codePhone}),
        phone,
        idGoogle: '',
        idHashAlastria: '',
        idCatRoluser: JSON.stringify(params.idCatRoluser),// patient
        userStructure: JSON.stringify(params.userStructure),
        idCatAccesstype: JSON.stringify(params.idCatAccesstype),// sms
        idEstablishment,
        idCatNotification: JSON.stringify(params.idCatNotification),// sms
        regStatus: 'onhold',
        keyZoom: '',
        codeOtp
      };
      respCtrUpd = await sendCtrUsers(dataCrtUser);
    }
  
    if (respCtrUpd.correct) {
      /* --- Al final de las dos opciones anteriores --- */
      //  Envio de Otp
      const number = `${intPhoneCode}${phone}`;
      const msgType = 'code';
      const dataOtpSend = `name=${name} ${lastname}&number=${number}&code=${codeOtp}&type=${msgType}`;
      const setOtpSend = { prepareData: '', process: '', input: null, ouput: 'otp_send', url: urlServerOtp, method: 'POST', data: dataOtpSend, headers: hdForm, bodyType: 'body', respFormat: 'Text' };
      const requests = [];
      const reqSelet = [setOtpSend];
  
      // Cascada sendOtp
      // const otpAnswer = await sedRequest(reqSelet, requests, collector);
  
      const otpAnswer = 'Ok otp';

      status = 200;
      correct = true;
      answer = otpAnswer;
  
    } else {
      answer = 'Error creating or updating user';
    }

  } else {
    answer = 'Failed to query the user';
  }
  res.status(status).json({
    correct,
    resp: answer
  });
};

usersCtr.ctrUserInt = async (dataReq) => {
  const resp = await ctrUser(dataReq);
  return resp;
};

// 
usersCtr.ctrUser = async (req, res) => {
  const resp = await ctrUser(req.body);
  res.status(resp.status).json({ correct: resp.correct, resp: resp.answer });
};

// 
usersCtr.updUser = async (req, res) => {



};

usersCtr.auth = async (req, res) => {
  const params = req.body;
  const { codePhone, phone, idGoogle } = params;
  const idCatAccesstype = params.idCatAccesstype.idCatAccesstype;
  // let request;
  let status = 400;
  let correct = false;
  let answer = '';
  let previousRequir = true;
  let respCtr = {
    correct: false
  };
  let dataReq = {};
  switch (idCatAccesstype) {
    case '0,0,0':
        // request = 'auth-google';
        params.login = idGoogle;
        const dataReq = {
          request: 'usr-by-login-pass',
          typeAut: 'google',
          data: {
            login: idGoogle
          }
        };
        /* --- Consulta si exite el usuario --- */
        const userQry = await getUser(dataReq);
        if (userQry.correct) {
          const ansUsrQry = userQry.resp;
          if (ansUsrQry.length === 0) {
            /* --- Si No existe el usasrio. --- */
            // Crea el usuario
            const dataCrtUser = {
              dni: '',
              name: '',
              lastname: '',
              login: params.login,
              password: '',
              mail: params.mail,
              codePhone: JSON.stringify({codePhone: ""}),
              phone: '',
              idGoogle: params.idGoogle,
              idHashAlastria: '',
              idCatRoluser: JSON.stringify({idCatRoluser: "0,1,0"}),// patient
              userStructure: JSON.stringify({userStructure: []}),
              idCatAccesstype: JSON.stringify(params.idCatAccesstype),// sms
              idEstablishment: params.idEstablishment,
              idCatNotification: JSON.stringify(params.idCatNotification),// sms
              regStatus: '',
              keyZoom: '',
              codeOtp: null
            };
            respCtr = await sendCtrUsers(dataCrtUser);
          } else {
            respCtr.correct = true;
          }
        
          if (!respCtr.correct) {
            previousRequir = false;
            answer = 'Error creating user';
          }
        } else {
          answer = 'Failed to query the user';
        }
      break;
    case '0,1,0':
        request = 'auth-otp';
        const codePh = codePhone.codePhone;
        const intPhoneCode = await queryCodePhone(codePh);
        params.login = `${intPhoneCode}${phone}`;
      break;        
  }
  
  if (previousRequir) {
    // dataReq.request = request;
    dataReq.data = params;
    const authAnswer = await sendAuth(dataReq);

    if (authAnswer.correct) {
      if (authAnswer.resp !== 'Denied') {
        const resp = authAnswer.resp;
        const idEstablishment = parseInt(resp.data.idEstablishment);
        const establishment = await getEstablishment(idEstablishment);
        if (establishment.correct) {
          if (establishment.resp.length > 0) {
            authAnswer.resp.data['idCustomer'] = establishment.resp[0].id_customer;
            answer = authAnswer.resp;

            /* Agrega el código telefónico internacional del país */
            const codePh = answer.data.codePhone.codePhone;
            const intPhoneCode = await queryCodePhone(codePh);
            answer.data['intPhoneCode'] = intPhoneCode;

            correct = true;
            status = 200;
            
          } else {
            answer = 'Error: Establishment does not exist';
          }
        } else {
          answer = 'Failed to query the setting';
        }
      } else {
        answer = authAnswer.resp;
        correct = true;
        status = 200;
      }
    } else {
      answer = 'Failed to query or create user';
    }
  }

  res.status(status).json({
    correct,
    resp: answer
  });

};

module.exports = usersCtr;