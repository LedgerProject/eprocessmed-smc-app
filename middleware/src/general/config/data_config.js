const data_config = {
    server: {
        host:'localhost',
        port: 8080
    },
    srvFront: {
        host:'localhost',
        port:''
    },
    srvBack: {
        host:'localhost',
        port: 8080
    },    
    serverTest: {
        host:'localhost',
        port: 8080
    },
    srvFrontTest: {
        host:'localhost',
        port: 8080
    },    
    srvBackTest: {
        host:'localhost',
        port: 8080
    },
    serverDev: {
        host:'localhost',
        port: 8080
    },
    srvFrontDev: {
        host:'localhost',
        port: 8080
    },    
    srvBackDev: {
        host:'localhost',
        port: 8080
    },
    otpSrv:{
        host: 'localhost',
        port: 8080
    },
    mailSrv:{
        host: 'localhost',
        port: 8080
    },    
    zoomSrv:{
        host: 'localhost',
        port: 8080
    },    
    shortSrv:{
        host: 'localhost',
        port: 8080
    },
    bockchHashSrv: {
        host: 'localhost',
        port: 8080       
    },
    bockchCryptSrv: {
        host: 'localhost',
        port: 8080
    },
    encryptIpfsSrv: {
        host: 'localhost',
        port: 8085
    },
    serverPdfDev: {
        host: 'localhost',
        port: 8080
    },
    serverPdfTest: {
        host: 'localhost',
        port: 8080
    },
    serverPdfProd: {
        host: 'localhost',
        port: 8080
    },
    serverWhatsapp: {
        host: 'localhost',
        port: 8080
    },
    rootDocs: '/data/documents/temp/',
    rootDocsTest: '/data/documents/temp/',
    rootDocsDev: './src/documents/',
    rootDocsPdf:'public/',
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
    sslBock: false,
    sslPdf: false,
    sslWhatsapp: false
};

module.exports = data_config;