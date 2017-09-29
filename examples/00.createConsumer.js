'use strict';

var channel = require('../');
var bchLib = require('bch-lib');

var refundKey = new bchLib.PrivateKey(bchLib.Networks.testnet);
var fundingKey = new bchLib.PrivateKey(bchLib.Networks.testnet);
var commitmentKey = new bchLib.PrivateKey(bchLib.Networks.testnet);

console.log('funding key: ' + refundKey.toString());
console.log('refund key: ' + fundingKey.toString());
console.log('commitment key: ' + commitmentKey.toString());
