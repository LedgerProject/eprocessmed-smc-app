const { Router } = require('express');
const router = Router();

const { setData } = require('../controllers/indexController');

router.post('/ipfs', setData);


module.exports = router;