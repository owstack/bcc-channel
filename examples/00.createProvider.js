'use strict';

var channel = require('../');
var bccLib = require('bcc-lib');

var providerKey = new bccLib.PrivateKey(bccLib.Networks.testnet);

console.log('provider key: ' + providerKey.toString());
