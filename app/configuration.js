const $ = require('jquery');
const logger = require('logger');

function broadcastConfiguration() {
  fateBus.publish(module, 'fate.configurationLoaded', {
    rollDataTSV: GM_config.get('rollDataTSV'),
    armorRollTSV: GM_config.get('armorRollTSV')
  });
}

function init() {
	logger.log('configuration.js: Initializing');

	GM_config.init({
		'id': 'FateConfig',
		'fields': {
			'rollDataTSV': {
				'label': 'Weapon Rolls Tab-Separated Values',
				'type': 'text',
				'default': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pub?gid=1131147082&single=true&output=tsv'
			},
			'armorRollTSV': {
				'label': 'Armor Rolls Tab-Separated Values',
				'type': 'text',
				'default': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pub?gid=1332329724&single=true&output=tsv'
			}
		},
		'events': {
			'save': function() {
        broadcastConfiguration();
      },
      'init': function() {
        broadcastConfiguration();
      }
		}
	});
}

// "Why don't you use GM_config's 'init' callback above to do this?"
//
// When GM_config is built, DIM hasn't finished loading, so we would have no
// DOM navigation structure to key off of.
function install() {
	if ($('.fate-config').length > 0) {
		return;
	}

	$('.header-links').prepend("<a class='link fate-config'>FATE Config</a>");
	$('.fate-config').on('click', function() {
		GM_config.open();
	});
}

fateBus.subscribe(module, 'fate.init', init);
fateBus.subscribe(module, 'fate.refresh', install);
