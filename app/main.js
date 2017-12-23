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

// Store original details about the weapon in 'data-fate' attributes
require('weaponDecorator.js');

// Update weapon comments from our database
require('commentDecorator.js');

// Rejigger how weapons with legendary mods are displayed
require('modIndicator.js');

// Show higher/lower dupes
require('dupeIndicator.js');

// In what way is this weapon not useful?
require('ignoreStatusIndicator.js');

// Can this weapon be infused in to another for level?
require('infusionIndicator.js');

// Which weapons are our favourites?
require('favouriteIndicator.js');

// Which weapons work in the raid
require('raidIndicator.js');

// Which weapons are good for PvP?
require('pvpIndicator.js');

// Which weapons are good for PvE?
require('pveIndicator.js');

/*
  The nicest change-refresh flow means loading the development version of
  the script from Tampermonkey while editing. This lets us skip kicking off
  the app when running under Karma.
*/
if (!window.navigator.userAgent.includes('HeadlessChrome')) {
  const logger = require('logger');
  logger.log('main.js: Initializing');
  fateBus.publish(module, 'fate.init');

  setInterval(function() {
    fateBus.publish(module, 'fate.refresh');
  }, 5000);

  setInterval(function() {
    fateBus.publish(module, 'fate.weaponDataStale');
  }, 30000);
}
