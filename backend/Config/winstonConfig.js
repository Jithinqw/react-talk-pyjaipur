/**
 * @fileoverview Winston configuration and error handlers
 */
var appRoot = require("app-root-path");
var winston = require("winston");

var options = {
    file: {
      level: "info",
      filename: `${appRoot}/logs/sicarii.log`,
      handleExceptions: true,
      json: true,
      maxsize: 52428800, // 50MB
      maxFiles: 5,
      colorize: false,
    },
    console: {
      level: "debug",
      handleExceptions: true,
      json: false,
      colorize: true,
    },
};

var logger = new winston.createLogger({
    transports: [
      new winston.transports.File(options.file),
      new winston.transports.Console(options.console)
    ],
    exitOnError: false, 
  });
  
  logger.stream = {
    write: function(message, encoding) {
        //Comment this line if you don"t want winston to log into your console.
      logger.info(message);
    },
};
  
module.exports = logger;