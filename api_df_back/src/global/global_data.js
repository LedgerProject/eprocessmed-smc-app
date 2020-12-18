const dataConfig = require('../config/data_config');
let http;
let host;
let port;

/*  Environment Settings */
switch (dataConfig.environment) {
  case 'Production':
      host = dataConfig.server.host;
      port = dataConfig.server.port;
    break;
  case 'Testing':
      host = dataConfig.serverTest.host;
      port = dataConfig.serverTest.port;
    break;
  case 'Development':
      host = dataConfig.serverDev.host;
      port = dataConfig.serverDev.port;
    break;
}

/*  Http configuration  */
if (dataConfig.ssl) {
  http = dataConfig.https;
} else {
  http = dataConfig.http;
}

console.log(`${http}${host}:${port}/`);
const rootURI = `${http}${host}:${port}/`;
const rootDocs = `./src/documents/`;

const global_data = {
      rootURI,
      rootDocs,
      nSalt: 1,
      secrets: {
        jwt: {
          secret :'secret'
        }
      },
      urls: {
        srvDbSrv: 'srv-db-srv',
        usrSrv: 'usr-srv',
        crtUsrSrv: 'crt-usr-srv',
        qyrUsrSrv: 'qry-usr-srv',
        getUsrSrv: 'get-usr-srv',
        updUsrSrv: 'upd-usr-srv',
        dltUsrSrv: 'dlt-usr-srv',
        authUsrSrv: 'ath-usr-srv',
        lgutUsrSrv: 'lgt-usr-srv',
        sendOtpUsrSrv: 'send-otp-usr-srv',
        custSrv: 'cust-srv',
        respSrv: 'resp-srv',
        paramsSrv: 'params-srv',        
        frmSrv: 'frm-srv',
        crtFrmSrv: 'crt-frm-srv',
        getFrmSrv: 'get-frm-srv',
        updFrmSrv: 'upd-frm-srv',
        dltFrmSrv: 'dlt-frm-srv',
        setFrmSrv: 'set-frm-srv',
        crtSetFrmSrv: 'crt-set-frm-srv',
        getSetFrmSrv: 'get-set-frm-srv',
        updSetFrmSrv: 'upd-set-frm-srv',
        dltSetFrmSrv: 'dlt-set-frm-srv',
        custFrmSrv: 'cust-forms-srv',
        crtCustFrmSrv: 'crt-cust-frm-srv',
        getCustFrmSrv: 'get-cust-frm-srv',
        updCustFrmSrv: 'upd-cust-frm-srv',
        dltCustFrmSrv: 'dlt-cust-frm-srv',   
        dtafrmSrv: 'dta-frm-srv',
        crtDtaFrmSrv: 'crt-dta-frm-srv',
        getDtaFrmSrv: 'get-dta-frm-srv',
        getDtaFrmUsrSrv: 'get-dusr-frm-srv',
        updDtaFrmSrv: 'upd-dta-frm-srv',
        upFileDtaFrmSrv: 'upf-dta-frm-srv',
        dltDtaFrmSrv: 'dlt-dta-frm-srv',
        meetingSrv: 'zoom-meet-srv',
        crtMeetingSrv: 'crt-meet-srv',
        getMeetingSrv: 'get-meet-srv',
        getKeyMeetingSrv: 'get-keymeet-srv',
        updMeetingSrv: 'upd-meet-srv',
        dltMeetingSrv: 'dlt-meet-srv',
        getCltSrv: 'get-dta-patients-srv',
        crtPatientScv:'crt-patient-srv',
        getProcessSrv:'get-dta-proc-srv',
        crtProcessSrv:'crt-process-srv',
        getEspecSrv: 'get-dta-esp-srv',
        getConsentSrv:'get-consent-srv',
        crtConsentSrv:'crt-consent-srv',
        getStablishment:'get-dta-stb-srv',
        crtStableSrv:'crt-stablet-srv'

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