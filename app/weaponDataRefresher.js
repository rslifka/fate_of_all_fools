const i = require('itemDataRefresher.js');

fateBus.subscribe(module, 'fate.configurationLoaded', function(topic, configuration) {
  new i.ItemDataRefresher('weapon', configuration.weaponListTSV)
});
