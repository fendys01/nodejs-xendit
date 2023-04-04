const Validator = require('validatorjs')
const Db = require("../models")
const PaymentLog = Db.payment_log
const SGJiwaREG = Db.sg_jiwa_reg
const x = require('../config/xendit.config')
const {
    Balance,
    VirtualAcc,
    RetailOutlet
} = x;
// const b = new Balance({});
// const VirtualAcc = x.VirtualAcc;
const va = new VirtualAcc({});
const ro = new RetailOutlet({});
const moment = require('moment-timezone');

exports.bank_list = (req, res, next) => {

    (async function () {
        try {
            let vaBank = await va.getVABanks();
            res.status(200).json({
                code: 200,
                status: true,
                message: 'get data success',
                result: vaBank
            })
        } catch (e) {
            console.error(e);
            return res.status(200).json({
                code: 400,
                status: false,
                message: e,
                result: []
            });
        }
    })();
}

exports.create_va = (req, res, next) => {
    (async function () {
        var expTime = moment(new Date).add(1440, 'minutes') // expired set 24 hourse 		
        // var utc = moment(setTime).format('YYYY-MM-DD HH:mm:ss')    
        var {
            order_id,
            name,
            bank_code,
            amount,
            user_id
        } = req.body;
        try {

            let setIsClosed = false
            if (amount)
                setIsClosed = true

            let paramInput = {
                externalID: order_id,
                bankCode: bank_code,
                name: name,
                expectedAmt: amount,
                expirationDate: expTime,
                isClosed: setIsClosed,
                isSingleUse: true
            }
            
            // return res.send(paramInput)
            let createVa = await va.createFixedVA(paramInput);
            console.log(createVa.id);
            await PaymentLog.create({
                order_id: order_id,
                user_id: user_id,
                amount: amount,
                status: 0, // default pending
                xid: createVa.id,
                channel: 'VA - ' + bank_code
            })

            res.status(200).json({
                code: 201,
                status: true,
                message: 'create va success',
                result: createVa
            })
        } catch (e) {
            console.error(e);
            res.status(200).json({
                code: 400,
                status: false,
                message: e,
                result: []
            })
        }
    })();
}

exports.create_fix_va = (req, res, next) => {
    (async function () {
        var expTime = moment(new Date).add(1440, 'minutes') // expired set 24 hourse 		
        // var utc = moment(setTime).format('YYYY-MM-DD HH:mm:ss')    
        var {
            order_id,
            name,
            bank_code,
            amount,
            user_id
        } = req.body;
        try {

            let setIsClosed = false
            if (amount)
                setIsClosed = true

            let paramInput = {
                externalID: order_id,
                bankCode: bank_code,
                name: name,
                expectedAmt: amount,
                expirationDate: expTime,
                isClosed: setIsClosed,
                isSingleUse: false 
            }

            let getXID = await PaymentLog.findOne({ // check va ID user 
                where: { 
                    user_id: user_id
                } 
            })

            let vaData;
            if ((!getXID) || (getXID && getXID.xid === null) || (getXID && getXID.xid === '')) { // create new VA            
                vaData = await va.createFixedVA(paramInput); 
                console.log(vaData.id);

            } else { // update va
                paramInput.id = getXID.xid
                vaData = await va.updateFixedVA(paramInput);
                console.log(vaData.id);
            }

            await PaymentLog.create({ // insert order id to log
                order_id: order_id,
                user_id: user_id,
                amount: amount,
                status: 0, // default pending
                xid: vaData.id, 
                channel: 'VA - ' + bank_code
            })

            res.status(200).json({
                code: 201,
                status: true,
                message: 'create va success',
                result: vaData
            })
        } catch (e) {
            console.error(e);
            res.status(200).json({
                code: 400,
                status: false,
                message: e,
                result: []
            })
        }
    })();
}

exports.callBack = (req, res, next) => {

    var {
        external_id,
        status
    } = req.body;
    (async function () {
        try {
            let getID = await PaymentLog.findOne({
                where: {
                    order_id: external_id
                }
            })

            if (!getID) {
                return res.status(200).json({
                    code: 404,
                    status: false,
                    message: 'order_id not found',
                    result: []
                })
            }

            if (status === 'ACTIVE')
                await PaymentLog.update({
                    status: 1,
                    log_json: JSON.stringify(req.body)
                }, {
                    where: {
                        order_id: external_id
                    }
                }) //update payment status log

            res.status(200).json({
                code: 200,
                status: true,
                message: 'callback success',
                result: []
            })
        } catch (e) {
            console.error(e);
            return res.status(200).json({
                code: 400,
                status: false,
                message: e.message,
                result: []
            });
        }
    })();
}

exports.CreateRetailCode = (req, res, next) => {
    (async function () {
        var expTime = moment(new Date).add(1440, 'minutes') //expired set 24 hourse 		
        // var utc = moment(setTime).format('YYYY-MM-DD HH:mm:ss')    
        var {
            order_id,
            name,
            retail_code,
            amount,
            user_id
        } = req.body;
        try {

            let setIsClosed = false
            if (amount)
                setIsClosed = true

            let paramInput = {
                externalID: order_id,
                retailOutletName: retail_code,
                name: name,
                expectedAmt: amount,
                expirationDate: expTime,
                isSingleUse: true
            }
            // return res.send(paramInput)            
            let pmCode = await ro.createFixedPaymentCode(paramInput);

            await PaymentLog.create({
                order_id: order_id,
                user_id: user_id,
                amount: amount,
                status: 1, //ro default active
                xid: pmCode.id,
                channel: 'RO - ' + retail_code
            })

            res.status(200).json({
                code: 201,
                status: true,
                message: 'create payment code success',
                result: pmCode
            })
        } catch (e) {
            console.error(e);
            res.status(200).json({
                code: 400,
                status: false,
                message: e,
                result: []
            })
        }
    })();
}

exports.callBackPayment = (req, res, next) => {

    var {
        external_id,
        status,
        payment_id
    } = req.body;
    (async function () {
        try {

            let getID = await PaymentLog.findOne({
                where: {
                    order_id: external_id
                }
            })
            if (getID) {
                let polis = Math.floor(100000000000 + Math.random() * 900000000000)
                await PaymentLog.update({
                    status: 2, // paid
                    log_json: JSON.stringify(req.body),
                    xpayment_id: payment_id,
                    polis: polis
                }, {
                    where: {
                        order_id: external_id
                    }
                }) // update payment status log

                await SGJiwaREG.update({
                    state: "done",
                    polis: polis
                }, {
                    where: {
                        order_id: external_id
                    }
                }) // update to table sg_jiwa_reg
            }
            res.status(200).json({
                code: 200,
                status: true,
                message: 'callback success',
                result: []
            })
        } catch (e) {
            console.error(e);
            return res.status(200).json({
                code: 400,
                status: false,
                message: e.message,
                result: []
            });
        } finally {
            await client.end(); // closes connection
        }
    })();
}