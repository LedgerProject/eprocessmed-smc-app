const request = require("request");
const { urlSrv, urls}  = require('../../global/global_data');
const patientsCtr = {};

patientsCtr.list = (req, res) => {
  const url = `${urlSrv}${urls.getEspec}`;

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


module.exports = patientsCtr;