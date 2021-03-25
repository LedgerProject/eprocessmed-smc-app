const data_config = {
    server: {
        host:'<host>',
        port:'<port>'
    },
    srvFront: {
        host:'<host>',
        port:'<port>'
    },
    srvBack: {
        host:'<host>',
        port:'<port>'
    },    
    serverTest: {
        host:'<host>',
        port:'<port>'
    },
    srvFrontTest: {
        host:'<host>',
        port:'<port>'
    },    
    srvBackTest: {
        host:'<host>',
        port:'<port>'
    },
    serverDev: {
        host:'<host>',
        port:'<port>'
    },
    srvFrontDev: {
        host:'<host>',
        port:'<port>'
    },    
    srvBackDev: {
        host:'<host>',
        port:'<port>'
    },
    otpSrv:{
        host: '<host>',
        port: '<port>'
    },
    mailSrv:{
        host: '<host>',
        port: '<port>'
    },    
    zoomSrv:{
        host: '<host>',
        port: '<port>'
    },    
    shortSrv:{
        host: '<host>',
        port: '<port>'
    },
    bockchHashSrv: {
        host: '<host>',
        port: '<port>'       
    },
    bockchCryptSrv: {
        host: '<host>',
        port: '<port>'
    },
    encryptIpfsSrv: {
        host: '<host>',
        port: '<port>'
    },
    rootDocs: '<path>',
    rootDocsTest: '<path>',
    rootDocsDev: '<path>',
    rootDocsPdf: '<path>',
    http: 'http://',
    https: 'https://',
    environment: 'Development', // Development || Testing || Production
    ssl: false,                 // false || true
    sslFront: false,
    sslBack: false,
    sslOtp: true,
    sslZoom: true,
    sslMail: true,
    sslShort: true,
    sslBock: false
};

module.exports = data_config;