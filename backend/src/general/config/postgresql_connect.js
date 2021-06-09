const { Pool } = require('pg');
const { postgresql, postgresqlTest, postgresqlDev, environment } = require('./data_config');
const { messagesSrv } = require('../global/functions/global_functions');
const { msgs } = require('../global/data/global_data');
let config;

switch (environment) {
    case 'Production':
        config = postgresql;
      break;
    case 'Testing':
        config = postgresqlTest;
      break;
    case 'Development':
        config = postgresqlDev;
      break;
}

const pool = (configDB) => {
    const poolConnect = new Pool(configDB);
    return poolConnect;
};

const tryConnect = async (req, res) => {
    try {
        poolSys = pool(config);
        await poolSys.connect();
        messagesSrv(config);
        messagesSrv(msgs.psqlConnected);
        return msgs.psqlConnected;
    } catch (err) {
        messagesSrv(`${msgs.psqlConnectF}${err}`);
        return `${msgs.psqlConnectF}${err}`;
    }
};

module.exports = {
    pool,
    tryConnect
};