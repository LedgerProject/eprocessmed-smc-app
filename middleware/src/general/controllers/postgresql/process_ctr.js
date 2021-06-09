const request = require("request");
const generatorRequest = require('../../global/functions/generator_request');
const { urlSrv, urls, hdJson } = require('../../global/data/global_data');
const processCtr = {};

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

processCtr.getProcessDById = async (req, res) => {
  var response = "";
  let status = 400;
  let correct = false;
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
    correct = true;
    status = 200;  
    const dataBody = {
      process: '',
      request: 'struc-detail-by-id',
      url: urlProcess,
      data: {
        idStrucProc: idProcess
      }
    }
    const body = await sedrequest(dataBody);
    const resDet = body.find(resp => resp.ouput === 'struc-detail-by-id');
    var answerDet = resDet.answer.resp;
  }
  const retorno=[
    {
      "header":head[0].answer.resp,
      "body": answerDet
    }
  ]
  res.status(status).json({
    correct,
    resp: retorno
  });

};

processCtr.getProcessDByIdFront=async (req, res) => {
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
    const resDet = body.find(resp => resp.ouput === 'struc-detail-by-id');
    var answerDet = resDet.answer.resp;
    //aqui estructuro el process orden para el front de firma en casa
    var header=head[0].answer.resp;
    var arrayBody=[];
    var element={
      order:"",
      information:""
    };
    for (let i = 0; i < answerDet.length; i++) { 
        element={
         order:answerDet[i].order_proc,
         information:answerDet[i].information
        }
        arrayBody.push(element);
    }
    response={
      "correct": true,
      "resp": [
        {
          "header":header[0].structure_header,
          "body": {
            text:arrayBody
          }
        }
      ]
    };
  
  }
  res.send(response);
};

module.exports = processCtr;