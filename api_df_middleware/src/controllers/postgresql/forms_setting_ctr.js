const request = require("request");
const { urlSrv, urls } = require('../../global/global_data');
const formsSettingCtr = {};

formsSettingCtr.list = (req, res) => {
  const url = `${urlSrv}${urls.setFrmSrv}`;

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

formsSettingCtr.create = (req, res) => {
  const url = `${urlSrv}${urls.crtSetFrmSrv}`;
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

formsSettingCtr.getById = (req, res) => {
  const { id } = req.params;
  const url = `${urlSrv}${urls.getSetFrmSrv}/${id}`;

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

formsSettingCtr.upDate = (req, res) => {
  const { id, type } = req.params;
  const dataSet = JSON.stringify(req.body);
  const url = `${urlSrv}${urls.updSetFrmSrv}/${id}.${type}.${dataSet}`;

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

formsSettingCtr.delete = (req, res) => {
  let { id } = req.params,
      url = `${urlSrv}${urls.dltSetFrmSrv}/${$id}`;

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

module.exports = formsSettingCtr;