const request = require("request");
const generatorRequest = require('../../global/generator_request');
const { urlSrv, urls, hdJson } = require('../../global/global_data');
const ProcessCtr = {};

const url = `${urlSrv}${urls.genQuerySrv}`;
const urlProcess = `${urlSrv}${urls.getProcessDetail}`;
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

const sedrequest = async (dataReq) => {
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

  const resp = await generatorRequest(reqSelet, requests, collector)
    .then((resp) => { return resp })
    .catch((err) => prepareLog({ module: 'generalInquiryCtr', process: 'query', line: '34', data: '', err }));

  return resp;

}

ProcessCtr.getProcessDById = async (req, res) => {
  var response = "";
  const dataHead = {
    process: '',
    request: 'struc-by-id',
    url,
    data: {
      idCatProcess_P: req.body.idCatProcess.procedures,
      idCatProcess_S: req.body.idCatProcess.specialties
    }
  }
   
  const head = await sedrequest(dataHead);
  const idProcess=head[0].answer.resp[0].id_struc_proc;
  if (head[0].answer.correct) {
    const dataBody = {
      process: '',
      request: 'struc-detail-by-id',
      url: urlProcess,
      data: {
        idStrucProc: idProcess
      }
    }
    const body = await sedrequest(dataBody);
    response={
      "correct": true,
      "resp": [
        {
          "header":head[0].answer.resp,
          "body": body[0].answer.resp
        }
      ]
    };
  
  }
  //console.log(response);
  res.send(response);
};

module.exports = ProcessCtr;