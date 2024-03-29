const generatorRequest = require('../../global/functions/generator_request');
const cryptoJS = require('crypto-js');
const bockchainRequest = require('../services/server_bockchain_ctr');
const fetch = require('node-fetch');
const serverBockchainCtr = require('../services/server_bockchain_ctr');
const sendRequest = require('../../global/functions/send_request');
const jsonCatalogParse = require('../../global/functions/parse-json-catalogs');
const { urlSrv, rootBockchCryptIpfs, urls, rootOtp, hdForm, rootHostPdf, rootHostWat } = require('../../global/data/global_data');
const urlSendIpfs = `${rootBockchCryptIpfs}${urls.encryptIpsSrv}`;
const urlWatsapp = `${rootHostWat}${urls.whatsNotification}`;
const url = `${urlSrv}${urls.genQuerySrv}`;
const consentCtr = {};
const urlServerOtp = `${rootOtp}${urls.scriptOtpSrv}`;
const usersCtr = require('./users_ctr');

//strcuturee pdf
const jsonpdfStructure = require("./structure.json");

//IMPORT DE PDFMAKE
var fonts = {
  Roboto: {
    normal: 'Times-Roman',
    bold: 'Times-Bold'
    //italics: 'Times-Italic',
    // bolditalics: 'Times-BoldItalic'
  }
};

var PdfPrinter = require('pdfmake');
var printer = new PdfPrinter(fonts);
var fs = require('fs');

const prepareLog = async (dataLog) => {
  const date = new Date();
  dataLog['date'] = date;
  const log = JSON.stringify(dataLog);
  // saveLogs(log);
}

const sedRequest = async (reqSelet, requests, collector) => {
  const resp = await generatorRequest(reqSelet, requests, collector)
    .then((resp) => { return resp })
    .catch((err) => prepareLog({ module: 'generalInquiryCtr', process: 'query', line: '29', data: '', err }));
  return resp;
}

const sendIpfs = async (ulrPdf) => {
  var raw = JSON.stringify({ "datos": ulrPdf });
  var requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: raw,
    redirect: 'follow'
  };
  const resp = fetch(urlSendIpfs, requestOptions)
    .then(response => response.json())
    .then(result => { return result })
    .catch(error => console.log('error', error));
  return resp;
};

const getHashParams = async () => {
  const dataReq = {
    request: 'params-by-name',
    url,
    data: {
      name: "secrets",
    }
  }
  const answerReq = await sendRequest.send(dataReq, 'internal');
  const ouput = answerReq.find(rq => rq.ouput === dataReq.request);
  answer = ouput.answer.resp;
  return answer;
};

const getUser = async (id) => {
  const dataReq = {
    request: 'usr-by-id',
    url,
    data: {
      idUser: id,
    }
  }
  const answerReq = await sendRequest.send(dataReq, 'internal');
  const ouput = answerReq.find(rq => rq.ouput === dataReq.request);
  answer = ouput.answer.resp;
  return answer;
};

const getConsentById = async (idConsent) => {
  const dataReq = {
    request: 'get-consent-by-Id',
    url,
    data: {
      idConsent: idConsent,
    }
  }
  const answerReq = await sendRequest.send(dataReq, 'internal');
  const ouput = answerReq.find(rq => rq.ouput === dataReq.request);
  answer = ouput.answer.resp;
  return answer;
};

const getEstablishment = async (id) => {
  const dataReq = {
    request: 'estab-by-id',
    url,
    data: {
      idEstablishment: id,
    }
  }
  const answerReq = await sendRequest.send(dataReq, 'internal');
  const ouput = answerReq.find(rq => rq.ouput === dataReq.request);
  answer = ouput.answer.resp;
  return answer;
};

const getPendingConsents = async (data) => {
  const dataReq = {
    request: 'get-consent-patient-homePen',
    url,
    data
  }
  const answerReq = await sendRequest.send(dataReq, 'internal');
  const ouput = answerReq.find(rq => rq.ouput === dataReq.request);
  answer = ouput.answer.resp;
  return answer;
};

const getSpecialties = async () => {
  const dataReq = {
    request: 'catl-by-desc',
    url,
    data: {
      description: 'specialties'
    }
  }
  const answerReq = await sendRequest.send(dataReq, 'internal');
  const ouput = answerReq.find(rq => rq.ouput === dataReq.request);
  answer = ouput.answer.resp;
  return answer[0].data_jb;
};

const prepareConsent = (pendingConsents) => {
  const pendingConsLength = pendingConsents.length;
  let pendingCons = [];
  for (let i = 0; i < pendingConsLength; i++) {
    const element = pendingConsents[i];
    const params = {
      idConsent: element.id_consent,
      idPatient: element.id_patient,
      idSpecialist: element.id_specialist,
      catSpecialty: element.id_cat_specialty.specialties,
      catProcess: element.id_cat_process.procedures,
      specialtyName: "",
      procedureName: "",
      infoOtp: element.info_otp,
      traceability: element.traceability,
      url: element.url_pdf
    }
    pendingCons.push(params);
  }
  return pendingCons;
}

const collateConsentsSpecialties = async (pendingConsents, specCatalog) => {
  const pendingCons = prepareConsent(pendingConsents);
  const pendingConsLength = pendingCons.length;
  for (let i = 0; i < pendingConsLength; i++) {
    let element = pendingCons[i];
    element.catSpecialty = await jsonCatalogParse.switchJsonParse(specCatalog, element.catSpecialty, '', '', '', '');
    element.catProcess = await jsonCatalogParse.switchJsonParse(specCatalog, element.catProcess, '', '', '', '');
    element.specialtyName = element.catSpecialty.value
    element.procedureName = element.catProcess.value
  }
  return pendingCons;
}

consentCtr.getPendingConsentsByPatient = async (req, res) => {
  let status = 400;
  let correct = false;
  let answer;
  try {
    const pendingConsents = await getPendingConsents(req.body);
    const specCatalog = await getSpecialties();
    const collatedConsents = await collateConsentsSpecialties(pendingConsents, specCatalog);
    answer = collatedConsents;
    status = 200;
    correct = true;
  } catch (err) {
    status = 200;
    correct = true;
    answer = err;
  }
  res.status(status).json({
    correct,
    resp: answer
  });
};

//metodo que arma y devuelve al specialista y clinica del consentimiento
consentCtr.getStructureConsent = async (req, res) => {
  var data = req.body;
  const resp = await getSpecialistStablishment(data.idSpecialist, data.idEstablishment);
  res.status(resp.status).json({
    correct: resp.correct,
    resp: resp.answer
  });
}

const getSpecialistStablishment = async (idSpecialist, idEstablishment) => {
  let status = 400;
  let correct = false;
  let answer;
  try {
    status = 200;
    correct = true;
    var specialist = await getUser(idSpecialist);
    var establishment = await getEstablishment(idEstablishment);
    const hashUser = await getHashParams();
    var decryptSp = {
      dni: specialist[0].dni,
      name: specialist[0].name,
      lastname: specialist[0].lastname,
      login: specialist[0].login,
      mail: specialist[0].mail,
      phone: specialist[0].phone,
    }
    //aqui voy a desencriptar los datos del specialista y centro de salud
    const answerDecryptSpecialis = await serverBockchainCtr.decrypt(decryptSp, hashUser[0].params[0].hash);
    const respSpecialist = answerDecryptSpecialis.find(element => element.ouput === 'decrypt');
    const message = respSpecialist.answer.message;

    if (message === 'Datos descifrados correctamente') {
      specialist[0].dni = respSpecialist.answer.data.dni;
      specialist[0].name = respSpecialist.answer.data.name;
      specialist[0].lastname = respSpecialist.answer.data.lastname;
      specialist[0].login = respSpecialist.answer.data.login;
      specialist[0].mail = respSpecialist.answer.data.mail;
      specialist[0].phone = respSpecialist.answer.data.phone;
      decryptSp = specialist[0];
      var decryptSta = {
        dni: establishment[0].dni,
        // description: establishment[0].description,
        address: establishment[0].address,
        phone: establishment[0].phone,
        mail: establishment[0].mail,
        contact_name: establishment[0].contact_name,
        contact_phone: establishment[0].contact_phone
      }
      const answerDecryptStabli = await serverBockchainCtr.decrypt(decryptSta, establishment[0].hash);
      const respStabl = answerDecryptStabli.find(element => element.ouput === 'decrypt');
      const msg = respStabl.answer.message;

      if (msg === 'Datos descifrados correctamente') {
        establishment[0].dni = respStabl.answer.data.dni;
        //establishment[0].description = respStabl.answer.data.description;
        establishment[0].address = respStabl.answer.data.address;
        establishment[0].phone = respStabl.answer.data.phone;
        establishment[0].mail = respStabl.answer.data.mail;
        establishment[0].contact_name = respStabl.answer.data.contact_name;
        establishment[0].contact_phone = respStabl.answer.data.contact_phone;
        decryptSta = establishment[0];
        answer = {
          specialist: decryptSp,
          establishment: decryptSta
        }
        status = 200;
        correct = true;
      } else {
        answer = msg;
      }

    } else {
      answer = message;
    }
  } catch (error) {
    status = 400;
    correct = false;
  }
  return { status, correct, answer }
}

consentCtr.create = async (req, res) => {
  try {
    var link = await drawPdfAndGenerateConsent(req.body);
    res.status(200).json({
      correct: true,
      resp: link
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      correct: false,
      resp: err
    });
  }
};

//metodo que obtiene los consentimiento por idSpecialist
const getConsentBysp = async (idSpecialist) => {
  const dataReq = {
    request: 'get-consent-Specialist',
    url,
    data: {
      idSpecialist: idSpecialist
    }
  }
  const answerReq = await sendRequest.send(dataReq, 'internal');
  const ouput = answerReq.find(rq => rq.ouput === dataReq.request);
  answer = ouput.answer.resp;
  return answer;
};

//metodo que inserta un consent en la base
const insertConsent = async (objConsent) => {
  const dataReq = {
    request: 'rgt-consent',
    url,
    data: objConsent
  }
  const answerReq = await sendRequest.send(dataReq, 'internal');
  const ouput = answerReq.find(rq => rq.ouput === dataReq.request);
  answer = ouput.answer;
  return answer;
};

//metodo que modifica un consent en la base
const updateConsent = async (objConsent) => {
  const dataReq = {
    request: 'upd-consent',
    url,
    data: objConsent
  }
  const answerReq = await sendRequest.send(dataReq, 'internal');
  const ouput = answerReq.find(rq => rq.ouput === dataReq.request);
  answer = ouput.answer.correct;
  return answer;
};

//metodo  que consulta consentimientos por specialist
consentCtr.getConsentBySpecialist = async (req, res) => {
  let status = 400;
  let correct = false;
  let answer;
  try {
    var consents = await getConsentBysp(req.body.idSpecialist);
    const specCatalog = await getSpecialties();
    const collatedConsents = await collateConsentsSpecialties(consents, specCatalog);
    answer = collatedConsents;
    status = 200;
    correct = true;
  } catch (err) {
    status = 200;
    correct = true;
    answer = err;
  }
  res.status(status).json({
    correct,
    resp: answer
  });
}

//metodo que envia el otp
consentCtr.sendOtp = async (req, res) => {
  var collector = [];
  let status = 400;
  let correct = false;
  let answer;
  try {
    //Envio de Otp
    const number = req.body.codephone + req.body.phone;
    const msgType = 'signature';
    const codeOtp = req.body.infoOtp;
    const name = req.body.name;
    const lastname = req.body.lastname;


    const dataOtpSend = `name=${name} ${lastname}&number=${number}&code=${codeOtp}&type=${msgType}`;
    const setOtpSend = { prepareData: '', process: '', input: null, ouput: 'otp_send', url: urlServerOtp, method: 'POST', data: dataOtpSend, headers: hdForm, bodyType: 'body', respFormat: 'Text' };
    const requests = [];
    const reqSelet = [setOtpSend];

    const otpAnswer = await sedRequest(reqSelet, requests, collector);
    answer = otpAnswer;

    status = 200;
    correct = true;
  } catch (err) {
    status = 200;
    correct = true;
    answer = err;
  }
  res.status(status).json({
    correct,
    resp: answer
  });

}

//metodo que envia mensaje por whatsapp
consentCtr.sendWhatsapp = async (req, res) => {
  let status = 400;
  let correct = false;
  let answer;
  try {
    console.log("entre a whatsapp");
    const dta = req.body;
    const msg = "E PROCESS MED informs. Dear " + dta.name + dta.lastname + ", your code to sign your consent is: " + dta.infoOtp;
    const dataWata = {
      numero: dta.codephone + dta.phone,
      nombre: dta.name,
      mensaje: msg
    };
    const dataReq = {
      ouput: 'whatsapp',
      url: urlWatsapp,
      data: {
        dataWata
      }
    }
    const respAnswer = await sendRequest.send(dataReq, 'external');
    answer = respAnswer.find(element => element.ouput === 'whatsapp');
    answer = answer.answer;

    status = 200;
    correct = true;
  } catch (err) {
    status = 200;
    correct = true;
    answer = err;
  }
  res.status(status).json({
    correct,
    resp: answer
  });
}

//metodo que tiene la logica para crear el pdf y crear o modificar el consentimiento
const drawPdfAndGenerateConsent = async (jsonData) => {
  try {
    var logoD = 'data:image/png;base64,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';

    var logoI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAABbCAYAAAHmcEweAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4RTlENjNFMDE1NURFOTExOTRBMUJFMkE2M0IzNTUzQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDoyREE3REJBODYwNTUxMUU5QUNEODg2RkQ2MzM0QzYyMSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDoyREE3REJBNzYwNTUxMUU5QUNEODg2RkQ2MzM0QzYyMSIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjhFOUQ2M0UwMTU1REU5MTE5NEExQkUyQTYzQjM1NTNBIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjhFOUQ2M0UwMTU1REU5MTE5NEExQkUyQTYzQjM1NTNBIi8+IDwvcmRmOkRlc2NyaXB0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';
    var idPdf = 0;
    var body = [];
    //variable que extrae los textos del pdf
    //var jsonPdf = jsonData.pdf;
    var jsonPdf = jsonpdfStructure;
    var jsonConsent = jsonData.consent;
    var jsonUser = jsonData.user;
    var retorno = null;
    var hashInit = null;
    var hashFinal = null;
    //variable que extrae las firmas del pdf
    //var jsonFirmas = jsonPdf.body.firmas;
    var jsonFirmas = jsonData.pdf.body.firmas;

    //aqui se procede a insertar el consentimiento por primera vez
    //aqui validamos si se crea el consentimiento o se lo modifica
    if (jsonConsent.idConsent == null) {
      const consent = await insertConsent(jsonConsent);
      const id = consent.resp[0].id_consent;
      const params = {
        id: id.toString()
      }
      const hashurl = await serverBockchainCtr.sendHashConsent(params);
      const reshash = hashurl.find(resp => resp.ouput === 'sedhashConsentInit');
      const resDet = reshash.answer;
      hashInit = resDet.hash;
      //aqui valido si lo creo para firmar en casa o centro de salud
      if (jsonConsent.homeFirm == 1) {
        //aqui creamos el usuario paciente para firma en casa y se envia el correo
        const dataReq = {
          request: 'rgt-users',
          module: 'mobile-consent',
          data: jsonUser
        }
        await usersCtr.ctrUserInt(dataReq);
        //si no se crea retorna el mensaje yonaider
      }
      //aqui procedo a modificar el consentimiento guardando los datos de trazabilidad
      const traceability = JSON.stringify({
        time_init: resDet.timestamp1,
        hash_init: hashInit,
        time_end: '',
        hash_final: ''
      })
      const consentUpdate = {
        idConsent: id,
        traceability
      }
      updateConsent(consentUpdate);
      retorno = {
        idConsent: id,
        hashInit: resDet.hash,
        timeInit: resDet.timestamp1
      }
    } else {
      //aqui reemplazo las etiquetas
      var consentById = await getConsentById(jsonConsent.idConsent);
      jsonPdf.body.text = await replaceLabel(jsonPdf.body.text, consentById[0], jsonUser.idEstablishment);
      if (jsonConsent.homeFirm == 0) {
        //aqui coloco los datos del pdf y firmas
        jsonConsent.firmPatient = jsonFirmas.firma_p.replace(/'/gi, "|");
        jsonConsent.firmSpecialist = jsonFirmas.firma_e.replace(/'/gi, "|");
        //aqui hasheo las firmas del especialista y del paciente
        const hashSignaPat = cryptoJS.SHA256(jsonConsent.firmPatient);
        const hashSignaSpec = cryptoJS.SHA256(jsonConsent.firmSpecialist);
        jsonConsent.hashFpacient = hashSignaPat.toString();
        jsonConsent.hashFspecialist = hashSignaSpec.toString();
      }else{
        //aqui tomo la firma del campo structure user en la tabla users


      }
      //aqui tengo que validar el orden de los textos y armar la estructura para el body
      idPdf = jsonConsent.idConsent;
      jsonPdf.body.text.sort(function (a, b) {
        if (a.order > b.order) {
          return 1;
        }
        if (a.order < b.order) {
          return -1;
        }
        return 0;
      });
      for (var i = 0; i < jsonPdf.body.text.length; i++) {
        body.push({ text: jsonPdf.body.text[i].information, alignment: 'justify', fontSize: 11, bold: true });
      }
      var docDefinition = {
        pageSize: 'A4',
        pageOrientation: 'portraint',
        pageMargins: [40, 60, 40, 60],
        //watermark: { image: logoI, opacity: 0.1, width: 100, height: 100 },
        watermark: { text: 'E PROCESSMED', color: 'blue', opacity: 0.2, bold: true, italics: false, fontSize: 90 },

        header: {
          columns: [
            //{ text: jsonPdf.header.text1, alignment: 'left', margin: [10, 6], fontSize: 9 },
            {
              image: logoI, alignment: 'left', margin: [10, 6],
              width: 70,
              height: 40
            },
            { text: jsonPdf.header.text2, alignment: 'center', margin: [0, 6, 0], fontSize: 9 },
            {
              image: logoD, alignment: 'right', margin: [0, 6, 10],
              width: 40,
              height: 40
            }
          ]
        },

        footer: {
          columns: [
            { text: jsonPdf.header.text4, alignment: 'left', margin: [10, 0, 0, 6], fontSize: 9 },
            { text: jsonPdf.header.text5, alignment: 'center', margin: [0, 0, 0, 6], fontSize: 9 },
            { text: jsonPdf.header.text6, alignment: 'right', margin: [0, 0, 10, 6], fontSize: 9 }
          ]
        },

        content: [
          body,
          {
            columns: [
              {
                svg: '<svg  width="200" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 300">' + jsonFirmas.firma_p + '</svg>',
              },
              {
                svg: '<svg  width="200" height="200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 300">' + jsonFirmas.firma_e + '</svg>'
              }
            ]
          },
          {
            columns: [
              {
                width: '*', text: "Patient's signature", bold: true
              },
              {
                width: '*', text: 'Signature of the Specialist', bold: true
              }
            ]
          }


        ],
        pageBreakBefore: function (currentNode, followingNodesOnPage, nodesOnNextPage, previousNodesOnPage) {
          return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
        }
      };
      const rutaSalida = 'public/' + 'pdf/' + idPdf + '.pdf';
      var pdfDoc = await printer.createPdfKitDocument(docDefinition);
      pdfDoc.pipe(fs.createWriteStream(rutaSalida));
      pdfDoc.end();

      //encriptar pdf y devolver hash de blockchaind
      let fileData = await fs.readFileSync("public/pdf/" + idPdf + ".pdf").toString('hex');
      let result = [];
      for (var i = 0; i < fileData.length; i += 2)
        result.push('0x' + fileData[i] + '' + fileData[i + 1])
      var md5Hash = cryptoJS.MD5(result);
      var params = {
        id: idPdf.toString(),
        binario: md5Hash.toString()
      };
      const hashurl = await serverBockchainCtr.sendHashPdfConsent(params);
      const reshash = hashurl.find(resp => resp.ouput === 'sedhash');
      const resHash = reshash.answer;
      hashFinal = resHash.hash;

      const ulrPdf = rootHostPdf + `pdf/${idPdf}.pdf`;
      const answer = await sendIpfs(ulrPdf);
      //const resDet = answer.find(resp => resp.ouput === 'urlipfs');
      //var answerDet = resDet.answer;
      var answerDet = "null"
      if (answer.correct) {

        answerDet = answer.resp;
      }

      //aqui modifico los datos del campo trazabilidad y le agrego el hash final y time final
      var traceability = jsonConsent.traceability;
      traceability.time_end = resHash.timestamp1;
      traceability.hash_final = hashFinal;
      //aqui actualizo el consentimiento y le agrego la url del pdf y la 
      var data = {
        idConsent: jsonConsent.idConsent,
        urlPdf: answerDet.data,
        firmPatient: jsonConsent.firmPatient,
        firmSpecialist: jsonConsent.firmSpecialist,
        hashFpacient: jsonConsent.hashFpacient,
        hashFspecialist: jsonConsent.hashFspecialist,
        patientCompleted: 1,
        specialistCompleted: 1,
        traceability: JSON.stringify(traceability),
        status: jsonConsent.status
      }
      await updateConsent(data);
      retorno = {
        urlipfs: answerDet.data,
        hashpdf: hashFinal
      }
    }
    return retorno;
  } catch (err) {
    console.log(err);
    return err
  }
}

//metodo que valida el codigo otp con el codigo del consentimiento
consentCtr.validateCodeOtp = async (req, res) => {
  let status = 400;
  let correct = false;
  let answer;
  try {
    var otp = req.body.otp;
    var action = req.body.action;
    var consent = await getConsentById(req.body.consent.idConsent);
    req.body.consent.traceability.hash_init = consent[0].traceability.hash_init;
    req.body.consent.traceability.time_init = consent[0].traceability.time_init;
    if (action == "accept") {
      if (consent[0].info_otp == otp) {
        answer = await drawPdfAndGenerateConsent(req.body);
        status = 200;
        correct = true;
      } else {
        status = 200
        correct = false;
        answer = "not found";
      }
    } else {
      answer = await drawPdfAndGenerateConsent(req.body);
      status = 200;
      correct = true;
    }
  } catch (err) {
    status = 200;
    correct = true;
    answer = err;
    console.log(err);
  }
  res.status(status).json({
    correct,
    resp: answer
  });
}

//metodo que reemplaza las etiquetas por los datos de los pacientes, specialista, centro salud, etc
const replaceLabel = async (ArrayText, consent, idEstablishment) => {
  var objUsr = await getSpecialistStablishment(consent.id_specialist, idEstablishment);
  const specialist = objUsr.answer.specialist;
  const stablishment = objUsr.answer.establishment;
  const patient = await getPatient(consent.id_patient, stablishment.hash);
  var element = {};
  var arrayElement = [];
  const fecha_create = consent.traceability.time_init;
  for (let i = 0; i < ArrayText.length; i++) {
    const text = ArrayText[i].information;
    const text1 = text.replace(/{consentimiento.fecha_creacion}/gi, fecha_create);
    const text2 = text1.replace(/{paciente.dni}/gi, patient[0].dni);
    const text3 = text2.replace(/{paciente.nombre}/gi, patient[0].name_patient);
    const text4 = text3.replace(/{paciente.apellido}/gi, patient[0].lastname);
    const text5 = text4.replace(/{paciente.direccion}/gi, patient[0].address);
    const text6 = text5.replace(/{paciente.correo}/gi, patient[0].mail);
    const text7 = text6.replace(/{paciente.telefono}/gi, patient[0].phone);
    const text8 = text7.replace(/{paciente.rep_dni}/gi, patient[0].dni_rep_legal);
    const text9 = text8.replace(/{paciente.rep_nombre}/gi, patient[0].name_rep_legal);
    const text10 = text9.replace(/{paciente.rep_apellido}/gi, patient[0].lastname_rep_legal);
    const text11 = text10.replace(/{paciente.rep_direccion}/gi, patient[0].address_rep_legal);
    const text12 = text11.replace(/{paciente.rep_correo}/gi, patient[0].address_rep_legal);
    const text13 = text12.replace(/{paciente.rep_telefono}/gi, patient[0].phone_rep_legal);
    const text14 = text13.replace(/{paciente.no_historia_c}/gi, patient[0].no_clinic_history);
    const text15 = text14.replace(/{especialista.dni}/gi, specialist.dni);
    const text16 = text15.replace(/{especialista.nombre}/gi, specialist.name);
    const text17 = text16.replace(/{especialista.apellido}/gi, specialist.lastname);
    const text18 = text17.replace(/{especialista.direccion}/gi, specialist.dni);
    const text19 = text18.replace(/{especialista.telefono_fijo}/gi, specialist.phone);
    const text20 = text19.replace(/{especialista.telefono_movil}/gi, specialist.phone);
    const text21 = text20.replace(/{centro_de_salud.nombre}/gi, stablishment.description);
    const text22 = text21.replace(/{centro_de_salud.direccion}/gi, stablishment.address);
    const text23 = text22.replace(/{centro_de_salud.telefono}/gi, stablishment.phone);
    const text24 = text23.replace(/{centro_de_salud.ciglas}/gi, stablishment.dni);
    const text25 = text24.replace(/{procedimientos.nombre}/gi, consent);
    //aqui ya estan los textos con las etiquetas modificadas
    element = {
      order: text.order,
      information: text25
    };
    arrayElement.push(element);
  }
  return arrayElement;
}

const getPatient = async (idPatient, hashStablishment) => {
  const dataReq = {
    request: 'pat-by-id',
    url,
    data: {
      idPatient: idPatient
    }
  }
  const defaultDecrypt = {
    no_clinic_history: '',
    dni: '',
    name_patient: '',
    lastname: '',
    address: '',
    mail: '',
    phone: '',
    legal_representative: '',
    dni_rep_legal: '',
    name_rep_legal: '',
    lastname_rep_legal: '',
    address_rep_legal: '',
    mail_rep_legal: '',
    phone_rep_legal: '',
    name_emecon: '',
    lastname_emecon: '',
    phone_emecon: '',
    address_emecon: ''
  }
  const answerReq = await sendRequest.send(dataReq, 'internal');
  const ouput = answerReq.find(rq => rq.ouput === dataReq.request);
  var answer = ouput.answer.resp;
  let decrypt = defaultDecrypt;
  for (var key in decrypt) {
    decrypt[key] = answer[key];
  }
  const answerDecrypt = await bockchainRequest.decrypt(decrypt, hashStablishment);
  const resp = answerDecrypt.find(element => element.ouput === 'decrypt');
  const message = resp.answer.message;
  const data = resp.answer.data;

  if (message === 'Datos descifrados correctamente') {
    for (var key in data) {
      answer[key] = data[key];
    }
  }
  return answer;
}

module.exports = consentCtr;