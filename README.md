Bcccore Channel
=======

[![NPM Package](https://img.shields.io/npm/v/bcccore-channel.svg?style=flat-square)](https://www.npmjs.org/package/bcccore-channel)
[![Build Status](https://img.shields.io/travis/owstack/bcccore-channel.svg?branch=master&style=flat-square)](https://travis-ci.org/owstack/bcccore-channel)
[![Coverage Status](https://img.shields.io/coveralls/owstack/bcccore-channel.svg?style=flat-square)](https://coveralls.io/r/owstack/bcccore-channel)

Payment Channels for Bcccore.  A module for [bcccore][bcccore] that implements [Payment Channels][channel]. Payment channels (sometimes referred as micropayment channels) are a type of smart contracts that allow rapidly adjusting bitcoin transactions. This can be used to do trustless simultaneous payments with a service provider without the need of an intermediary, and some other applications.

See [the main bcccore repo][bcccore] or the [bcccore guide on Payment Channels](http://bcccore.io/guide/module/channel/index.html) for more information.

## Attribution

This repository was created by copy forking [bitcore-channels commit eef80d0](https://github.com/bitpay/bitcore-channel/commit/eef80d08bebce1daa7e3bc40cc4c625db6db0ec8).

## Contributing

See [CONTRIBUTING.md](https://github.com/owstack/bcccore/blob/master/CONTRIBUTING.md) on the main bcccore repo for information about how to contribute.

## License

Code released under [the MIT license](https://github.com/owstack/bcccore/blob/master/LICENSE).

Copyright 20137 Open Wallet Stack. Bcccore is a trademark maintained by Open Wallet Stack.

[bcccore]: https://github.com/owstack/bcccore
[channel]: https://bitcoin.org/en/developer-guide#micropayment-channel
