// Install the configuration interface and set default values
require('configuration.js');

// Use DIM styling overrides and our own custom styling
require('beautification.js');

// Stores weapons pulled from our custom database
require('weaponDatabase.js');

// Pulls down weapon data and broadcasts updates
require('weaponDataRefresher.js');

// Store original details about the weapon in 'data-fate' attributes
require('weaponDecorator.js');

// Store original details about the armor in 'data-fate' attributes
require('armorDecorator.js');

// Update weapon comments from our database
require('commentDecorator.js');

// Show higher/lower dupes
require('dupeIndicator.js');

// Retrieve and publish data for all item types
require('itemDataRefresher.js');

// Copy-to-clipboard support for the serial number
require('itemIdCopy.js');

// Support for shader
require('shader.js');
require('shaderDatabase.js');
require('shaderDecorator.js');
require('shaderDataRefresher.js');
require('shaderStatusIndicator.js');

// Qualification of individual rolls
require('rollAssessment.js');
require('rollDatabase.js');
require('rollDataRefresher.js');

require('indicators.js');

function initFate() {
  fateBus.publish(module, 'fate.itemDataStale');

  // Update the UI from the backing store every Xms. This is primarily
  // to catch new and modified items and the side effects of deleting
  const uiRefreshInterval = 10000;

  // Every Nth update, pull fresh data from the sheets
  const fullUpdateEveryNthRefresh = 6;

  let refreshCounter = uiRefreshInterval;
  setInterval(function() {
    if (refreshCounter % fullUpdateEveryNthRefresh === 0) {
      fateBus.publish(module, 'fate.itemDataStale');
    } else {
      fateBus.publish(module, 'fate.refresh');
    }
    refreshCounter += uiRefreshInterval;
  }, uiRefreshInterval);
}

/*
  The nicest change-refresh flow means loading the development version of
  the script from Tampermonkey while editing. This lets us skip kicking off
  the app when running under Karma.
*/
if (!window.navigator.userAgent.includes('HeadlessChrome')) {
  const logger = require('logger');
  const $ = require('jquery');

  logger.log('main.js: Initializing');

  // Shaders are the last update during a full refresh; so we kick off
  // UI refresh immediately afterwards.
  fateBus.subscribe(module, 'fate.shaderDataFetched', function() {
    fateBus.publish(module, 'fate.refresh');
  });

  fateBus.publish(module, 'fate.init');

  let intervalId = setInterval(function() {
    if ($('.item-img').length > 1) {
      clearInterval(intervalId);
      initFate();
    }
  }, 500);
}
