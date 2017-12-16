// Install the configuration interface and set default values
require('configuration.js');

// Use DIM styling overrides and our own custom styling
require('beautification.js');

// Stores weapons pulled from our custom database
require('weaponDatabase.js');

// Pulls down weapon data and broadcasts updates
require('weaponDataRefresher.js');

// Removes DIM's native tagging elements
require('dimTagRemover.js');

const logger = require('logger');
const postal = require('postal');
if (process.env.NODE_ENV === 'production') {
  logger.log('main.js: Initializing');
  postal.publish({topic:'fate.init'});
}
