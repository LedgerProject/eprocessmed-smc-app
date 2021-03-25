const router = require('express').Router();
const { urls } = require('../../general/global/data/global_data');

/* Services Postgresql*/
const serverDbSrv = require('../../service-mngmt/services/postgresql/server_db_srv');
const generalInquirySrv = require('../../service-mngmt/services/postgresql/general_inquiry_srv');

// Ping Server/DB
router.get(`/${urls.srvDbSrv}`, serverDbSrv.ping);

// General Query
router.get(`/${urls.genQuerySrv}`, generalInquirySrv.query);
router.post(`/${urls.genQuerySrv}`, generalInquirySrv.query);
router.put(`/${urls.genQuerySrv}`, generalInquirySrv.query);
router.delete(`/${urls.genQuerySrv}`, generalInquirySrv.query);

module.exports = router;