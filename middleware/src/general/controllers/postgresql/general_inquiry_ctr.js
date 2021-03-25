/*  
  1.- El formato de los parámetros que debe llegar por el req(req.body o req.params),
    deben ser un json con los "params" configurados en la tabla correspondiente en el archivo "tablesSet" del Back, Ej:
    
    req.<body || params> = {
      request: 'request name',
      prepareData: 'prepareData name' || '',
      process: 'process name' || '',
      data: {
        param1: 'value1',
        param2: 'value2',
        param3: 'value3',
        param4: 'value4'    
      }
    }

  2.- El formato para enviar al "generatorRequest" es, Ej:

    const objDta = [{
      params: [req.<body || params>.data],
      where: {}
    }];

    en modo stringify.
*/

const generatorRequest = require('../../global/generator_request');
const { urlSrv, urls, hdJson } = require('../../global/global_data');
const generalInquiryCtr = {};

const url = `${urlSrv}${urls.genQuerySrv}`;

// var collector = [];

// Format to send the appointment reminder
const dateFormat = (data) => {
  const d = new Date(data);
  return d.getDate()+"/"+d.getMonth()+"/"+d.getFullYear()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
}

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

generalInquiryCtr.query = async (req, res) => {
  var collector = [];
  let dataReq;
  let prepareData = '';
  let status = 200;
  if (req.body) {
    dataReq = req.body
  }
  if (req.params.data) {
    dataReq = req.params
  }
  if (dataReq.prepareData !== undefined) {
    prepareData = dataReq.prepareData;
  }
  const objDta =   [{
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
  .catch((err) => prepareLog({ module: 'generalInquiryCtr', process: 'query', line: '80', data: '', err }));

  // if (!resp[0].answer.correct) {
  //   status = 400;
  // }

  res.status(status).json(resp);
}

module.exports = generalInquiryCtr;