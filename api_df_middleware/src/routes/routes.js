const router = require('express').Router();
const { urls } = require('../global/global_data');

/* Controllers Postgresql */
const serverBackCtr = require('../controllers/postgresql/server_back_ctr');
const usersCtr = require('../controllers/postgresql/users_ctr');
const customersCtr = require('../controllers/postgresql/customers_ctr');
const respondentsCtr = require('../controllers/postgresql/respondents_ctr');
const parametersCtr = require('../controllers/postgresql/parameters_ctr');
const formsCtr = require('../controllers/postgresql/forms_ctr');
const formsSettingCtr = require('../controllers/postgresql/forms_setting_ctr');
const custFrmsCtr = require('../controllers/postgresql/cust_forms_ctr');
const formsDataCtr = require('../controllers/postgresql/forms_data_ctr');
const meetingCtr = require('../controllers/postgresql/meeting_ctr');
//CONTROLLER DE SMART CONSENT
const patientsCtr = require('../controllers/postgresql/patients_ctr');
const processCtr = require('../controllers/postgresql/process_ctr');
const specialtiesCtr = require('../controllers/postgresql/specialty_ctr');
const consentsCtr = require('../controllers/postgresql/consents_ctr');
const stablishmentCtr = require('../controllers/postgresql/stablishment_ctr');



// Ping Server/Back
router.get(`/${urls.srvMidd}`, serverBackCtr.ping);

// Users
router.get(`/${urls.usrSrv}`, usersCtr.list);
router.post(`/${urls.crtUsr}`, usersCtr.create);
router.post(`/${urls.qyrUsr}`, usersCtr.query);
// router.get(`/${urls.getUsr}/:id`, usersCtr.getById);
router.put(`/${urls.updUsr}`, usersCtr.upDate);
// router.delete(`/${urls.dltUsr}/:id`, usersCtr.delete);
router.post(`/${urls.authUsr}`, usersCtr.auth);
// router.get(`/${urls.authUsr}`, usersCtr.auth);// Por error en apache
router.post(`/${urls.lgutUsr}`, usersCtr.logout);
router.post(`/${urls.sendOtpUsr}`, usersCtr.sendOtp);

// Customers
router.get(`/${urls.cust}`, customersCtr.list);

// Respondents
router.get(`/${urls.resp}`, respondentsCtr.list);

// Parameters
router.get(`/${urls.params}`, parametersCtr.list);

// Forms
router.get(`${urls.index}`, formsCtr.list);
router.get(`/${urls.frm}`, formsCtr.list);
router.post(`/${urls.crtFrm}`, formsCtr.create);
router.get(`/${urls.getFrm}/:id`, formsCtr.getById);
router.put(`/${urls.updFrm}/:id.:type`, formsCtr.upDate);
router.delete(`/${urls.dltFrm}/:id`, formsCtr.delete);

// Setting
router.get(`/${urls.setFrm}`, formsSettingCtr.list);
router.post(`/${urls.crtSetFrm}`, formsSettingCtr.create);
router.get(`/${urls.getSetFrm}/:id`, formsSettingCtr.getById);
router.put(`/${urls.updSetFrm}/:id.:type`, formsSettingCtr.upDate);
router.delete(`/${urls.dltSetFrm}/:id`, formsSettingCtr.delete);

// Customers forms : Form and Setting by Client
router.get(`/${urls.custFrm}`, custFrmsCtr.list);
router.post(`/${urls.crtCustFrm}`, custFrmsCtr.create);
router.get(`/${urls.getCustFrm}/:id`, custFrmsCtr.getById);
router.put(`/${urls.updCustFrm}/:id.:type`, custFrmsCtr.upDate);
router.delete(`/${urls.dltCustFrm}/:id`, custFrmsCtr.delete);

// Data
router.get(`/${urls.dtaFrm}`, formsDataCtr.list);
router.post(`/${urls.crtDtaFrm}`, formsDataCtr.create);
router.get(`/${urls.getDtaFrm}/:id`, formsDataCtr.getById);
router.post(`/${urls.getDtaFrmUsr}`, formsDataCtr.getByIdUsr);
router.put(`/${urls.updDtaFrm}`, formsDataCtr.upDate);
router.put(`/${urls.upFileDtaFrm}`, formsDataCtr.upfile);
router.delete(`/${urls.dltDtaFrm}/:id`, formsDataCtr.delete);

// Meeting
router.get(`/${urls.meeting}`, meetingCtr.list);
router.post(`/${urls.crtMeeting}`, meetingCtr.create);
router.get(`/${urls.getMeeting}/:id`, meetingCtr.getById);
router.get(`/${urls.getKeyMeeting}/:key`, meetingCtr.getByKey);
router.put(`/${urls.updMeeting}`, meetingCtr.upDate);
router.get(`/${urls.confrmMeeting}/:key`, meetingCtr.upDate);// ruta de confirmación de reunión
router.delete(`/${urls.dltMeeting}/:id`, meetingCtr.delete);

//Patients
router.get(`/${urls.getPatients}`, patientsCtr.list);
router.post(`/${urls.crtPatient}`, patientsCtr.create);

//Process
router.get(`/${urls.getProcess}`, processCtr.list);
router.post(`/${urls.crtProcess}`, processCtr.create);

//Specialties
router.get(`/${urls.getEspec}`, specialtiesCtr.list);

//Consent
router.post(`/${urls.crtConsent}`, consentsCtr.create);

//Stableshiment
router.get(`/${urls.getStablishment}`, stablishmentCtr.list);
router.post(`/${urls.crtStableSrv}`, stablishmentCtr.create);




module.exports = router;