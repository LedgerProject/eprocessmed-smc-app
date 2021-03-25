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
  genQuery: 'gen-query',
  getPatient: 'get-patient',
  newPatient: 'new-patient',
  getStablishment: 'get-stablishment',
  getStablishmentById: 'get-stablishmentByid',
  newStablishment: 'new-stablishment',
  updateStablishment: 'upd-stablishment',
  deleteStablishment: 'del-stablishment',
  ncrypt: 'ncrypt',
  decrypt: 'decrypt'
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
