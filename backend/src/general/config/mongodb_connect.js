const mongoose = require('mongoose');
const { mongodb, mongodbTest, mongodbDev, environment } = require('./data_config');
let config;

switch (environment) {
    case 'Production':
        config = mongodb;
      break;
    case 'Testing':
        config = mongodbTest;
      break;
    case 'Development':
        config = mongodbDev;
      break;
}

const mongoDbConnect = () => {
    mongoose.connect(`mongodb://${config.user}:${config.pwd}@${config.host}:${config.port}/${config.db}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(db => console.log('Momgodb connected'))
    .catch(err => console.log(err));
};

module.exports = mongoDbConnect;