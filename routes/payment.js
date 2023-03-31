var express = require('express');
var router = express.Router();
// var multer  = require('multer');
// var upload = multer();
// var auth_mcm = require('../middlewares/auth_mcm')

const PaymnetController = require('../controllers/payment.controller');

// route for company
router.get('/va/bank_list', PaymnetController.bank_list);
router.post('/va/create_va', PaymnetController.create_va);
router.post('/va/notification_update', PaymnetController.callBack);
router.post('/va/notification_payment', PaymnetController.callBackPayment);

router.get('/retail/bank_list', PaymnetController.bank_list);
router.post('/retail/create_va', PaymnetController.create_va);
router.post('/retail/notification_update', PaymnetController.callBack);
router.post('/retail/notification_payment', PaymnetController.callBackPayment);

module.exports = router;