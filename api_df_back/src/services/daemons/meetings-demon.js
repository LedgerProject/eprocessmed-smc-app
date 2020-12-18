// moinitorear meetingsMonitor
// Deamon de transferencia
var globalData = require('../../../global/globalData');
const removePause = require('./removePause');
const { messagesSrv } = require('../../../global/globalFunctions');

let j = 0,
    cycle = true;

const meetingsDaemon = () => {
  const { setting } = globalData;
//   let campMonitor = require('./campMonitor');
  let meetingsMonitor = require('./meetings-monitor'),
      d = new Date(),
      timeCycle = d.getTime();//milisegundos

  // console.log('meetingsDaemon meetingsMonitor');
  // console.log(meetingsMonitor);

  for (codCamp in meetingsMonitor) {
    if (timeCycle >= meetingsMonitor[codCamp].endEvent) {
      removePause(codCamp);
    }
  }

  // messagesSrv("meetingsDaemon: "+j);
  j++;
  
  if(cycle) {
    setTimeout(meetingsDaemon, setting.t_daem_m);
    //   if(campMonitor.length == 0 ) cycle = false; // Parametro de parada automatica ???
  }
}

module.exports = meetingsDaemon;