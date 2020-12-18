const request = require("request");
const { urlSrv, urls } = require('../../global/global_data');
const custFrmsCtr = {};

custFrmsCtr.list = (req, res) => {
  const url = `${urlSrv}${urls.custFrmSrv}`;
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

custFrmsCtr.create = (req, res) => {
  const url = `${urlSrv}${urls.crtCustFrmSrv}`;
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

custFrmsCtr.getById = (req, res) => {
  const { id } = req.params;
  const url = `${urlSrv}${urls.getCustFrmSrv}/${id}`;

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

custFrmsCtr.upDate = (req, res) => {
  const { id, type } = req.params;
  const dataSet = JSON.stringify(req.body);
  const url = `${urlSrv}${urls.updCustFrmSrv}/${id}.${type}`;

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

custFrmsCtr.delete = (req, res) => {
  let { id } = req.params,
      url = `${urlSrv}${urls.dltCustFrmSrv}/${$id}`;

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

module.exports = custFrmsCtr;