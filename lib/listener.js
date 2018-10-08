/*
  This listener listens for transaction.applied events which have the following 
  Vendor Field format: 
  
  <sm>:<namespace>:<endpoint>:<param1>:<param2>:<paramN>

  , where
  sm - "sm" is a resrved prefix for smart contracts to avoid collisions with other usages of Vendor Field
  namespace - namespace for a group of smart contracts. Such group may represent a particular dapp on the blockchain
  endpoint-name - name of the endpointto execute

  Max Length: 127 char

  Example: sm:ins:PolicyPaymentTransaction:2345
*/

'use strict'
const container = require('@arkecosystem/core-container')
const emitter = container.resolvePlugin('event-emitter')
const logger = container.resolvePlugin('logger')
const hyperledger = require("./hyperledger-client.js")

class Listener {
  setUp (options) {    
    emitter.on('transaction.applied', data => {
      if (!data || !data.vendorField || !data.vendorField.startsWith('sm:'))
        return;
      
      logger.info('Hyperledger plugin >> transaction.applied. data: ' + JSON.stringify(data, null, 5));

      hyperledger.execute(data);
    })
      
    /*
    emitter.on('block.applied', data => {
      logger.info('Hyperledger plugin. event block.applied.');
    })*/

  }
}
module.exports = new Listener()