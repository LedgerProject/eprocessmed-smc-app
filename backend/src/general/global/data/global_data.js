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

const hostOtp = dataConfig.otpSrv.host;
const portOtp = dataConfig.otpSrv.port;
const hostMail = dataConfig.mailSrv.host;
const portMail = dataConfig.mailSrv.port;
const hostShort = dataConfig.shortSrv.host;
const portShort = dataConfig.shortSrv.port;

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

const rootURI = `${http}${host}:${port}/`;
const rootOtp = `${httpOtp}${hostOtp}`;
const mailSrv = `${httpMail}${hostMail}`;
const shortSrv = `${httpShort}${hostShort}`;

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
      nSalt: 10,
      hdJson: { 'Content-Type': 'application/json' },
      hdText: { 'Content-Type': 'text/xml' },
      hdForm: { 'Content-Type' : 'application/x-www-form-urlencoded' },
      secrets: {
        jwt: {
          secret :'af668804f9162927b2aa2c1c07b83640'
        }
      },
      urls: {
        srvDbSrv: 'srv-db-srv',
        genQuerySrv: 'gen-query-srv',
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
        deleteStablishmentSvr: 'del-stablishment-srv'
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