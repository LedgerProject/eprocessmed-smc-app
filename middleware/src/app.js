const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const app = express();
const routes = require('./security/routes/routes');
const { server } = require('./general/config/data_config');
const { messagesSrv } = require('./general/global/global_functions');
const { msgs } = require('./general/global/global_data');

// settings
app.set('port', process.env.PORT || `${server.port}`);

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