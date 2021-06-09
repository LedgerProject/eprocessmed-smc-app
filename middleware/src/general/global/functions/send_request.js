const generatorRequest = require('./generator_request');
const { hdJson, hdText, hdForm } = require('../data/global_data');
const sendRequest = {};
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

const sendReq = async (dataReq, type) => {
  const request = dataReq.request;
  let queryData;

  if (type === 'internal') {
    queryData = dataReq;
  } else {
    queryData = dataReq.data;
  }

  let setQuery = {
    prepareData: '', 
    process: '', 
    input: null, 
    ouput: request,
    url: '',
    method: 'POST', 
    data: '',
    headers: hdJson, 
    bodyType: 'body', 
    respFormat: 'Json'
  }

  for (const key in setQuery) {
    if (dataReq[key] !== undefined) {
      setQuery[key] = dataReq[key];
    }
  }

  setQuery.data = strgf(queryData);

  const reqSelet = [setQuery];
  const requests = [];
  const resp = await generatorRequest(reqSelet, requests, collector)
    .then((resp) => { return resp })
    .catch((err) => prepareLog({ module: 'sendRequest', process: 'query', line: '48', data: '', err }));
  return resp;
}

prepareReq = (dataReq, type) => {
  if (type === 'internal') {
    const objDta = [{
      params: [dataReq.data],
      where: {}
    }];
    dataReq.data = objDta;    
  }
  return dataReq;
}

sendRequest.send = async (dataReq, type) => {
  const data = await prepareReq(dataReq, type);
  const resp = await sendReq(data, type);
  return resp;
};

sendRequest.sendExt = async (req, res) => {
  console.glog('req.body');
  console.glog(req.body);

};

module.exports =  sendRequest;