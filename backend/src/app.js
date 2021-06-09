const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const app = express();
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const routes = require('./security/routes/routes');
const { tryConnect } = require('./general/config/postgresql_connect');

// const mongoDB = require('./general/config/mongoDbConnect');
const { server } = require('./general/config/data_config');
const { messagesSrv } = require('./general/global/functions/global_functions');
const { msgs } = require('./general/global/data/global_data');

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