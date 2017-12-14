// Install the configuration interface and set default values
require('configuration.js');

// Use DIM styling overrides and our own custom styling
require('beautification.js');

// Pulls down weapon data and broadcasts updates
require('weaponDataRefresher.js');

const logger = require('logger');
const postal = require('postal');
if (process.env.NODE_ENV === 'production') {
  logger.log('main.js: Initializing');
  postal.publish({topic:'fate.init'});
}
