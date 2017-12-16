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

// Update weapon comments from our database
require('commentDecorator.js');

/*
  The nicest change-refresh flow means loading the development version of
  the script from Tampermonkey while editing. This lets us skip kicking off
  the app when running under Karma.
*/
if (!window.navigator.userAgent.includes('HeadlessChrome')) {
  const logger = require('logger');
  const postal = require('postal');
  logger.log('main.js: Initializing');
  postal.publish({topic:'fate.init'});

  setInterval(function() {
    postal.publish({topic:'fate.refresh'});
  }, 5000);

  setInterval(function() {
    postal.publish({topic:'fate.weaponDataStale'});
  }, 30000);
}
