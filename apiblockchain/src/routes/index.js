const { Router } = require('express');
const router = Router();

const { getConsent, setConsent, getConsentByHash, setTransacciones, getTransacciones } = require('../controllers/indexController');



router.get('/consent', getConsent );
router.get('/consent/:hash_consent', getConsentByHash );
router.post('/consent', setConsent);
router.get('/transacciones', getTransacciones);
router.post('/transacciones', setTransacciones);

module.exports = router;