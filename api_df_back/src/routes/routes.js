const router = require('express').Router();
const { urls } = require('../global/global_data');

/* Services Postgresql*/
const serverDbSrv = require('../services/postgresql/server_db_srv');
const usersSrv = require('../services/postgresql/users_srv');
const customersSrv = require('../services/postgresql/customers_srv');
const respondentsSrv = require('../services/postgresql/respondents_srv');
const parametersSrv = require('../services/postgresql/parameters_srv');
const formsSrv = require('../services/postgresql/forms_srv');
const formsSettingSrv = require('../services/postgresql/forms_setting_srv');
const custFormsSrv = require('../services/postgresql/cust_forms_srv');
const formsDataSrv = require('../services/postgresql/forms_data_srv');
const meetingSrv = require('../services/postgresql/meeting_srv');
const patientsSrv = require('../services/postgresql/patients_srv');
const procesSrv = require('../services/postgresql/process_srv');
const specialtiesSrv = require('../services/postgresql/specialty_srv');
const consentSrv = require('../services/postgresql/consent_srv');
const stablishmentSrv = require('../services/postgresql/stableshiment_srv');


// Ping Server/DB
router.get(`/${urls.srvDbSrv}`, serverDbSrv.ping);

// Users
router.get(`/${urls.usrSrv}`, usersSrv.list);
router.post(`/${urls.crtUsrSrv}`, usersSrv.create);
router.post(`/${urls.qyrUsrSrv}`, usersSrv.query);
// router.get(`/${urls.getUsrSrv}/:id`, usersSrv.getById);
router.put(`/${urls.updUsrSrv}`, usersSrv.upDate);
// router.delete(`/${urls.dltUsrSrv}/:id`, usersSrv.delete);
router.post(`/${urls.authUsrSrv}`, usersSrv.auth);
router.post(`/${urls.lgutUsrSrv}`, usersSrv.logout);

// Customers
router.get(`/${urls.custSrv}`, customersSrv.list);

// Respondent
router.get(`/${urls.respSrv}`, respondentsSrv.list);

// Respondent
router.get(`/${urls.paramsSrv}`, parametersSrv.list);

// Forms
router.get(`/${urls.frmSrv}`, formsSrv.list);
router.post(`/${urls.crtFrmSrv}`, formsSrv.create);
router.get(`/${urls.getFrmSrv}/:id`, formsSrv.getById);
router.put(`/${urls.updFrmSrv}/:id.:type`, formsSrv.upDate); 
router.delete(`/${urls.dltFrmSrv}/:id`, formsSrv.delete);

// Setting: Settings by form
router.get(`/${urls.setFrmSrv}`, formsSettingSrv.list);
router.post(`/${urls.crtSetFrmSrv}`, formsSettingSrv.create);
router.get(`/${urls.getSetFrmSrv}/:id`, formsSettingSrv.getById);
router.put(`/${urls.updSetFrmSrv}/:id.:type`, formsSettingSrv.upDate);
router.delete(`/${urls.dltSetFrmSrv}/:id`, formsSettingSrv.delete);

//Customers : Form and Setting by Client
router.get(`/${urls.custFrmSrv}`, custFormsSrv.list);
router.post(`/${urls.crtCustFrmSrv}`, custFormsSrv.create);
router.get(`/${urls.getCustFrmSrv}/:id`, custFormsSrv.getById);
router.put(`/${urls.updCustFrmSrv}/:id.:type`, custFormsSrv.upDate);
router.delete(`/${urls.dltCustFrmSrv}/:id`, custFormsSrv.delete);

// Data
router.get(`/${urls.dtafrmSrv}`, formsDataSrv.list);
router.post(`/${urls.crtDtaFrmSrv}`, formsDataSrv.create);
router.get(`/${urls.getDtaFrmSrv}/:id`, formsDataSrv.getById);
router.post(`/${urls.getDtaFrmUsrSrv}`, formsDataSrv.getByIdUsr);
router.put(`/${urls.updDtaFrmSrv}`, formsDataSrv.upDate);
router.put(`/${urls.upFileDtaFrmSrv}`, formsDataSrv.upfile);
router.delete(`/${urls.dltDtaFrmSrv}/:id`, formsDataSrv.delete);

// Meeting
router.get(`/${urls.meetingSrv}`, meetingSrv.list);
router.post(`/${urls.crtMeetingSrv}`, meetingSrv.create);
router.get(`/${urls.getMeetingSrv}/:id`, meetingSrv.getById);
router.get(`/${urls.getKeyMeetingSrv}/:key`, meetingSrv.getByKey);
router.put(`/${urls.updMeetingSrv}`, meetingSrv.upDate);
router.delete(`/${urls.dltMeetingSrv}/:id`, meetingSrv.delete);


//Patients
router.get(`/${urls.getCltSrv}`, patientsSrv.list);
router.post(`/${urls.crtPatientScv}`, patientsSrv.create);

//Process
router.get(`/${urls.getProcessSrv}`, procesSrv.list);
router.post(`/${urls.crtProcessSrv}`, procesSrv.create);


//Specialties
router.get(`/${urls.getEspecSrv}`, specialtiesSrv.list);

//Stbaleshiment
router.get(`/${urls.getStablishment}`, stablishmentSrv.list);

//Consent
router.get(`/${urls.getConsentSrv}`, consentSrv.list);
router.post(`/${urls.crtConsentSrv}`, consentSrv.create);


module.exports = router;