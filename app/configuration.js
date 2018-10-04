const $ = require('jquery');
const logger = require('logger');

function init() {
	logger.log('configuration.js: Initializing');

	GM_config.init({
		'id': 'FateConfig',
		'fields': {
			'weaponListTSV': {
				'label': 'Weapon Catalog Tab-Separated Values',
				'type': 'text',
				'default': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pub?gid=96907753&single=true&output=tsv'
			},
			'rollDataTSV': {
				'label': 'Weapon Rolls Tab-Separated Values',
				'type': 'text',
				'default': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pub?gid=1131147082&single=true&output=tsv'
			},
			'armorListTSV': {
				'label': 'Armor Catalog Tab-Separated Values',
				'type': 'text',
				'default': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pub?gid=321558889&single=true&output=tsv'
			},
			'armorRollTSV': {
				'label': 'Armor Rolls Tab-Separated Values',
				'type': 'text',
				'default': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pub?gid=1332329724&single=true&output=tsv'
			},
			'shaderDataTSV': {
				'label': 'Shader Data Tab-Separated Values',
				'type': 'text',
				'default': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pub?gid=1194152043&single=true&output=tsv'
			}
		},
		'events': {
			'save': function() {
				fateBus.subscribe(module, 'fate.refresh', init);
			}
		}
	});

	fateBus.publish(module, 'fate.configurationLoaded', {
		weaponListTSV: GM_config.get('weaponListTSV'),
		rollDataTSV: GM_config.get('rollDataTSV'),
		shaderDataTSV: GM_config.get('shaderDataTSV'),
		armorListTSV: GM_config.get('armorListTSV'),
		armorRollTSV: GM_config.get('armorRollTSV')
	});
}

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
