const { Router } = require('express');
const router = Router();

const { verData, setData, setData2 } = require('../controllers/indexController');



router.post('/decrypt', verData );
router.post('/ncrypt', setData);
router.post('/ncrypt2', setData2);


module.exports = router;