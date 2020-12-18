const request = require("request");
const fs = require("fs");
const { urlSrv, rootDocs, urls } = require('../../global/global_data');
const formsDataCtr = {};

formsDataCtr.list = (req, res) => {
  const url = `${urlSrv}${urls.dtafrmSrv}`;
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

formsDataCtr.create = (req, res) => {
  const url = `${urlSrv}${urls.crtDtaFrmSrv}`;
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

formsDataCtr.getById = (req, res) => {
  const { id } = req.params;
  const url = `${urlSrv}${urls.getDtaFrmSrv}/${id}`;
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

formsDataCtr.getByIdUsr = (req, res) => {
  const url = `${urlSrv}${urls.getDtaFrmUsrSrv}`;
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

formsDataCtr.upDate = (req, res) => {
  const url = `${urlSrv}${urls.updDtaFrmSrv}`;
  request({
  url: url,
  json: true,
  method: 'PUT',
  body: req.body
  },  (error, response, body) => {
    if (!error && response.statusCode === 200) {
      res.send(body);
    }
  })
};

formsDataCtr.upfile = async (req, res) => {
  const fileData = req.files.file;
  const fileName = req.body.route;
  const path = `${rootDocs}/${fileName}`;
  console.log(path + 'esta es la ruta');

  fileData.mv(path, err => {
    let resp;

    if (!err) {
      const file = fs.createReadStream(path, (err, data) => {  });
      const formData = {
        field: 'file',
        file
      };
      const url = `${urlSrv}${urls.upFileDtaFrmSrv}`;

      request({
        url: url,
        method: 'PUT',
        formData
      },  (error, response, body) => {
        if (!error && response.statusCode === 200) {
          if (body.correct) {
            fs.unlink(path, (err) => {
              if (err) {
                console.error(err)
                return
              }
            })
          }
          res.send(body);
        }
      })

    } else {
      resp = {
        resp: 'error',
        data: err
      };
      console.log(resp);// Guardar en logs
      res.send(resp);
    }

  });

};

formsDataCtr.delete = (req, res) => {
  const { id } = req.params;
  const url = `${urlSrv}${urls.dltDtaFrmSrv}/${$id}`;

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

module.exports = formsDataCtr;