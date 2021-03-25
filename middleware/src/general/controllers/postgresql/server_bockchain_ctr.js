const generatorRequest = require('../../global/generator_request');
const { rootBockchHash, rootBockchCrypt, urls, hdJson } = require('../../global/global_data');
const urlSendHash = `${rootBockchHash}${urls.hashSendSrv}`;
const urlCallHash = `${rootBockchHash}${urls.hashCallSrv}`;
const urlNcryptSrv = `${rootBockchCrypt}${urls.ncryptSrv}`;
const urlDecryptSrv = `${rootBockchCrypt}${urls.decryptSrv}`;

const serverBockchainCtr = {};
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
  if (dataReq.prepareData !== undefined) {
    prepareData = dataReq.prepareData;
  }
  const queryData = strgf(dataReq.data);
  const setQuery = { prepareData, process: dataReq.process, input: null, ouput: dataReq.ouput, url: dataReq.url, method: 'POST', data: queryData, headers: hdJson, bodyType: 'body', respFormat: 'Json' };
  const reqSelet = [setQuery];
  const requests = [];
  const resp = await generatorRequest(reqSelet, requests, collector)
  .then((resp) => { return resp })
  .catch((err) => prepareLog({ module: 'serverBockchainCtr', process: dataReq.ouput, line: '34', data: '', err }));
  return resp;
}

serverBockchainCtr.sendHash = async (idestablishment, params) => {
  const d = new Date();
  const dataReq = {
    process: '',
    ouput: 'sedhash',
    url: urlSendHash,
    data: {
      idb: `${idestablishment}`,
      field1: params.description,
      field2: params.dni,
      field3: "",
      field4: "",
      creation_date: `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
    }
  }
  const answer = await sedRequest(dataReq);
  return answer;
};

serverBockchainCtr.callHash = async (idb) => {// ERROR
  const dataReq = {
    process: '',
    ouput: 'callHash',
    url: urlCallHash,
    data: {
      idb: `${idb}`
    }
  }

  console.log('dataReq +++++');
  console.log(dataReq);  

  const answer = await sedRequest(dataReq);

  console.log('answer');
  console.log(answer);

  return answer;
}

serverBockchainCtr.sendHashPdf = async (params) => {
  const d = new Date();
  const dataReq = {
    process: '',
    ouput: 'sedhash',
    url: urlSendHash,
    data: {
      idb: params.id,
      field1: params.binario,
      field2: "",
      field3: "",
      field4: "",
      creation_date: `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
    }
  }
  const answer = await sedRequest(dataReq);
  return answer;
};

serverBockchainCtr.ncrypt = async (data, hash) =>  {
  const dataReq = {
    process: '',
    ouput: 'ncrypt',
    url: urlNcryptSrv,
    data: {
      datos: `${data}`,
      clave: `${hash}`
    }
  }
  const answer = await sedRequest(dataReq);
  return answer;
}

serverBockchainCtr.decrypt = async (data, hash) =>  {
  const dataReq = {
    process: '',
    ouput: 'decrypt',
    url: urlDecryptSrv,
    data: {
      datos: `${data}`,
      clave: `${hash}`
    }
  }
  const answer = await sedRequest(dataReq);
  return answer;
}

// 
serverBockchainCtr.ndecrypt = async (req, res) =>  {
  const data = req.body.data;
  let ndecrypt;
  let resp;
  switch (req.body.request) {
    case 'ncrypt':
        ndecrypt = await serverBockchainCtr.ncrypt(data.data, data.hash);
        resp = ndecrypt.find(dta => dta.ouput === 'ncrypt');
      break;    
    case 'decrypt':
        ndecrypt = await serverBockchainCtr.decrypt(data.data, data.hash);
        resp = ndecrypt.find(dta => dta.ouput === 'decrypt');
      break;
  }
  const answer = resp.answer;
  res.status(200).json({
    correct: true,
    resp: answer
  });
}

module.exports = serverBockchainCtr;