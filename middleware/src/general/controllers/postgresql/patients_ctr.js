const generatorRequest = require('../../global/generator_request');
const bockchainRequest = require('./server_bockchain_ctr');
const { urlSrv, urls, hdJson } = require('../../global/global_data');
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

const createPatients = async (dataReq) => {
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
    process: '',
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

const updatePatient = async (idPatient, dni) => {
  const dataReq = {
    process: '',
    request: 'upd-patients',
    data: {
      idPatient,
      dni
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

patientsCtr.create = async (req, res) => {
  let dataReq;
  if (req.body) {
    dataReq = req.body
  }
  if (req.params.data) {
    dataReq = req.params
  }
  // Guardar los datos con la función general
  // Esperar id del registro
  const respCreate = await createPatients(dataReq);
  const respC = respCreate.find(resp => resp.ouput === 'rgt-patients');
  if (respC !== undefined) {
    const answerC = respC.answer.resp
    const correctC = respC.answer.correct;
    const params = dataReq.data[0].params[0];
    // Si la inserción es exitosa.
    if (correctC) {
      // consultar hash por el id del params."idEstablishment"
      const respEst = await getEstablishment(params.idEstablishment);
      const respEstb = respEst.find(resp => resp.ouput === 'estab-by-id');
      const correctEstb = respEstb.answer.correct;
      const answerEstb = respEstb.answer.resp;
      if (correctEstb) {
        const hash = answerEstb[0].hash;
        const idPatient = answerC[0].id_patient;
        // Ncrypt
        const respNcrypt = await bockchainRequest.ncrypt(params.dni, hash);
        const answerNcrypt = respNcrypt.find(dta => dta.ouput === 'ncrypt');
        const message = answerNcrypt.answer.message;
        if (message === 'Datos encriptados correctamente') {
          const dataNcrypt = answerNcrypt.answer.body.hash.encr_texto;
          // Hace update al "hash".
          const respUpdate = await updatePatient(idPatient, dataNcrypt);
          const updPatients = respUpdate.find(dta => dta.ouput === 'upd-patients');
          res.status(200).json({
            correct: true,
            resp: updPatients.answer
          });
        } else {
          res.status(400).json({
            correct: false,
            resp: 'Error al consultar hash'
          });
        }
      } else {
        res.status(400).json({
          correct: false,
          resp: 'Error getEstablishment'
        });
      }
    } else {
      res.status(400).json({
        correct: false,
        resp: 'Error al crear'
      });
    }
  } else {
    res.status(400).json({
      correct: false,
      resp: 'Error al crear'
    });
  }
};

module.exports = patientsCtr;