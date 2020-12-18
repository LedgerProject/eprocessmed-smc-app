const request = require("request");
const { urlSrv, urls } = require('../../global/global_data');
const parametersCtr = {};

parametersCtr.list = (req, res) => {
  const url = `${urlSrv}${urls.paramsSrv}`;

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

// parametersCtr.create = (req, res) => {
//   const dataSet = JSON.stringify(req.body);
//   const url = `${urlSrv}${urls.crtFrmSrv}/${dataSet}`;

//   request({
//     url: url,
//     json: true,
//     method: 'POST',
//     },  (error, response, body) => {
//       if (!error && response.statusCode === 200) {
//         res.send(body);
//       }
//     })
// };

// parametersCtr.getById = (req, res) => {
//   const { id } = req.params;
//   const url = `${urlSrv}${urls.getFrmSrv}/${id}`;

//   request({
//     url: url,
//     json: true,
//     method: 'GET'
//     },  (error, response, body) => {
//       let data = {forms:body.resp};
//     if (!error && response.statusCode === 200) {
//       res.send(body);
//     }
//   })
// };

// parametersCtr.upDate = (req, res) => {
//   const { id, type } = req.params;
//   const dataSet = JSON.stringify(req.body);
//   const url = `${urlSrv}${urls.updFrmSrv}/${id}.${type}.${dataSet}`;

//   request({
//   url: url,
//   json: true,
//   method: 'PUT'
//   },  (error, response, body) => {
//     if (!error && response.statusCode === 200) {
//       res.send(body);
//     }
//   })
// };

// parametersCtr.delete = (req, res) => {
//   let { id } = req.params,
//       url = `${urlSrv}${urls.dltFrmSrv}/${$id}`;

//   request({
//   url: url,
//   json: true,
//   method: 'DELETE'
//   },  (error, response, body) => {
//     if (!error && response.statusCode === 200) {
//       res.send(body);
//     }
//   })
// }

module.exports = parametersCtr;