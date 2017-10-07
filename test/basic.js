'use strict';

var should = require('chai').should();
var bchLib = require('@owstack/bch-lib');
var Networks = bchLib.Networks;
var PrivateKey = bchLib.PrivateKey;

describe('Simple Payment Channel usage', function() {

  describe('a simple consumer', function() {

    it('correctly gets created', function() {
      var consumer = getConsumer().consumer;
      should.exist(consumer.fundingKey.toString());
      // No assertions...? Just checking that no compile errors occur
    });

    it('Commitment toObject', function() {
      var consumer = getFundedConsumer().consumer;
      var obj = consumer.commitmentTx.toObject();
      var expected = {
        'transaction': {
          'hash': '879be5174883e42c67f24493cf59b18e27f485d069db54cfa4a3dec7a3268227',
          'version': 1,
          'inputs': [{
            'prevTxId': '787ef38932601aa6d22b844770121f713b0afb6c13fdd52e512c6165508f47cd',
            'outputIndex': 1,
            'sequenceNumber': 4294967295,
            'script': '483045022100be3701052d90d4b16f187bec51cdeead95b5c791419a02f42403fbfc63e5a25a022044e3e6ff5c277e076a3f703fd38480fdbf1fd53b094c7e87b572f172826a4382412103bca86b6a422d1ffec9fd0a1e8d37feaef4e41f76bbdde68852251b7ae8ca6fab',
            'scriptString': '72 0x3045022100be3701052d90d4b16f187bec51cdeead95b5c791419a02f42403fbfc63e5a25a022044e3e6ff5c277e076a3f703fd38480fdbf1fd53b094c7e87b572f172826a438241 33 0x03bca86b6a422d1ffec9fd0a1e8d37feaef4e41f76bbdde68852251b7ae8ca6fab',
            'output': {
              'satoshis': 50000000,
              'script': '76a91469b678f36c91bf635ff6e9479edd3253a5dfd41a88ac'
            }
          }, {
            'prevTxId': 'c1003b5e2c9f5eca65bde73463035e5dffcfbd3c234e55e069cfeebb513293e4',
            'outputIndex': 0,
            'sequenceNumber': 4294967295,
            'script': '473044022000d7705db0bc5633ded47d1a2b50609ac1225fd34a6ad8edeae477defed822a102202c22c6a5d9b1bacdc4b5e561344ad89c864f0185486e16738b46608f53ca40c5412103bca86b6a422d1ffec9fd0a1e8d37feaef4e41f76bbdde68852251b7ae8ca6fab',
            'scriptString': '71 0x3044022000d7705db0bc5633ded47d1a2b50609ac1225fd34a6ad8edeae477defed822a102202c22c6a5d9b1bacdc4b5e561344ad89c864f0185486e16738b46608f53ca40c541 33 0x03bca86b6a422d1ffec9fd0a1e8d37feaef4e41f76bbdde68852251b7ae8ca6fab',
            'output': {
              'satoshis': 10000000,
              'script': '76a91469b678f36c91bf635ff6e9479edd3253a5dfd41a88ac'
            }
          }],
          'outputs': [{
            'satoshis': 59900000,
            'script': 'a914fdeaa734587dfed0090c98fbf1bf8730009ddda887'
          }],
          'nLockTime': 0,
          'changeScript': 'OP_HASH160 20 0xfdeaa734587dfed0090c98fbf1bf8730009ddda8 OP_EQUAL',
          'changeIndex': 0
        },
        'publicKeys': ['027f10e67bea70f847b3ab92c18776c6a97a78f84def158afc31fd98513d42912e', '023bc028f67697712efeb0216ef1bc7208e2c9156bf0731204d79328f4c8ef643a'],
        'network': 'testnet'
      };
      obj.should.deep.equal(expected);
    });

    it('processes an output', function() {
      var consumer = getFundedConsumer().consumer;
      consumer.commitmentTx.amount.should.equal(60000000);
    });

    it('validates a refund correctly', function() {
      var consumer = getValidatedConsumer().consumer;
      consumer.refundTx.isFullySigned().should.equal(true);
    });

    it('has no false positive on refund validation', function() {
      var consumer = getFundedConsumer().consumer;
      consumer.setupRefund();

      var failed = false;
      try {
        consumer.validateRefund({
          refund: consumer.refundTx.toObject(),
          paymentAddress: 'mgeLZRkELTysge5dvpo2ixGNgG2biWwRXC'
        });
      } catch (e) {
        failed = true;
      } finally {
        failed.should.equal(true);
      }
    });

    it('can increment a payment', function() {
      var consumer = getValidatedConsumer().consumer;
      consumer.incrementPaymentBy(1000);
      consumer.paymentTx.paid.should.equal(1000);
      consumer.incrementPaymentBy(1000);
      consumer.paymentTx.paid.should.equal(2000);
    });
  });

  describe('a simple provider', function() {

    it('gets created correctly', function() {
      // TODO: no assertions?
      return getProvider();
    });

    it('signs a refund', function() {
      var consumer = getValidatedConsumer().consumer;
      consumer.refundTx.isFullySigned().should.equal(true);
    });

    it('validates a payment', function() {
      var provider = getProvider();
      var consumer = getValidatedConsumer().consumer;
      provider.validPayment(consumer.incrementPaymentBy(1000));
      provider.currentAmount.should.equal(1000);
      provider.validPayment(consumer.incrementPaymentBy(1000));
      provider.validPayment(consumer.incrementPaymentBy(1000));
      provider.validPayment(consumer.incrementPaymentBy(1000));
      provider.currentAmount.should.equal(4000);
    });

    it('calculates fees normally', function() {
      var provider = getProvider();
      var consumer = getValidatedConsumer().consumer;
      provider.validPayment(consumer.incrementPaymentBy(1000));
      provider.currentAmount.should.equal(1000);
      provider.paymentTx.getFee().should.equal(100000);
      provider.validPayment(consumer.incrementPaymentBy(1000));
      provider.validPayment(consumer.incrementPaymentBy(1000));
      provider.validPayment(consumer.incrementPaymentBy(1000));
      provider.currentAmount.should.equal(4000);
      provider.paymentTx.getFee().should.equal(100000);
    });
  });
});

var providerKey = new PrivateKey('58e78db594be551a8f4c7070fd8695363992bd1eb37d01cd4a4da608f3dc5c2d', Networks.testnet);
var fundingKey = new PrivateKey('79b0630419ad72397d211db4988c98ffcb5955b14f6ec5c5651eec5c98d7e557', Networks.testnet);
var commitmentKey = new PrivateKey('17bc93ac93f4a26599d3af49e59206e8276259febba503434eacb871f9bbad75', Networks.testnet);
var providerAddress = providerKey.toAddress(Networks.testnet);
var fundingAddress = fundingKey.toAddress(Networks.testnet);

var getConsumer = function() {

  var Consumer = require('../').Consumer;
  var refundAddress = 'mzCXqcsLBerwyoRZzBFQELHaJ1ZtBSxxe6';

  var consumer = new Consumer({
    network: 'testnet',
    fundingKey: fundingKey,
    commitmentKey: commitmentKey,
    providerPublicKey: providerKey.publicKey,
    providerAddress: providerKey.toAddress(),
    refundAddress: refundAddress
  });

  return {
    consumer: consumer,
    serverPublicKey: providerKey.publicKey,
    refundAddress: refundAddress
  };
};

var getFundedConsumer = function() {
  var result = getConsumer();
  result.consumer.processFunding([{
    'address': fundingAddress,
    'txid': '787ef38932601aa6d22b844770121f713b0afb6c13fdd52e512c6165508f47cd',
    'vout': 1,
    'ts': 1416205164,
    'scriptPubKey': '76a91469b678f36c91bf635ff6e9479edd3253a5dfd41a88ac',
    'amount': 0.5,
    'confirmationsFromCache': false
  }, {
    'address': fundingAddress,
    'txid': 'c1003b5e2c9f5eca65bde73463035e5dffcfbd3c234e55e069cfeebb513293e4',
    'vout': 0,
    'ts': 1416196853,
    'scriptPubKey': '76a91469b678f36c91bf635ff6e9479edd3253a5dfd41a88ac',
    'amount': 0.1,
    'confirmations': 18,
    'confirmationsFromCache': false
  }]);
  result.consumer.commitmentTx.sign(fundingKey);
  return result;
};

var getValidatedConsumer = function() {
  var funded = getFundedConsumer().consumer;
  funded.setupRefund();
  funded.refundTx.sign(providerKey);
  var refund = funded.refundTx.toObject();
  funded.validateRefund(refund);
  return {
    consumer: funded
  };
};

var getProvider = function() {
  var Provider = require('../').Provider;
  return new Provider({
    key: providerKey,
    paymentAddress: providerAddress,
    network: 'testnet'
  });
};
