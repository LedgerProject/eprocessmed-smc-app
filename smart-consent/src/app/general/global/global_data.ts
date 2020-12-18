import { dataConfig } from '../config/data_config';
let session = false;
let http;
let host;
let port;

/*  Environment Settings */
switch (dataConfig.environment) {
  case 'Production':
      host = dataConfig.srvMiddl.host;
      port = dataConfig.srvMiddl.port;
    break;
  case 'Testing':
      host = dataConfig.srvMiddlTest.host;
      port = dataConfig.srvMiddlTest.port;
    break;
  case 'Development':
      host = dataConfig.srvMiddlDev.host;
      port = dataConfig.srvMiddlDev.port;
    break;
}

/*  Http configuration  */
if (dataConfig.ssl) {
  http = dataConfig.https;
} else {
  http = dataConfig.http;
}

const rootURI = `${http}${host}:${port}/`;

const urls = {
  rootURI,
  srvMidd: 'srv-midd',
  users: 'users',
  usrmmd:'usr-srv',
  qyrUsr: 'qry-usr',
  crtUsr: 'crt-usr',
  getUsr: 'get-usr',
  updUsr: 'upd-usr',
  dltUsr: 'dlt-usr',
  authUsr: 'ath-usr',
  lgutUsr: 'lgt-usr',
  sendOtpUsr: 'send-otp-usr',
  cust: 'customers',
  resp: 'respondents',
  params: 'parameters',
  frm: 'forms',
  crtFrm: 'crt-frm',
  getFrm: 'get-frm',
  updFrm: 'upd-frm',
  dltFrm: 'dlt-frm',
  setFrm: 'set-forms',
  crtSetFrm: 'crt-set-frm',
  getSetFrm: 'get-set-frm',
  updSetFrm: 'upd-set-frm',
  dltSetFrm: 'dlt-set-frm',
  custFrm: 'cust-forms',
  crtCustFrm: 'crt-cust-frm',
  getCustFrm: 'get-cust-frm',
  updCustFrm: 'upd-cust-frm',
  dltCustFrm: 'dlt-cust-frm',
  dtaFrm: 'dta-forms',
  crtDtaFrm: 'crt-dta-frm',
  getDtaFrm: 'get-dta-frm',
  getDtaFrmUsr: 'get-dusr-frm',
  updDtaFrm: 'upd-dta-frm',
  upFileDtaFrm: 'upf-dta-frm',
  dltDtaFrm: 'dlt-dta-frm',
  meeting: 'meeting',
  crtMeeting: 'crt-meet',
  getMeeting: 'get-meet',
  getKeyMeeting: 'get-keymeet',
  updMeeting: 'upd-meet',
  dltMeeting: 'dlt-meet',
//AQUI URL DE SMARTCONSENT
   getPatients: 'get-dta-patients-srv',
   crtPatient:'crt-patient-srv',
   getProcess:'get-dta-proc-srv',
   crtProcess:'crt-process-srv',
   getEspec: 'get-dta-esp-srv',
   crtConsent:'crt-consent-srv',
   getStablishment:'get-dta-stb-srv',
   crtStablishment:'crt-stablet-srv'
};

export const globalData = {
  session,
  urls,
  allowedExt: ['pdf', 'jpg', 'jpeg', 'svg', 'png'],
  sizeFile: 5000000
}
