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
      nSalt: 10,
      secrets: {
        jwt: {
          secret :'af668804f9162927b2aa2c1c07b83640'
        }
      },
      urls: {
        srvDbSrv: 'srv-db-srv',
        genQuerySrv: 'gen-query-srv',
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