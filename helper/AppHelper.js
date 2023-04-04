const dotenv = require('dotenv');
dotenv.config();
const { promWithJsErr, Validate, fetchWithHTTPErr, Auth } = require('xendit-node/src/utils/index');
const xConfig = {
    secretKey : process.env.XENDIT_SECRET_KEY,
    xenditUrl : process.env.XENDIT_URL
}
function updateFixedVA(data) {
    return promWithJsErr((resolve, reject) => {
      Validate.rejectOnMissingFields(['id'], data, reject);
  
      let headers = {
        Authorization: Auth.basicAuthHeader(xConfig.secretKey),
        'Content-Type': 'application/json',
      };
  
      if (data && data.forUserID) {
        headers['for-user-id'] = data.forUserID;
      }
  
      fetchWithHTTPErr(
        `${xConfig.xenditUrl}/callback_virtual_accounts/${data.id}`,
        {
          method: 'PATCH',
          headers,
          body: JSON.stringify({
            external_id: data.externalID,
            suggested_amount: data.suggestedAmt,
            expected_amount: data.expectedAmt,
            expiration_date: data.expirationDate
              ? data.expirationDate.toISOString()
              : undefined,
            is_single_use: data.isSingleUse,
            description: data.description,
          }),
        },
      )
        .then(resolve)
        .catch(reject);
    });
  }

  module.exports = {    
    updateFixedVA,
  };