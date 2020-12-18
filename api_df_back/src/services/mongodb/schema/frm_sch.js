const mongoose = require('mongoose');
mongoose.set('autoIndex', false);
const Schema = mongoose.Schema;

const markedSchema = Schema({
  ext: String,
  status: String
});

const agentsSchema = Schema({
  ext: String,
  status: String,
  time: Number,
  channel: String
});

const channelsSchema = Schema({
  extMark: String,
  channel: String,
  time: Number
});


const campSch = Schema({
  codCamp: String,
  marked: [ markedSchema ],
  agents: [ agentsSchema ],
  channels: [],
  statusCall: String,
  idProject: Number
});

const frmSch = Schema({
  camp: [campSch]
});

module.exports = campSch;

// const campSch = Schema({
//   codCamp: String,
//   marked: [ markedSchema ],
//   agents: [ agentsSchema ],
//   channels: [ channelsSchema ],
//   statusCall: [],
//   statusCamp: {
//     type: Boolean,
//     default: true
//   },
//   statusAgent: String
// });