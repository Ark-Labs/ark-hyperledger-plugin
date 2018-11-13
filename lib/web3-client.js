const container = require('@arkecosystem/core-container')
const logger = container.resolvePlugin('logger')
Web3 = require('web3')
web3 = new Web3(new Web3.providers.HttpProvider('http://159.89.146.143:5000'))
web3.eth.defaultAccount = web3.eth.accounts[0]

let simpleStorageABI = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "x",
        "type": "uint256"
      }
    ],
    "name": "set",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "get",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]

let SimpleStorage = web3.eth.contract(simpleStorageABI)
let storageContract = SimpleStorage.at('7ec1f20fced5ed8d47f94cdab140644a28a85441')

module.exports = {  
  
    set: function(contract, data) {
      if (contract == 'SimpleStorage') {
        storageContract.set(data)
        logger.info("Hyperledger plugin >> Executed SimpleStorage set with " + data);
      }
    }
};