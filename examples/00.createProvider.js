var channel = require('../');
var bcccore = require('bcccore-lib');


var providerKey = new bcccore.PrivateKey(bcccore.Networks.testnet);

console.log('provider key: ' + providerKey.toString());
