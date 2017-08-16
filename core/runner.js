var executeCommand = require('./command/');
var makeConfig = require('./util/makeConfig');

module.exports = function (command, options, quiet) {
  var config = makeConfig(command, options, quiet);
  return executeCommand(command, config, quiet);
};
