'use strict';

var inherits = require('inherits');

var Transaction = require('bcccore-lib').Transaction;

/**
 * @constructor
 */
function Refund() {
  Transaction.apply(this, arguments);
}
inherits(Refund, Transaction);

module.exports = Refund;
