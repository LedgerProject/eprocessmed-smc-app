const dataConfig = require('../config/data_config');

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
let rootShort;
let rootDocs;

const hostOtp = dataConfig.otpSrv.host;
const portOtp = dataConfig.otpSrv.port;
const hostMail = dataConfig.mailSrv.host;
const portMail = dataConfig.mailSrv.port;
const hostZoom = dataConfig.zoomSrv.host;
const portZoom = dataConfig.zoomSrv.port;
const hostShort = dataConfig.shortSrv.host;
const portShort = dataConfig.shortSrv.port;

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
    break;
  case 'Testing':
      host = dataConfig.serverTest.host;
      port = dataConfig.serverTest.port;
      hostBack = dataConfig.srvBackTest.host;
      portBack = dataConfig.srvBackTest.port;

      hostFront = dataConfig.srvFrontTest.host;
      portFront = dataConfig.srvFrontTest.port;

      rootDocs = dataConfig.rootDocsTest;
    break;
  case 'Development':
      host = dataConfig.serverDev.host;
      port = dataConfig.serverDev.port;
      hostBack = dataConfig.srvBackDev.host;
      portBack = dataConfig.srvBackDev.port;

      hostFront = dataConfig.srvFrontDev.host;
      portFront = dataConfig.srvFrontDev.port;

      rootDocs = dataConfig.rootDocsDev;
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

const rootURI = `${http}${host}:${port}/`;
const urlSrv = `${httpBack}${hostBack}:${portBack}/`;
const rootOtp = `${httpOtp}${hostOtp}`;
const mailSrv = `${httpMail}${hostMail}`;
const zoomSrv = `${httpZoom}${hostZoom}`;
const shortSrv = `${httpShort}${hostShort}`;

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
      urls: {
        srvMidd: 'srv-midd',
        srvDbSrv: 'srv-db-srv',
        index: '/',
        users: 'users',
        crtUsr: 'crt-usr',
        qyrUsr: 'qry-usr',
        getUsr: 'get-usr',
        updUsr: 'upd-usr',
        dltUsr: 'dlt-usr',
        authUsr: 'ath-usr',
        lgutUsr: 'lgt-usr',
        sendOtpUsr: 'send-otp-usr',
        usrSrv: 'usr-srv',
        crtUsrSrv: 'crt-usr-srv',
        qyrUsrSrv: 'qry-usr-srv',
        getUsrSrv: 'get-usr-srv',
        updUsrSrv: 'upd-usr-srv',
        dltUsrSrv: 'dlt-usr-srv',
        authUsrSrv: 'ath-usr-srv',
        lgutUsrSrv: 'lgt-usr-srv',
        sendOtpUsrSrv: 'send-otp-usr-srv',
        scriptOtpSrv: 'clicksend_otp.php',
        scriptMailSrv:'sendMail.php',
        cust: 'customers',
        custSrv: 'cust-srv',
        resp: 'respondents',
        respSrv: 'resp-srv',
        params: 'parameters',
        paramsSrv: 'params-srv',        
        frm: 'forms',
        crtFrm: 'crt-frm',
        getFrm: 'get-frm',
        updFrm: 'upd-frm',
        dltFrm: 'dlt-frm',
        frmSrv: 'frm-srv',
        crtFrmSrv: 'crt-frm-srv',
        getFrmSrv: 'get-frm-srv',
        updFrmSrv: 'upd-frm-srv',
        dltFrmSrv: 'dlt-frm-srv',
        setFrm: 'set-forms',
        crtSetFrm: 'crt-set-frm',
        getSetFrm: 'get-set-frm',
        updSetFrm: 'upd-set-frm',
        dltSetFrm: 'dlt-set-frm',
        setFrmSrv: 'set-frm-srv',
        crtSetFrmSrv: 'crt-set-frm-srv',
        getSetFrmSrv: 'get-set-frm-srv',
        updSetFrmSrv: 'upd-set-frm-srv',
        dltSetFrmSrv: 'dlt-set-frm-srv',
        custFrm: 'cust-forms',
        crtCustFrm: 'crt-cust-frm',
        getCustFrm: 'get-cust-frm',
        updCustFrm: 'upd-cust-frm',
        dltCustFrm: 'dlt-cust-frm',
        custFrmSrv: 'cust-forms-srv',
        crtCustFrmSrv: 'crt-cust-frm-srv',
        getCustFrmSrv: 'get-cust-frm-srv',
        updCustFrmSrv: 'upd-cust-frm-srv',
        dltCustFrmSrv: 'dlt-cust-frm-srv',        
        dtaFrm: 'dta-forms',
        crtDtaFrm: 'crt-dta-frm',
        getDtaFrm: 'get-dta-frm',
        getDtaFrmUsr: 'get-dusr-frm',
        updDtaFrm: 'upd-dta-frm',
        upFileDtaFrm: 'upf-dta-frm',
        dltDtaFrm: 'dlt-dta-frm',
        dtafrmSrv: 'dta-frm-srv',
        crtDtaFrmSrv: 'crt-dta-frm-srv',
        getDtaFrmSrv: 'get-dta-frm-srv',
        getDtaFrmUsrSrv: 'get-dusr-frm-srv',
        updDtaFrmSrv: 'upd-dta-frm-srv',
        upFileDtaFrmSrv: 'upf-dta-frm-srv',
        dltDtaFrmSrv: 'dlt-dta-frm-srv',
        meeting: 'meeting',
        crtMeeting: 'crt-meet',
        getMeeting: 'get-meet',
        getKeyMeeting: 'get-keymeet',
        updMeeting: 'upd-meet',
        dltMeeting: 'dlt-meet',
        meetingSrv: 'zoom-meet-srv',
        crtMeetingSrv: 'crt-meet-srv',
        getMeetingSrv: 'get-meet-srv',
        getKeyMeetingSrv: 'get-keymeet-srv',
        updMeetingSrv: 'upd-meet-srv',
        confrmMeeting: 'confrm-meeting',
        dltMeetingSrv: 'dlt-meet-srv',
//aqui servicios de smart consent
        crtPatient:'crt-patient-srv',
        getPatients: 'get-dta-patients-srv',
        crtProcess: 'crt-process-srv',
        getProcess:'get-dta-proc-srv',
        crtStableSrv:'crt-stablet-srv',
        getEspec: 'get-dta-esp-srv',
        crtConsent:'crt-consent-srv',
        getConsent:'get-consent-srv',
        getStablishment:'get-dta-stb-srv'

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