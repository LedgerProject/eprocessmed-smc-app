const generatorRequest = require('../../global/functions/generator_request');
const bockchainRequest = require('../services/server_bockchain_ctr');
const { urlSrv, urls, hdJson } = require('../../global/data/global_data');
const stablishmentCtr = {};

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

const ncrypt = async (dataNcrypt) => {
  const hash = dataNcrypt.hash;
  const data = dataNcrypt.data;
  const resp = await bockchainRequest.ncrypt(data, hash);
  const answerNcrypt = resp.find(dta => dta.ouput === 'ncrypt');
  return answerNcrypt.answer;
}

const createEstablishment = async (dataReq) => {
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

const updatEstab = async (dataReq) => {
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

stablishmentCtr.ctrUpd = async (req, res) => {
  let dataReq;
  if (req.body) {
    dataReq = req.body
  }
  if (req.params.data) {
    dataReq = req.params
  }
  const request = dataReq.request;
  let requestUpd = dataReq.request;
  const params = dataReq.data;
  if (request === 'rgt-establishment') {
    requestUpd = 'upd-ncrypt-establ';
    // Crea al Usuario
    // Esperar id del registro
    const respCreate = await createEstablishment(dataReq);
    const respC = respCreate.find(resp => resp.ouput === 'rgt-establishment');
    if (respC !== undefined) {
      const answerC = respC.answer.resp
      params.idEstablishment = answerC[0].id_establishment;
    }
  }

  // Si la inserción es exitosa.
  if (params.idEstablishment !== '') {
    // Solicita "hash" del "DNI" a la blockchain.
    const respHash = await bockchainRequest.sendHash(params.idEstablishment, params);
    const respH = respHash.find(resp => resp.ouput === 'sedhash');
    if (respH !== undefined) {
      const answer = respH.answer;
      const hash = answer.hash;
      const urlhash = answer.alastria;
      const dataNcrypt = {
        hash,
        data: {
          dni: params.dni,
          address: params.address,
          mail: params.mail,
          phone: params.phone,
          contactName: params.contactName,
          contactPhone: params.contactName            
        }
      }

      // Ncrypt
      const respNcrypt = await ncrypt(dataNcrypt);
      if (respNcrypt.message === 'Datos encriptados correctamente') {
        let dataUpdate;
        if (requestUpd === 'upd-ncrypt-establ') {
          dataUpdate = respNcrypt.data;
          dataUpdate['idEstablishment'] = params.idEstablishment;
          dataUpdate['hash'] = hash;
          dataUpdate['urlhash'] = urlhash;  
        } else {
          dataUpdate = params;
          for (const key in respNcrypt.data) {
            if (Object.hasOwnProperty.call(respNcrypt.data, key)) {
              dataUpdate[key] = respNcrypt.data[key];
            }
          }
        }

        const dataReq = {
          request: requestUpd,
          data: dataUpdate
        }

        // Hace update al "hash".
        const respUpdate = await updatEstab(dataReq);
        const updEstablishment = respUpdate.find(dta => dta.ouput === requestUpd);
        res.status(200).json({
          correct: true,
          resp: [updEstablishment]
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
        resp: 'Error al consultar hash'
      });
    }
    
  } else {
    res.status(400).json({
      correct: false,
      resp: 'Error al crear'
    });
  }

};

module.exports = stablishmentCtr;