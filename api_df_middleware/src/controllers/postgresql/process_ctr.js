const request = require("request");
const { urlSrv, urls}  = require('../../global/global_data');
const processCtr = {};

processCtr.list = (req, res) => {
  const url = `${urlSrv}${urls.getProcess}`;

  request({
    url: url,
    json: true,
    method: 'GET'
    },  (error, response, body) => {
      if (!error && response.statusCode === 200) {
        console.log(body)
        res.send(body);
      }
    })
};

processCtr.create = (req, res) => {
  const url = `${urlSrv}${urls.crtProcess}`;
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


module.exports = processCtr;