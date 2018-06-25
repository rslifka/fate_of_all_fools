// Install the configuration interface and set default values
require('configuration.js');

// Use DIM styling overrides and our own custom styling
require('beautification.js');

// Stores weapons pulled from our custom database
require('weaponDatabase.js');

// Pulls down weapon data and broadcasts updates
require('weaponDataRefresher.js');

// Removes DIM's native tagging elements
require('dimEraser.js');

// Store original details about the weapon in 'data-fate' attributes
require('weaponDecorator.js');

// Store original details about the armor in 'data-fate' attributes
require('armorDecorator.js');

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

// Is this weapon infusion fodder for other weapons?
require('fodderIndicator.js');

// Which weapons are good for PvP?
require('pvpIndicator.js');

// Which weapons are good for PvE?
require('pveIndicator.js');

// Retrieve and publish data for all item types
require('itemDataRefresher.js');

// Support for shader
require('shader.js');
require('shaderDatabase.js');
require('shaderDecorator.js');
require('shaderDataRefresher.js');

// Qualification of individual rolls
require('rollAssessment.js');
require('rollDatabase.js');
require('rollDataRefresher.js');

/*
  The nicest change-refresh flow means loading the development version of
  the script from Tampermonkey while editing. This lets us skip kicking off
  the app when running under Karma.
*/
if (!window.navigator.userAgent.includes('HeadlessChrome')) {
  const logger = require('logger');
  logger.log('main.js: Initializing');
  fateBus.publish(module, 'fate.init');
  fateBus.publish(module, 'fate.itemDataStale');
  fateBus.publish(module, 'fate.refresh');

  setInterval(function() {
    fateBus.publish(module, 'fate.refresh');
  }, 10000);

  setInterval(function() {
    fateBus.publish(module, 'fate.itemDataStale');
  }, 60000);
}
