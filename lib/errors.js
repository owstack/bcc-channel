'use strict';

var spec = {
  name: 'Channel',
  message: 'Internal Error on bcccore-channels Module {0}',
};

module.exports = require('bcccore-lib').errors.extend(spec);
