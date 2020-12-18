const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const app = express();
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const routes = require('./routes/routes');
const { tryConnect } = require('./config/postgresql_connect');
// const mongoDB = require('./config/mongoDbConnect');
const { server } = require('./config/data_config');
const { messagesSrv } = require('./global/global_functions');
const { msgs } = require('./global/global_data');

// settings
app.set('port', process.env.PORT || `${server.port}`);

// db settings
tryConnect();
// mongoDB();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(fileUpload());
app.use(morgan('dev'));

// satic files
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', routes);

// bootstraping the app
app.listen(`${server.port}`, () => messagesSrv(msgs.startServerMsg));



// if (cluster.isMaster) {
//   console.log(`Master ${process.pid} is running`);

//   console.log('numCPUs');
//   console.log(numCPUs);

//   // Si solo hay un cpu clusterAsigner = Master
//   // Si hay más de uno clusterAsigner = Id(1)

//   // fork workers.
//   for (let i = 0; i < numCPUs; i++) {// crear solo dos
//     cluster.fork();
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//     // Enviar demonio al cluster workers signado
//   });
// } else {
//   console.log(`Worker ${process.pid} started`);
//   // Invocar Demonio
// }