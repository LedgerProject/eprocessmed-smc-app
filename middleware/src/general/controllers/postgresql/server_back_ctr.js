const request = require("request");
const { urlSrv, urls } = require('../../global/global_data');
const serverBackCtr = {};

serverBackCtr.ping = (req, res) => {
  const url = `${urlSrv}${urls.srvDbSrv}`;

  request({
    url: url,
    json: true,
    method: 'GET'
    },  (error, response, body) => {
      if (!error && response.statusCode === 200) {
        res.status(200).json({
          correct: true,
          resp: body
        });
      } else {
        res.status(400).json({
          correct: false,
          resp: body
        });
      }
    })
};

module.exports = serverBackCtr;