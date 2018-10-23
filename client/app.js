
const ark = require("./ark-client.js");

let nethash = '2a44f340d76ffc3df204c5f38cd355b7496c9065a1ade2ef92071436bd72e867',
  passphrase = '<replace with passphrase of the wallet you send from>',
  destinationAddress = '<replace with destination address>',
  ip = '<ip of your Ark relay>',
  port = '4000',
  amount = 100000000,  
  vendorField = "sm:ins:PolicyPaymentTransaction:0123";

console.log('sending transaction...');
ark.sendTransaction(ip, port, destinationAddress, amount, vendorField, passphrase, nethash);