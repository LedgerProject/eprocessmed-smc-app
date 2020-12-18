const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const app = express();
const routes = require('./routes/routes');
const { server } = require('./config/data_config');
const { messagesSrv } = require('./global/global_functions');
const { msgs } = require('./global/global_data');

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