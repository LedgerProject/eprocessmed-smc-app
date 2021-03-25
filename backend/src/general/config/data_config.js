const data_config = {
    server: {
        host: '<host>',
        port: '<port>'
    },
    srvFront: {
        host: '<host>',
        port: '<port>'
    },
    postgresql: {
       host: '<host>',
        port: '<port>',
        user: '<user>',
        password: '<password>',
        database:'<database>'
    },
    mongodb: {
        host: '<host>',
        port: '<port>',
        db: '<database>',
        user: '<user>',
        pwd: '<password>'
    },
    serverTest: {
        host:'<host>',
        port: '<port>'
    },
    srvFrontTest: {
        host:'<host>',
        port:'<port>'
    },  
    postgresqlTest: {
       host: '<host>',
        port: '<port>',
        user: '<user>',
        password: '<password>',
        database:'<database>'
    },
    mongodbTest: {
        host: '<host>',
        port: '<port>',
        db: '<database>',
        user: '<user>',
        pwd: '<password>'
    },
    serverDev: {
       host:'<host>',
        port: '<port>'
    },
    srvFrontDev: {
        host:'<host>',
        port:'<port>'
    },
    postgresqlDev: {
        host: '<host>',
        port: '<port>',
        user: '<user>',
        password: '<password>',
        database: '<database>'
    },
    mongodbDev: {
        host: '<host>',
        port: '<port>',
        db: '<database>',
        user: '<user>',
        pwd: '<password>'
    },
    otpSrv:{
        host: '<host>',
        port: '<port>'
    },
    mailSrv:{
        host: '<host>',
        port: '<port>'
    },    
    shortSrv:{
        host: '<host>',
        port: '<port>'
    },
    rootDocs: '<path>',
    rootDocsTest: '<path>',
    rootDocsDev: '<path>',
    http: 'http://',
    https: 'https://',
    environment: 'Development',     // Development || Testing || Production
    ssl: false,                     // false || true
    sslFront: false,
    sslOtp: true,
    sslMail: true,
    sslShort: true,
    setting: {
        t_daemMeeting_ms: 2000,         //  Tiempo de chequeo del Demonio 3600000: 1H
        t_reminderLeadTime: 10800000,   //  Tiempo de antelación del recordatorio: 10800000: 3H
        t_reminderRank_ms: 900000,      //  Tiempo del ramgo al tiempo de antelacion del recordartotio 900000: 15M
    }
};

module.exports = data_config;