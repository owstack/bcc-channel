var channel = require('../');
var bcccore = require('bcccore-lib');


var refundKey = new bcccore.PrivateKey(bcccore.Networks.testnet);
var fundingKey = new bcccore.PrivateKey(bcccore.Networks.testnet);
var commitmentKey = new bcccore.PrivateKey(bcccore.Networks.testnet);

console.log('funding key: ' + refundKey.toString());
console.log('refund key: ' + fundingKey.toString());
console.log('commitment key: ' + commitmentKey.toString());
