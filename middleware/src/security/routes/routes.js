const router = require('express').Router();
const { urls } = require('../../general/global/data/global_data');

/* Controllers Postgresql */
const serverBackCtr = require('../../general/controllers/postgresql/server_back_ctr');
const generalInquiryCtr = require('../../general/controllers/postgresql/general_inquiry_ctr');
const stablishmentCtr = require('../../general/controllers/postgresql/stablishment_ctr');
const patientsCtr = require('../../general/controllers/postgresql/patients_ctr');
const usersCtr = require('../../general/controllers/postgresql/users_ctr');
const serverBockchainCtr = require('../../general/controllers/services/server_bockchain_ctr');
const processCtr = require('../../general/controllers/postgresql/process_ctr');
const consentCtr = require('../../general/controllers/postgresql/consent_ctr');
const sendMailCtr = require('../../general/controllers/postgresql/send_mail_ctr');

/*  */
const fromsCtr = require('../../process-mngmt/dynamic-forms/controllers/postgresql/forms_ctr');

// Ping Server/Back
router.get(`/${urls.srvMidd}`, serverBackCtr.ping);

// General Query referente -> table, actions [list, create, update, delete]
router.get(`/${urls.genQuery}`, generalInquiryCtr.query);
router.post(`/${urls.genQuery}`, generalInquiryCtr.query);
router.put(`/${urls.genQuery}`, generalInquiryCtr.query);
router.delete(`/${urls.genQuery}`, generalInquiryCtr.query);

// Stablishment
router.post(`/${urls.crtUpdStablishment}`, stablishmentCtr.ctrUpd);

// Patients
router.post(`/${urls.crtUpdPatient}`, patientsCtr.ctrUpd);
router.post(`/${urls.getPatientByStablishment}`, patientsCtr.getPatientsByStablishment);

// Users
router.post(`/${urls.crtUpdUser}`, usersCtr.ctrUser);// Evaluar separarlas
router.post(`/${urls.authUsr}`, usersCtr.auth);
router.post(`/${urls.sendOtpUsr}`, usersCtr.sendOtp);
// router.post(`/${urls.lgutUsr}`, usersCtr.logout);

//
router.get(`/${urls.getHash}`, usersCtr.getHashExt);

//
router.post(`/${urls.ncrypt}`, serverBockchainCtr.ndecrypt);
router.post(`/${urls.decrypt}`, serverBockchainCtr.ndecrypt);

// Process structure 
router.post(`/${urls.getProcessDetail}`, processCtr.getProcessDById);

// Consent create pdf
router.post(`/${urls.crtConsent}`, consentCtr.create);
router.post(`/${urls.getConsentPending}`, consentCtr.getPendingConsentsByPatient);
router.post(`/${urls.getConsentStructure}`, consentCtr.getStructureConsent);
router.post(`/${urls.consentBySpecialist}`, consentCtr.getConsentBySpecialist);
router.post(`/${urls.sendCodeConsent}`, consentCtr.sendOtp);
router.post(`/${urls.validateOtpConsent}`, consentCtr.validateCodeOtp);
router.post(`/${urls.sendCodeWatsapp}`, consentCtr.sendWhatsapp);

/*  */

// Patient Forms
router.post(`/${urls.getPatientForms}`, fromsCtr.patientForms);

// send-mail
router.post(`/${urls.sendMail}`, sendMailCtr.send);

module.exports = router;