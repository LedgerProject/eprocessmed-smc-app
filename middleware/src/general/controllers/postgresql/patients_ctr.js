const generatorRequest = require('../../global/functions/generator_request');
const bockchainRequest = require('../services/server_bockchain_ctr');
const { urlSrv, urls, hdJson } = require('../../global/data/global_data');
const patientsCtr = {};

const url = `${urlSrv}${urls.genQuerySrv}`;
var collector = [];

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

const sedRequest = async (reqSelet, requests, collector) => {
  const resp = await generatorRequest(reqSelet, requests, collector)
  .then((resp) => { return resp })
  .catch((err) => prepareLog({ module: 'generalInquiryCtr', process: 'query', line: '26', data: '', err }));
  return resp;
}

const ctrUpdPatients = async (dataReq) => {
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
  return sedRequest(reqSelet, requests, collector);  
}

const ncrypt = async (dataNcrypt) => {
  const hash = dataNcrypt.hash;
  const data = dataNcrypt.data;
  const resp = await bockchainRequest.ncrypt(data, hash);
  const answerNcrypt = resp.find(dta => dta.ouput === 'ncrypt');
  return answerNcrypt.answer;
}

patientsCtr.ctrUpd = async (req, res) => {
  let dataReq;
  if (req.body) {
    dataReq = req.body
  }
  if (req.params.data) {
    dataReq = req.params
  }
  
  const request = dataReq.request;
  let params = dataReq.data;
  let respSrv;
  let respCtrUpd;
  // consultar hash por el id del params."idEstablishment"
  const respEst = await getEstablishment(params.idEstablishment);
  const respEstb = respEst.find(resp => resp.ouput === 'estab-by-id');
  const correctEstb = respEstb.answer.correct;
  const answerEstb = respEstb.answer.resp;

  if (correctEstb) {
    const hash = answerEstb[0].hash;
    const dataNcrypt = {
      hash,
      data: {
        noClinicHistory: params.noClinicHistory,
        dni: params.dni,
        namePatient: params.namePatient,
        lastname: params.lastname,
        address: params.address,
        mail: params.mail,
        phone: params.phone,
        legalRepresentative: params.legalRepresentative,
        dniRepLegal: params.dniRepLegal,
        nameRepLegal: params.nameRepLegal,
        lastnameRepLegal: params.lastnameRepLegal,
        addressRepLegal: params.addressRepLegal,
        mailRepLegal: params.mailRepLegal,
        phoneRepLegal: params.phoneRepLegal,
        nameEmecon: params.nameEmecon,
        lastnameEmecon: params.lastnameEmecon,
        phoneEmecon: params.phoneEmecon,
        addressEmecon: params.addressEmecon
      }
    }
    //  Enviar parametros a encriptar
    const ncryptData = await ncrypt(dataNcrypt);

    if (ncryptData.message === 'Datos encriptados correctamente') {
      for (const key in ncryptData.data) {
        params[key] = ncryptData.data[key];
      }

      respSrv = await ctrUpdPatients(dataReq);
      respCtrUpd = respSrv.find(resp => resp.ouput === request);

      if (respCtrUpd !== undefined) {
        res.status(200).json(respCtrUpd.answer);
      } else {
        res.status(400).json({
          correct: false,
          resp: 'Error al crear o editar'
        });
      }
    } else {
      res.status(400).json({
        correct: false,
        resp: 'Error al encriptar'
      });
    }
  } else {
    res.status(400).json({
      correct: false,
      resp: 'Error getEstablishment'
    });
  }
};

const getPatientByStb = async (idEstablishment) => {
  const dataReq = {
    request: 'pat-by-stablishment',
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
  return sedRequest(reqSelet, requests, collector);
}

//METODO QUE DEVUELVE PACIENTES CON DATOS DESENCRIPTADOS POR CENTRO DE SALUD
patientsCtr.getPatientsByStablishment = async (req, res) => {
  const idEstablishment = req.body.idEstablishment;
  const patients = await getPatientByStb(idEstablishment);
  const respEst = await getEstablishment(idEstablishment);
  const respEstb = respEst.find(resp => resp.ouput === 'estab-by-id');
  const correctEstb = respEstb.answer.correct;
  const answerEstb = respEstb.answer.resp;
  let status = 400;

  const defaultDecrypt =   {
    no_clinic_history: '',
    dni: '',
    name_patient: '',
    lastname: '',
    address: '',
    mail: '',
    phone: '',
    legal_representative: '',
    dni_rep_legal: '',
    name_rep_legal: '',
    lastname_rep_legal: '',
    address_rep_legal: '',
    mail_rep_legal: '',
    phone_rep_legal: '',
    name_emecon: '',
    lastname_emecon: '',
    phone_emecon: '',
    address_emecon: ''
  }
  
  if (correctEstb) {
    const hash = answerEstb[0].hash;
    const resPat = patients.find(resp => resp.ouput === 'pat-by-stablishment');
    var answerPat = resPat.answer.resp;
    const longitud=answerPat.length;
    for (let i = 0; i < longitud; i++) {
      status = 400;
      let decrypt = defaultDecrypt;
      for (var key in decrypt) {
        decrypt[key] = answerPat[i][key];
      } 
      const answerDecrypt = await bockchainRequest.decrypt(decrypt, hash);
      const resp = answerDecrypt.find(element => element.ouput === 'decrypt');
      const message = resp.answer.message;
      const data = resp.answer.data;

      if (message === 'Datos descifrados correctamente') {
        for  (var key in data) {
          answerPat[i][key] = data[key];
        }
        status = 200;
      }
    }
  }
  res.status(status).json(answerPat);
}

module.exports = patientsCtr;