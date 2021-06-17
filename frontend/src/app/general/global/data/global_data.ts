import { dataConfig } from '../../config/data_config';
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
  genQuery: 'gen-query',
  crtUpdPatient: 'crt-upd-patient',
  crtUpdUser: 'crt-upd-usr',
  crtUpdStablishment: 'crt-upd-stablishment',
  ncrypt: 'ncrypt',
  decrypt: 'decrypt',
  users: 'users',
  dataSend:'data-send',
  qyrUsr: 'qry-usr',
  crtUsr: 'crt-usr',
  crtformsUsr: 'crt-forms-usr',
  getUsr: 'get-usr',
  updUsr: 'upd-usr',
  dltUsr: 'dlt-usr',
  authUsr: 'ath-usr',
  lgutUsr: 'lgt-usr',
  getHash: 'get-hash',
  customerUsr: 'customer-usr',
  sendOtpUsr: 'send-otp-usr',
  cust: 'customers',
  custPolitics: 'cust-politics',
  custById: 'cust-by-id',
  resp: 'respondents',
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
  createPeriodic: 'crt-create-pereodic',
  getCustFrm: 'get-cust-frm',
  getDtaFrmHash: 'get-dta-frm-hash',
  updCustFrm: 'upd-cust-frm',
  dltCustFrm: 'dlt-cust-frm',
  dtaFrm: 'dta-forms',
  crtDtaFrm: 'crt-dta-frm',
  sendDataBlock: 'send-dta-block',
  callDataBlock: 'call-dta-block',
  getPatientForms: 'patient-frm',
  getDtaFrm: 'get-dta-frm',// sustituir
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
  resMeeting: 'res-meet',
  getConsentStructure:'get-consent-structure-usr',
  getConsentPendingPatient:'get-consent-pending-crt',
  consentBySpecialist:'consent-by-specialist',
  sendOtpConsent:'send-code-consent',
  updateConsent:'update-consent',
  getProcessDetail: 'get-process-detail-crt',
  validateOtpConsent: 'validate-otp-consent',
  sendCodeWatsapp:'send-code-whatsapp'
};

export const globalData = {
  session,
  setting: {
    http,
    host,
    port
  },
  urls,
  allowedExt: ['pdf', 'jpg', 'jpeg', 'svg', 'png'],
  sizeFile: 5000000
}
