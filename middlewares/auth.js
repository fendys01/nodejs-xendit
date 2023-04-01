
require('dotenv').config({path: './.env'});
module.exports = async function (req, res, next) {

    try {
        const auth = req.headers['authorization']
        const authKey = process.env.AUTHKEY
        console.log({
            auth,authKey
        });            
        if (auth) {            
            if(auth === authKey) {                    
                next();
            } else {
                return res.status(200).json({
                    code: 401,
                    status: 'error',
                    message: 'invalid authorization key',
                    result: []
                });
            }
            
        } else {
            return res.status(200).json({
                code: 401,
                status: false,
                message: 'authorization key required',
                result: []
            });
        }
    } catch(err) {
        return res.status(200).json({
            code: 401,
            status: false,
            message: err.message,
            result: []
        });
    }
}