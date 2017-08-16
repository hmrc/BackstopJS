var createBitmaps = require('../util/createBitmaps');
var fs = require('../util/fs');
var logger = require('../util/logger')('clean');

module.exports = {
  execute: function (config, quietLogging) {
    var firstStep;

    // do not remove reference directory if we are in incremental mode
    if (config.args.filter || config.args.i) {
      firstStep = Promise.resolve();
    } else {
      firstStep = fs.remove(config.bitmaps_reference).then(function () {

        if (!quietLogging) {
          logger.success(config.bitmaps_reference + ' was cleaned.');
        }
      });
    }

    return firstStep.then(function () {
      return createBitmaps(config, true, quietLogging);
    }).then(function () {
      if (!quietLogging) {
        console.log('\nRun `$ backstop test` to generate diff report.\n');
      }
    });
  }
};
