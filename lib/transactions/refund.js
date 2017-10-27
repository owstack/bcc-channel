'use strict';

var inherits = require('inherits');

var Transaction = require('@owstack/bch-lib').Transaction;

/**
 * @constructor
 */
function Refund() {
  Transaction.apply(this, arguments);
}
inherits(Refund, Transaction);

module.exports = Refund;
