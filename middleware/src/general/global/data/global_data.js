const dataConfig = require('../../config/data_config');

let http;
let host;
let port;
let httpBack;
let hostBack;
let portBack;
let httpOtp;
let httpMail;
let httpZoom;
let httpShort;
let httpFront;
let hostFront;
let portFront;
let rootShort;
let rootDocs;
let rootDocsPdf;
let httpBock;

const hostOtp = dataConfig.otpSrv.host;
const portOtp = dataConfig.otpSrv.port;
const hostMail = dataConfig.mailSrv.host;
const portMail = dataConfig.mailSrv.port;
const hostZoom = dataConfig.zoomSrv.host;
const portZoom = dataConfig.zoomSrv.port;
const hostShort = dataConfig.shortSrv.host;
const portShort = dataConfig.shortSrv.port;
const hostBockchHash = dataConfig.bockchHashSrv.host;
const portBockchHash = dataConfig.bockchHashSrv.port;
const hostBockchCrypt = dataConfig.bockchCryptSrv.host;
const portBockchCrypt = dataConfig.bockchCryptSrv.port;
const hostencryptIpfsSrv = dataConfig.encryptIpfsSrv.host;
const portencryptIpfsSrv = dataConfig.encryptIpfsSrv.port;

const hostpdf = dataConfig.serverPdf.host;
const portpdf = dataConfig.serverPdf.port;

/*  Environment Settings */
switch (dataConfig.environment) {
  case 'Production':
      host = dataConfig.server.host;
      port = dataConfig.server.port;
      hostBack = dataConfig.srvBack.host;
      portBack = dataConfig.srvBack.port;
      hostFront = dataConfig.srvFront.host;
      portFront = dataConfig.srvFront.port;
      rootDocs = dataConfig.rootDocs;
      rootDocsPdf = dataConfig.rootDocsPdf;
    break;
  case 'Testing':
      host = dataConfig.serverTest.host;
      port = dataConfig.serverTest.port;
      hostBack = dataConfig.srvBackTest.host;
      portBack = dataConfig.srvBackTest.port;
      hostFront = dataConfig.srvFrontTest.host;
      portFront = dataConfig.srvFrontTest.port;
      rootDocs = dataConfig.rootDocsTest;
      rootDocsPdf = dataConfig.rootDocsPdf;
    break;
  case 'Development':
      host = dataConfig.serverDev.host;
      port = dataConfig.serverDev.port;
      hostBack = dataConfig.srvBackDev.host;
      portBack = dataConfig.srvBackDev.port;
      hostFront = dataConfig.srvFrontDev.host;
      portFront = dataConfig.srvFrontDev.port;
      rootDocs = dataConfig.rootDocsDev;
      rootDocsPdf = dataConfig.rootDocsPdf;
    break;
}

/*  Http configuration  */
if (dataConfig.ssl) {
  http = dataConfig.https;
} else {
  http = dataConfig.http;
}

if (dataConfig.sslBack) {
  httpBack = dataConfig.https;
} else {
  httpBack = dataConfig.http;
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

if (dataConfig.sslZoom) {
  httpZoom = dataConfig.https;
} else {
  httpZoom = dataConfig.http;
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
const urlSrv = `${httpBack}${hostBack}:${portBack}/`;
const rootOtp = `${httpOtp}${hostOtp}`;
const mailSrv = `${httpMail}${hostMail}`;
const zoomSrv = `${httpZoom}${hostZoom}`;
const shortSrv = `${httpShort}${hostShort}`;
const rootBockchHash = `${httpBock}${hostBockchHash}:${portBockchHash}/`;
const rootBockchCrypt = `${httpBock}${hostBockchCrypt}:${portBockchCrypt}/`;
const rootBockchCryptIpfs = `${httpBock}${hostencryptIpfsSrv}:${portencryptIpfsSrv}/`;
const rootHostPdf = `${httpBock}${hostpdf}:${portpdf}/`;

if (portFront !== '') {
  rootShort = `${httpFront}${hostFront}:${portFront}/meeting-confirmation/`;
} else {
  rootShort = `${httpFront}${hostFront}/meeting-confirmation/`;
}

const global_data = {
  nSalt: 10,
  rootURI,
  urlSrv,
  rootOtp,
  mailSrv,
  zoomSrv,
  shortSrv,
  rootShort,
  rootDocs,
  rootDocsPdf,
  rootBockchHash,
  rootBockchCrypt,
  rootBockchCryptIpfs,
  rootHostPdf,
  hdJson: { 'Content-Type': 'application/json' },
  hdText: { 'Content-Type': 'text/xml' },
  hdForm: { 'Content-Type' : 'application/x-www-form-urlencoded' },
  urls: {
    srvMidd: 'srv-midd',
    srvDbSrv: 'srv-db-srv',
    usrByPrmSrv: 'usr-by-prm-srv',
    crtUsrSrv: 'crt-usr-srv',
    updUsrSrv: 'upd-usr-srv',
    authUsr: 'ath-usr',
    lgutUsr: 'lgt-usr',
    authUsrSrv: 'ath-usr-srv',
    sendOtpUsr: 'send-otp-usr',
    sendOtpUsrSrv: 'send-otp-usr-srv',
    scriptOtpSrv: 'clicksend_otp.php',
    scriptMailSrv:'sendMail.php',
    hashSendSrv: 'api/send/',
    hashCallSrv: 'api/call/',
    ndecrypt: 'ncrypt',
    decrypt: 'decrypt',
    ncryptSrv: 'ncrypt',
    decryptSrv: 'decrypt',
    encryptIpsSrv:'ipfs',
    genQuery: 'gen-query',
    genQuerySrv: 'gen-query-srv',
    rutaPdf:rootDocsPdf,
    crtUpdPatient: 'crt-upd-patient',
    getPatientByStablishment:'get-patient-stb',
    crtUpdUser: 'crt-upd-usr',
    crtUpdStablishment: 'crt-upd-stablishment',
    getProcessDetail: 'get-process-detail-crt', //  url de servicios particulares
    crtConsent: 'send-consent-crt',
    sendMail: 'send-mail',
    getConsentPending: 'get-consent-pending-crt',
    consentBySpecialist:'consent-by-specialist',
    sendCodeConsent:'send-code-consent',
    getConsentStructure:'get-consent-structure-usr',
    updateConsent:'update-consent',
    validateOtpConsent: 'validate-otp-consent',
    getPdf: 'get-pfd',
    dtaFrm: 'dta-forms',
    getPatientForms: 'patient-frm'
  },
  msgs:{
    errServer: 'Error starting server',
    startServerMsg: `Server is working on port: ${port}`,
    psqlConnected: 'Postgresql connected', // Conexion con servidor back
    psqlConnectF: 'Postgresql connected failure: ', // Conexion con servidor back
    formCrtdMsg: 'Form created: ',
    updFormMsg: 'Updated form: ',
    dltFormMsg: 'Delete form id: '
  }
};

module.exports = global_data;