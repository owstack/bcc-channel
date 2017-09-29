'use strict';

var spec = {
  name: 'Channel',
  message: 'Internal Error on bch-channels Module {0}',
};

module.exports = require('bch-lib').errors.extend(spec);
