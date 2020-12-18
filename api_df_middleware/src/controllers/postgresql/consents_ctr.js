const request = require("request");
const fs = require("fs");
const Hashids = require('hashids/cjs');

const { urlSrv, urls}  = require('../../global/global_data');
const consentsCtr = {};

consentsCtr.list = (req, res) => {
  const url = `${urlSrv}${urls.getConsent}`;

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

consentsCtr.create = (req, res) => {
  const url = `${urlSrv}${urls.crtConsent}`;
  
  //aqui covierto a binario y codifico el pdf
  let fileData = fs.readFileSync("ECS-5988.pdf").toString('hex');
  let result =[]
  for (var i = 0; i < fileData.length; i+=2)
    result.push('0x'+fileData[i]+''+fileData[i+1])
  //return result;
  //console.log(parseInt(result));
  const hashids = new Hashids('', 40, 'abcdefghijklmnopqrstuvwxyz');

  //aqui construyo lo que voy a enviar a la api
  const consentData = {
    pdf:hashids.encode(parseInt(result)),
    establishment: 'E processmed',
    specialist: req.body.specialist,
    patient: req.body.patient,
    process: req.body.process,
    creation_date: '2020-12-14'
  };

//AQUI ENVIO A LA CADENA DE BLOQUES Y DEVUELVE HASH
//txthash = this.generateHash(consentData);
//console.log(consentData);
var request = require("request");
var options = { method: 'POST',
  url: 'http://api.saas-ecuador.com:8080/consent',
  headers: 
   { 'postman-token': '239bdc9a-1c39-f843-96c9-341359a8f915',
     'cache-control': 'no-cache',
     'content-type': 'application/json' },
  body: consentData,
  json: true };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
   // console.log(body.body.hash);
    const {hash} = body.body;
    

    const dbData = {
      hashpdf:hash,
      patient: req.body.patient,
      process: req.body.process,
      risk: 0,
      specialist: req.body.specialist,
      specialty: req.body.specialty,
      video: 1
    };

    //console.log(dbData);

    //aqui guardo en la base 
    request({
      url: url,
      json: true,
      method: 'POST',
      body: dbData
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const data={
          block:hash,
          hash:hashids.encode(parseInt(result))
        }
        res.send(data);
      }
    })

  });

};


//funcion que se conecta a la cadena de bloque y retorna el hash
  consentsCtr.generateHash = (data) =>{
      const url = `http://api.saas-ecuador.com:8080/consent`;
      request({
        url: url,
        json: true,
        method: 'POST',
        body: data
      }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          response.send(body.hash);
        }
      })
  }


module.exports = consentsCtr;