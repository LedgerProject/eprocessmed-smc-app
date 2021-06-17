const data_config = {
    server: {
        host:'localhost',
        port: 8080
    },
    srvFront: {
        host:'localhost',
        port: 8080
    },
    postgresql: {
        host: 'localhost',
        port: 8080,
        user: 'user',
        password: 'password',
        database:'database'
    },
    mongodb: {
        host: 'localhost',
        port: 8080,
        db: 'db',
        user: 'user',
        pwd: 'pwd'
    },
    serverTest: {
        host:'localhost',
        port: 8080
    },
    srvFrontTest: {
        host:'localhost',
        port: 8080
    },  
    postgresqlTest: {
        host: 'localhost',
        port: 8080,
        user: 'user',
        password: 'password',
        database:'database'
    },
    mongodbTest: {
        host: 'localhost',
        port: 8080,
        db: 'db',
        user: 'user',
        pwd: 'pwd'
    },
    serverDev: {
       host:'localhost',
        port: 8080
    },
    srvFrontDev: {
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
    mongodbDev: {
        host: 'localhost',
        port: 8080,
        db: 'db',
        user: 'user',
        pwd: 'pwd'
    },
    otpSrv:{
        host: 'localhost',
        port: 8080
    },
    mailSrv:{
        host: 'localhost',
        port: 8080
    },    
    shortSrv:{
        host: 'localhost',
        port: 8080
    },
    bockchCryptSrv: {
        host: 'localhost',
        port: 8080
    },
    rootDocs: '/data/documents/public/',
    rootDocsTest: '/data/documents/public/',
    rootDocsDev: './src/documents/',
    http: 'http://',
    https: 'https://',
    environment: 'Development',     // Development || Testing || Production
    ssl: false,                 // false || true
    sslFront: false,
    sslOtp: true,
    sslMail: true,
    sslShort: true,
    sslBock: false,
    setting: {
        t_daemMeeting_ms: 2000,         //  Tiempo de chequeo del Demonio 3600000: 1H
        t_reminderLeadTime: 10800000,   //  Tiempo de antelación del recordatorio: 10800000: 3H
        t_reminderRank_ms: 900000,      //  Tiempo del ramgo al tiempo de antelacion del recordartotio 900000: 15M
    }
};

module.exports = data_config;