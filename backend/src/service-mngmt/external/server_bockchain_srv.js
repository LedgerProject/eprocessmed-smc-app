const generatorRequest = require('../../general/global/functions/generator_request');
const { rootBockchCrypt, urls, hdJson } = require('../../general/global/data/global_data');
const urlNcryptSrv = `${rootBockchCrypt}${urls.ncryptSrv}`;
const urlDecryptSrv = `${rootBockchCrypt}${urls.decryptSrv}`;

const serverBockchainSrv = {};
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

const sedRequest = async (dataReq) => {
  let prepareData = '';
  let process = '';
  if (dataReq.prepareData !== undefined) {
    prepareData = dataReq.prepareData;
  }
  if (dataReq.process !== undefined) {
    process = dataReq.process;
  }  
  const queryData = strgf(dataReq.data);
  const setQuery = { prepareData, process, input: null, ouput: dataReq.ouput, url: dataReq.url, method: 'POST', data: queryData, headers: hdJson, bodyType: 'body', respFormat: 'Json' };
  const reqSelet = [setQuery];
  const requests = [];

  const resp = await generatorRequest(reqSelet, requests, collector)
  .then((resp) => { return resp })
  .catch((err) => prepareLog({ module: 'serverBockchainSrv', process: dataReq.ouput, line: '34', data: '', err }));
  return resp;
}

serverBockchainSrv.ncrypt = async (data, hash) =>  {
  const dataReq = {
    ouput: 'ncrypt',
    url: urlNcryptSrv,
    data: {
      datos: data,
      clave: `${hash}`
    }
  }
  const answer = await sedRequest(dataReq);
  return answer;
}

serverBockchainSrv.decrypt = async (data, hash) =>  {
  const dataReq = {
    ouput: 'decrypt',
    url: urlDecryptSrv,
    data: {
      datos: data,
      clave: `${hash}`
    }
  }
  const answer = await sedRequest(dataReq);
  return answer;
}


module.exports = serverBockchainSrv;