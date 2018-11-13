const web3 = require('../lib/web3-client.js');

console.log('sending transaction...');
web3.execute('SimpleStorage', 123);
