const $ = require('jquery');
const logger = require('logger');
const postal = require('postal');

postal.subscribe({
	topic: 'fate.init',
	callback: function() {
    logger.log('configuration.js (fate.init): Initializing');

    GM_config.init({
      'id': 'FoafConfig',
      'fields': {
        'weaponDataTSV': {
          'label': 'Weapon Data Tab-Separated Values',
          'type': 'text',
          'default': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pub?gid=2031623180&single=true&output=tsv'
        }
      },
      'events': {
        'save': function() {
          // TODO - Emit an event?
          // rankingsDownloaded();
        }
      }
    });

    $('body').append($("<div>", {"class": "foaf-config"}).text('[FOAF Config]'));

    $('.foaf-config').on('click', function() {
      GM_config.open();
    });
  }
});
