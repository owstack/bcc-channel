'use strict';

var spec = {
  name: 'Channel',
  message: 'Internal Error on bcc-channels Module {0}',
};

module.exports = require('bcc-lib').errors.extend(spec);
