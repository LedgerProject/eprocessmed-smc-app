const router = require('express').Router();
const { urls } = require('../../general/global/data/global_data');

/* Services Postgresql */
const serverDbSrv = require('../../service-mngmt/postgresql/server_db_srv');
const generalInquirySrv = require('../../service-mngmt/postgresql/general_inquiry_srv');
const usersSrv = require('../../service-mngmt/postgresql/users_srv');

// Ping Server/DB
router.get(`/${urls.srvDbSrv}`, serverDbSrv.ping);

// General Query
router.get(`/${urls.genQuerySrv}`, generalInquirySrv.query);
router.post(`/${urls.genQuerySrv}`, generalInquirySrv.query);
router.put(`/${urls.genQuerySrv}`, generalInquirySrv.query);
router.delete(`/${urls.genQuerySrv}`, generalInquirySrv.query);

// Users
router.post(`/${urls.usrByPrmSrv}`, usersSrv.usrByPrm);
router.post(`/${urls.crtUsrSrv}`, usersSrv.create);
// router.post(`/${urls.udtUsrSrv}`, usersSrv.update);
router.post(`/${urls.authUsrSrv}`, usersSrv.auth);

module.exports = router;