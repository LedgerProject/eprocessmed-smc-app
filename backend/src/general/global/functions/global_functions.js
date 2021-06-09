const fs = require('fs'); 
const activeLogsLevel = require('../data/active_logs_level');
const errorLogs = require('../data/error_logs');
// const rollbar = require('./rollbar');
const globalFunctions = {};

// Para errores Globales
globalFunctions.logEventGlobal = (lev) =>  {
  let errorLog = {
    level: 'error',
    msg: ''
  };
  errorLogs.forEach(errL => {
      const element = errL.codes.find(elmt => elmt.code === lev);
      if(element !== undefined){
        errorLog = {level: errL.level, msg: element.msg};
      }
  });
  if (activeLogsLevel === 9 || lev === activeLogsLevel) {
    // return rollbar.error(lev, errorLog.msg,  {level: errorLog.level});
  }
}

globalFunctions.messagesSrv = (mss) => {
  console.log(mss);
};

globalFunctions.saveLogs = (log) => {

  // guardar en DB

  // const stats = fs.statSync('./src/logs/logs.json');
  // const fileSizeInBytes = stats.size;
  // let newLog;

  // if (fileSizeInBytes === 0) {
  //   newLog = `${log}`;
  // } else {
  //   newLog = `,${log}`;
  // }

  // fs.appendFileSync('./src/logs/logs.json', newLog, 'utf8', (err) => {
  //   if (err) return console.log(err);
  // });

};

globalFunctions.warningAlert = (alert) => {
  console.log('warningAlert', alert);
};

globalFunctions.strgf = (obj) => {
  const str = JSON.stringify(obj);
  return str;
}

globalFunctions.prepareLog = (dataLog) => {
  const date = new Date();
  dataLog['date'] = date;
  const log = JSON.stringify(dataLog);
  this.saveLogs(log);
}

module.exports =  globalFunctions;