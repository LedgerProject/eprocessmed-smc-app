const { Router } = require('express');
const router = Router();

const {  notificacion} = require('../controllers/indexController');



router.post('/notificacion', notificacion);



module.exports = router;