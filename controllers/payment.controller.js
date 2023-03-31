const Validator = require('validatorjs')
const Db = require("../models")
const PaymentLog = Db.payment_log
const x = require('../config/xendit.config')
const { Balance } = x;
const b = new Balance({});
const VirtualAcc = x.VirtualAcc;
const va = new VirtualAcc({});
const moment = require('moment-timezone')

exports.bank_list = (req, res, next) => {
        
    (async function() {
        try {            
            let data = await PaymentLog.findOne({where:{order_id:123}})
            res.send(data)
            // let vaBank = await va.getVABanks();
            // res.status(200).json({
            //     code:200,
            //     status:true,
            //     message:'get data success',
            //     result:vaBank
            // })
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
    (async function() {
        var expTime = moment(new Date).add(1440, 'minutes') //expired set 24 hourse 		
        // var utc = moment(setTime).format('YYYY-MM-DD HH:mm:ss')    
        var { order_id, name, bank_code, amount,user_id } = req.body; 
        try {                                   
                        
            let setIsClosed = false 
            if (amount) 
                setIsClosed = true
                
            let paramInput = {
                externalID: order_id,
                bankCode: bank_code,
                name: name,
                expectedAmt:amount,
                expirationDate:expTime,
                isClosed:setIsClosed,
                isSingleUse:true
            }
            // return res.send(paramInput)
            let createVa = await va.createFixedVA(paramInput);   
            console.log(createVa.id);
            await PaymentLog.create({
                order_id:order_id,
                user_id:user_id,
                amount:amount,
                status:0,//default pending
                xid:createVa.id
            })                        

            res.status(200).json({
                code:201,
                status:true,
                message:'create va success',
                result:createVa
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
    
    var { external_id, status } = req.body; 
    (async function() {
        try {            
            // return res.send({
            //     external_id,status
            // })
            let getID = await PaymentLog.findOne({where:{order_id:external_id}})
            
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
                    status:1,
                    log_json:JSON.stringify(req.body)
                },{where:{order_id:external_id}}) //update payment status log
            
            res.status(200).json({
                code:200,
                status:true,
                message:'callback success',
                result:[]
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

exports.callBackPayment = (req, res, next) => {
    
    var { external_id, status } = req.body; 
    (async function() {
        try {            
            // return res.send({
            //     external_id,status
            // })
            let getID = await PaymentLog.findOne({where:{order_id:external_id}})
            
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
                    status:1,
                    log_json:JSON.stringify(req.body)
                },{where:{order_id:external_id}}) //update payment status log
            
            res.status(200).json({
                code:200,
                status:true,
                message:'callback success',
                result:[]
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