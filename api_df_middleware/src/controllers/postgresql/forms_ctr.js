const request = require("request");
const { urlSrv, urls } = require('../../global/global_data');
const formsCtr = {};

formsCtr.list = (req, res) => {
  const url = `${urlSrv}${urls.frmSrv}`;

  request({
    url: url,
    json: true,
    method: 'GET'
    },  (error, response, body) => {
      if (!error && response.statusCode === 200) {
        res.send(body);
      }
    })
};

formsCtr.create = (req, res) => {
  const dataSet = JSON.stringify(req.body);

  // Estructura de "dataSet"
  let segments = [{"name":"Datos Personales","description":"Sección de datos personales"},{"name":"Datos Medicos","description":"Sección de datos medicos"},{"name":"Datos Varios","description":"Sección de datos varios"}];
  let pages = [[],[],[],[],[],[]];
  let questions = [
        {"name":"Pregunta 1","description":"Descripción 1","items":"","type":"Text","status":"on"},
        {"name":"Pregunta 2","description":"Descripción 2","items":"","type":"Text","status":"on"},
        {"name":"Pregunta 3","description":"Descripción 3","items":"","type":"Textarea","status":"on"},
        {"name":"Pregunta 4","description":"Descripción 4","items":["Item1", "Item2", "Item3", "Item4", "Item5"],"type":"Radio","status":"on"},
        {"name":"Pregunta 5","description":"Descripción 5","items":["Item1", "Item2", "Item3", "Item4", "Item5"],"type":"Checkbox","status":"on"},
        {"name":"Pregunta 6","description":"Descripción 6","items":["Item1", "Item2", "Item3"],"type":"Checkbox","status":"on"},
        {"name":"Pregunta 7","description":"Descripción 7","items":["Item1", "Item2"],"type":"Combobox","status":"on"},
        {"name":"Pregunta 8","description":"Descripción 8","items":"","type":"Text","status":"on"},
        {"name":"Pregunta 9","description":"Descripción 99","items":["Item1", "Item2", "Item3", "Item4", "Item5"],"type":"Radio","status":"on"},
        {"name":"Pregunta 10","description":"Descripción 10","items":["Item1", "Item2", "Item3"],"type":"Combobox","status":"on"},
        {"name":"Pregunta 11","description":"Descripción 11","items":["Item1", "Item2"],"type":"Checkbox","status":"on"},
        {"name":"Pregunta 12","description":"Descripción 12","items":["Item1", "Item2", "Item3", "Item4"],"type":"Combobox","status":"on"},
        {"name":"Pregunta 13","description":"Descripción 13","items":["Item1", "Item2", "Item3", "Item4", "Item5"],"type":"Radio","status":"on"},
        {"name":"Pregunta 14","description":"Descripción 14","items":["Item1", "Item2", "Item3", "Item4"],"type":"Checkbox","status":"on"},
        {"name":"Pregunta 15","description":"Descripción 15","items":["Item1", "Item2", "Item3", "Item4"],"type":"Combobox","status":"on"},
        {"name":"Pregunta 16","description":"Descripción 16","items":["Item1", "Item2", "Item3", "Item4"],"type":"Radio","status":"on"},
        {"name":"Pregunta 17","description":"Descripción 17","items":["Item1", "Item2", "Item3", "Item4", "Item5"],"type":"Checkbox","status":"on"}
      ];

  let structure = {
    segments,
    pages,
    questions
  }

  let strStruct = JSON.stringify(structure);

  let data = `{"name":"Covid-19 2050","description":"Descripción Covid-19 2050","structure":${strStruct}}`;

  const url = `${urlSrv}${urls.crtFrmSrv}`;

  request({
    url: url,
    json: true,
    method: 'POST',
    body: req.body
    },  (error, response, body) => {
      if (!error && response.statusCode === 200) {
        res.send(body);
      }
    })
};

formsCtr.getById = (req, res) => {
  const { id } = req.params;
  const url = `${urlSrv}${urls.getFrmSrv}/${id}`;

  request({
    url: url,
    json: true,
    method: 'GET'
    },  (error, response, body) => {

      if (!error && response.statusCode === 200) {
        res.send(body);
      }

  })
};

formsCtr.upDate = (req, res) => {
  const { id, type } = req.params;
  const dataSet = JSON.stringify(req.body);
  const url = `${urlSrv}${urls.updFrmSrv}/${id}.${type}.${dataSet}`;

  request({
  url: url,
  json: true,
  method: 'PUT'
  },  (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    }
  })
};

formsCtr.delete = (req, res) => {
  let { id } = req.params,
      url = `${urlSrv}${urls.dltFrmSrv}/${$id}`;

  request({
  url: url,
  json: true,
  method: 'DELETE'
  },  (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    }
  })
}

module.exports = formsCtr;