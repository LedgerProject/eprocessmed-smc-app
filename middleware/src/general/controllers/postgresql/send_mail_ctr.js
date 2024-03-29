const request = require("request");
const sendRequest = require('../../global/functions/send_request');
const { urlSrv, urls, hdForm } = require('../../global/data/global_data');
const sendMailCtr = {};

sendMailCtr.send = async (req, res) => {
  request({
    url: 'https://smartconsent.e-processmed.com/smartConsentWeb/control/apiapp/send_mail_Forms',
    headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
    method: 'POST',
    form: {
      nonbre: 'Ñañiel',
      texto: 'Hola Ñañiel',
      correo: 'danielbry96@hotmail.com'
    }
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

module.exports = sendMailCtr;