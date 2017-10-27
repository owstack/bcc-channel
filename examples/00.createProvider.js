'use strict';

var channel = require('../');
var bchLib = require('@owstack/bch-lib');

var providerKey = new bchLib.PrivateKey(bchLib.Networks.testnet);

console.log('provider key: ' + providerKey.toString());
