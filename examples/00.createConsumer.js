'use strict';

var channel = require('../');
var bccLib = require('bcc-lib');

var refundKey = new bccLib.PrivateKey(bccLib.Networks.testnet);
var fundingKey = new bccLib.PrivateKey(bccLib.Networks.testnet);
var commitmentKey = new bccLib.PrivateKey(bccLib.Networks.testnet);

console.log('funding key: ' + refundKey.toString());
console.log('refund key: ' + fundingKey.toString());
console.log('commitment key: ' + commitmentKey.toString());
