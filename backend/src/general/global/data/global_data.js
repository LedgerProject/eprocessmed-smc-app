const dataConfig = require('../../config/data_config');
const environment = dataConfig.environment;
let http;
let host;
let port;
let httpOtp;
let httpMail;
let httpShort;
let httpFront;
let hostFront;
let portFront;
let rootShort;
let rootDocs;
let configDB;
let httpBock;

const hostOtp = dataConfig.otpSrv.host;
const portOtp = dataConfig.otpSrv.port;
const hostMail = dataConfig.mailSrv.host;
const portMail = dataConfig.mailSrv.port;
const hostShort = dataConfig.shortSrv.host;
const portShort = dataConfig.shortSrv.port;
const hostBockchCrypt = dataConfig.bockchCryptSrv.host;
const portBockchCrypt = dataConfig.bockchCryptSrv.port;

/*  Environment Settings */
switch (environment) {
  case 'Production':
      host = dataConfig.server.host;
      port = dataConfig.server.port;
      rootDocs = dataConfig.rootDocs;
      hostFront = dataConfig.srvFront.host;
      portFront = dataConfig.srvFront.port;
      configDB = dataConfig.postgresql;
    break;
  case 'Testing':
      host = dataConfig.serverTest.host;
      port = dataConfig.serverTest.port;
      rootDocs = dataConfig.rootDocsTest;
      hostFront = dataConfig.srvFrontTest.host;
      portFront = dataConfig.srvFrontTest.port;
      configDB = dataConfig.postgresqlTest;
    break;
  case 'Development':
      host = dataConfig.serverDev.host;
      port = dataConfig.serverDev.port;
      rootDocs = dataConfig.rootDocsDev;
      hostFront = dataConfig.srvFrontDev.host;
      portFront = dataConfig.srvFrontDev.port;
      configDB = dataConfig.postgresqlDev;
    break;
}

/*  Http configuration  */
if (dataConfig.ssl) {
  http = dataConfig.https;
} else {
  http = dataConfig.http;
}

if (dataConfig.sslOtp) {
  httpOtp = dataConfig.https;
} else {
  httpOtp = dataConfig.http;
}

if (dataConfig.sslMail) {
  httpMail = dataConfig.https;
} else {
  httpMail = dataConfig.http;
}

if (dataConfig.sslShort) {
  httpShort = dataConfig.https;
} else {
  httpShort = dataConfig.http;
}

if (dataConfig.sslFront) {
  httpFront = dataConfig.https;
} else {
  httpFront = dataConfig.http;
}

if (dataConfig.sslBock) {
  httpBock = dataConfig.https;
} else {
  httpBock = dataConfig.http;
}

const rootURI = `${http}${host}:${port}/`;
const rootOtp = `${httpOtp}${hostOtp}`;
const mailSrv = `${httpMail}${hostMail}`;
const shortSrv = `${httpShort}${hostShort}`;
const rootBockchCrypt = `${httpBock}${hostBockchCrypt}:${portBockchCrypt}/`;

if (portFront !== '') {
  rootShort = `${httpFront}${hostFront}:${portFront}/meeting-confirmation/`;
} else {
  rootShort = `${httpFront}${hostFront}/meeting-confirmation/`;
}

const global_data = {
  environment,
  host,
  port,
  rootURI,
  configDB,
  rootOtp,
  mailSrv,
  shortSrv,
  rootShort,
  rootDocs,
  rootBockchCrypt,
  hdJson: { 'Content-Type': 'application/json' },
  hdText: { 'Content-Type': 'text/xml' },
  hdForm: { 'Content-Type' : 'application/x-www-form-urlencoded' },
  accessToken: 'da912e64f27e44fd9667182da522b5d1',
  urls: {
    srvDbSrv: 'srv-db-srv',
    genQuerySrv: 'gen-query-srv',
    usrByPrmSrv: 'usr-by-prm-srv',        
    crtUsrSrv: 'crt-usr-srv',
    updUsrSrv: 'upd-usr-srv',
    authUsrSrv: 'ath-usr-srv',
    sendOtpUsrSrv: 'send-otp-usr-srv',
    scriptOtpSrv: 'clicksend_otp.php',
    scriptMailSrv:'sendMail.php',
    backToMiddle: 'back-middle', // Ruta de peticiones hacia el middle
    getPatientSrv: 'get-patient-srv',
    newPatientSrv: 'new-patient-srv',
    getStablishmentSvr: 'get-stablishment-srv',
    getStablishmentByIdSvr:'get-stablishmentByid-srv',
    newStablishmentSvr: 'new-stablishment-srv',
    updateStablishmentSvr: 'upd-stablishment-srv',
    deleteStablishmentSvr: 'del-stablishment-srv',
    ncryptSrv: 'ncrypt',
    decryptSrv: 'decrypt'
  },
  msgs:{
    errServer: 'Error starting server',
    startServerMsg: `Server is working on port: ${port}`,
    psqlConnected: 'Postgresql connected',
    psqlConnectF: 'Postgresql connected failure: ',
    formCrtdMsg: 'Form created: ',
    updFormMsg: 'Updated form: ',
    dltFormMsg: 'Delete form id: '
  }
};

module.exports = global_data;