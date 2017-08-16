var open = require('open');
var logger = require('../util/logger')('openReport');
var path = require('path');

module.exports = {
  execute: function (config, quietLogging) {
    function toAbsolute (p) {
      if (path.isAbsolute(p)) {
        return p;
      }
      return path.join(config.projectPath, p);
    }

    return new Promise(function (resolve, reject) {
      if (!quietLogging) {
        logger.log('Opening report.');
      }
      open(toAbsolute(config.compareReportURL), function (err) {
        if (err) {
          logger.error('An error occured while opening report in the default browser.');
        }
        resolve();
      });
    });
  }
};
