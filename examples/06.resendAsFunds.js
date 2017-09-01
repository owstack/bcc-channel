'use strict';

var bcccore = require('bcccore-lib');
var PrivateKey = bcccore.PrivateKey;

var fundingKey = new PrivateKey('cb5dc68fbcaf37f29139b50fa4664b395c03e49deb966e5d49a629af005d0654');
var refundKey = new PrivateKey('b65080da83f59a9bfa03841bc82fd0c0d1e036176b2f2c157eaa9547010a042e');

var explorer = new bcccore.transport.explorers.Explorer();

explorer.getUnspentUtxos(refundKey.toAddress(), function(err, utxo) {
  var tx = new bcccore.Transaction()
    .from(utxo)
    .change(fundingKey.toAddress())
    .sign(refundKey)
    .serialize();
  explorer.broadcast(tx, console.log);
});
