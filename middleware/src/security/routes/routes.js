const router = require('express').Router();
const { urls } = require('../../general/global/global_data');

/* Controllers Postgresql */
const serverBackCtr = require('../../general/controllers/postgresql/server_back_ctr');
const generalInquiryCtr = require('../../general/controllers/postgresql/general_inquiry_ctr');
const stablishmentCtr = require('../../general/controllers/postgresql/stablishment_ctr');
const patientsCtr = require('../../general/controllers/postgresql/patients_ctr');
const serverBockchainCtr = require('../../general/controllers/postgresql/server_bockchain_ctr');
const processCtr = require('../../general/controllers/postgresql/process_ctr');
const consentCtr = require('../../general/controllers/postgresql/consent_ctr');

// Ping Server/Back
router.get(`/${urls.srvMidd}`, serverBackCtr.ping);

// General Query referente -> table, actions [list, create, update, delete]
router.get(`/${urls.genQuery}`, generalInquiryCtr.query);
router.post(`/${urls.genQuery}`, generalInquiryCtr.query);
router.put(`/${urls.genQuery}`, generalInquiryCtr.query);
router.delete(`/${urls.genQuery}`, generalInquiryCtr.query);

// stablishment Query
router.post(`/${urls.newStablishment}`, stablishmentCtr.create);

// patients Query
router.post(`/${urls.newPatient}`, patientsCtr.create);

//
router.post(`/${urls.ncrypt}`, serverBockchainCtr.ndecrypt);
router.post(`/${urls.decrypt}`, serverBockchainCtr.ndecrypt);

// Process structure 
router.post(`/${urls.getProcessDetail}`, processCtr.getProcessDById);

// Consent create pdf
router.post(`/${urls.crtConsent}`, consentCtr.create);

module.exports = router;