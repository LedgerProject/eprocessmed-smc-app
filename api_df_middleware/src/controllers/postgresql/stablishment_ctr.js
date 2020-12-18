const request = require("request");
const { urlSrv, urls}  = require('../../global/global_data');
const stablishmentCtr = {};

stablishmentCtr.list = (req, res) => {
  const url = `${urlSrv}${urls.getStablishment}`;

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

stablishmentCtr.create = (req, res) => {
  const url = `${urlSrv}${urls.crtStableSrv}`;
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


module.exports = stablishmentCtr;