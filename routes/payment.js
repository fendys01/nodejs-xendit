var express = require('express');
var router = express.Router();
// var multer  = require('multer');
// var upload = multer();
var auth = require('../middlewares/auth')
var callbackVerify = require('../middlewares/callbackVerify')

const PaymnetController = require('../controllers/payment.controller');

// route for company
router.get('/va/bank_list',auth, PaymnetController.bank_list);
router.post('/va/create_va', auth,PaymnetController.create_va);
// router.post('/va/notification_update', PaymnetController.callBack);
router.post('/va/notification_payment',auth, PaymnetController.callBackPayment);
router.post('/retail/create_payment_code', auth,PaymnetController.CreateRetailCode);
router.post('/notification',callbackVerify,PaymnetController.callBackPayment);

module.exports = router;