const express = require('express');
const app = express();
const bodyParser = require('body-parser');


//Middlewares
app.use(express.json({limit: '250mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '250mb'}));
app.use(bodyParser.urlencoded({limit: '250mb', extended: true}));

//Definimos las rutas
app.use(require('./routes/index'));

//Definimos el puerto
const puerto = app.listen(8085);

console.log('Ejecutando');