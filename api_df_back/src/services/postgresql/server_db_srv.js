const { pool, tryConnect } = require('../../config/postgresql_connect');
const { msgs } = require('../../global/global_data');
const serverDbSrv = {};

serverDbSrv.ping = async (req, res) => {
  const answer = await tryConnect();
  try {
    res.status(200).json({
      correct: true,
      resp: answer
    });
  } catch (err) {
    res.status(400).json({
      correct: false,
      resp: answer
    });
  }
};

module.exports = serverDbSrv;