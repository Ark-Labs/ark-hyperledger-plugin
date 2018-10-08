/*

 Sample output:
  Smart contract containing event: transaction.forged. data: {
      "version": 1,
      "network": 23,
      "type": 0,
      "timestamp": 48848297,
      "senderPublicKey": "030db38e79e121309b7e8b611b9a30094dbb586baa4bc6cd10b80b5ee59e5c4abf",
      "fee": 10000000,
      "vendorFieldHex": "736d3a7177657271776572",
      "amount": 100000000,
      "expiration": 0,
      "recipientId": "AHe4ofqsiFH6vxw7msmxpFnkx7gbcUuipc",
      "signature": "3045022100bccd31ff8b8fca39b69f99d1c8dda299860448539f69171900e5c3cc7a0535e302205c1a13e80befaf67db46ad8b46b18686e0defc4571b720ab7f4b978b35eca236",
      "vendorField": "sm:ins:PolicyPaymentTransaction:2345",
      "id": "98ea11da8d5212d6c1c9aedf63f9c9e8bc5c7841a609b7ecfa7744d5c04265ab"
  }

*/

const request = require('request')
const container = require('@arkecosystem/core-container')
const logger = container.resolvePlugin('logger')

module.exports = {
    execute: function(data) {
      // sm:ins:PolicyPaymentTransaction:2345
      let params = data.vendorField.split(':');

      let endpoint = params[2];
      let assetId = params[3];
      let body = {
        "$class": "io.arklabs." + endpoint,
        "policy": "resource:io.arklabs.PolicyAsset#" + assetId,
        "amountPaid": data.amount,
        "arkTransaction": JSON.stringify(data, null, 5)
      };

      request({
        url: "http://159.89.146.143:3000/api/" + endpoint,
        json: body,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
      }, function(error, response, body) {
  
        if(body.success){
          logger.info("Hyperledger plugin >> Submitted transaction to Hyperledger");
        }
      });

    }
};