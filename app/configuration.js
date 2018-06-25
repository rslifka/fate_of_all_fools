const $ = require('jquery');
const logger = require('logger');

function init() {
	logger.log('configuration.js: Initializing');

	GM_config.init({
		'id': 'FateConfig',
		'fields': {
			'weaponDataTSV': {
				'label': 'Weapon Data Tab-Separated Values',
				'type': 'text',
				'default': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pub?gid=2031623180&single=true&output=tsv'
			},
			'rollDataTSV': {
				'label': 'Roll Data Tab-Separated Values',
				'type': 'text',
				'default': 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pub?gid=1131147082&single=true&output=tsv'
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
		weaponDataTSV: GM_config.get('weaponDataTSV'),
		rollDataTSV: GM_config.get('rollDataTSV'),
		shaderDataTSV: GM_config.get('shaderDataTSV')
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
