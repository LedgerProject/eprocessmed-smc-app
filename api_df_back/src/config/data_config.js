const data_config = {
    server: {
        host:'localhost',
        port: 8080
    },
    postgresql: {
        host: 'localhost',
        port: 8080,
        user: 'smc_user',
        password: 'password',
        database:'database'
    },
    serverTest: {
        host:'localhost',
        port: 8080
    },
    postgresqlTest: {
       host: 'localhost',
        port: 8080,
        user: 'smc_user',
        password: 'password',
        database:'database'
    },
    serverDev: {
       host:'localhost',
        port: 8080
    },
    postgresqlDev: {
        host: 'localhost',
        port: 8080,
        user: 'user',
        password: 'password',
        database: 'database'
    },
    rootDocs: '/data/documents/public/',
    rootDocsTest: '/data/documents/public/',
    rootDocsDev: './src/documents/',
    http: 'http://',
    https: 'https://',
    environment: 'Development',     // Development || Testing || Production
    ssl: false,                     // false || true
    setting: {
        t_daemMeeting_ms: 2000,
        t_reminderRank_ms: 900000
    }
};

module.exports = data_config;