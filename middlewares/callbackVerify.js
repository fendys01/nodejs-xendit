
require('dotenv').config({path: './.env'});
module.exports = async function (req, res, next) {
    
    const auth = req.headers['x-callback-token']        
    const cbToken = process.env.CALLBACK_TOKEN
                            
    if(auth === cbToken) {                    
        next();
    } else {
        return res.status(200).json({
            code: 401,
            status: 'error',
            message: 'invalid verify token',
            result: []
        });
    }                    
}