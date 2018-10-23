'use strict'

// Ark V2 API
const ark = require('@arkecosystem/crypto')
const transactionBuilder = ark.transactionBuilder
const request = require('request');

//required to connect to the specific test net
//ark.crypto.setNetworkVersion('0x32');

module.exports = {

  createTransaction: function(recepient, amount, vendorField, passphrase, secondPassphrase, fee) {
    // Ark V2 style
    let transaction = transactionBuilder
      .transfer()
      .amount(amount)
      .recipientId(recepient)
      .vendorField(vendorField)
      .fee(fee)
      .sign(passphrase)

    if (secondPassphrase !== null) {
      transaction = transaction.secondSign(secondPassphrase)
    }

    transaction = transaction.getStruct()
    return transaction
  },

  sendTransaction: function(ip, port, recepient, amount, vendorField, passphrase, secondPassphrase) {
    let transaction = this.createTransaction(recepient, amount, vendorField, passphrase, secondPassphrase, 1000000);

    request({
        url: 'http://' + ip + ':' + port + '/peer/transactions',
        json: {
          transactions: [transaction]
        },
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "os": "linux3.2.0-4-amd64",
          "version": "0.3.0",
          "port": port
        },
      }, function(error, response, body) {
          let msg;
          if (error && error.message)
            msg = error.message;
          else if (body && body.error)
            msg = body.message;

          if (response && response.statusCode) 
            msg += "; Status Code: " + response.statusCode;

          console.info("Hyperledger plugin >> Failed to submit transaction to Hyperledger. Error: "
            + msg);
    });
  }
};
