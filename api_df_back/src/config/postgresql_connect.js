const { Pool } = require('pg');
const { postgresql, postgresqlTest, postgresqlDev, environment } = require('./data_config');
const { messagesSrv } = require('../global/global_functions');
const { msgs } = require('../global/global_data');
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

const pool = new Pool(config);

const tryConnect = async (req, res) => {
    await pool.connect();
    try {
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