const logger = require('logger');
const md5 = require('blueimp-md5');

let rawWeaponDataMD5;
let weaponDataTSVURL;

function storeConfiguration(topic, configuration) {
  weaponDataTSVURL = configuration.weaponDataTSV;
}

function onLoadHandler(response) {
  logger.log('weaponDataRefresher.js: Weapon data fetched');

  const responseText = response.responseText;

  if (rawWeaponDataMD5 === md5(responseText)) {
    logger.log('weaponDataRefresher.js: Checksums match, skipping refresh');
    return;
  }

  rawWeaponDataMD5 = md5(responseText);

  logger.log('weaponDataRefresher.js: Modified data, triggering refresh');
  fateBus.publish(module, 'fate.weaponDataFetched', responseText.substring(responseText.indexOf("\n") + 1));
}

function refresh() {
  GM_xmlhttpRequest({
    method: 'GET',
    url: weaponDataTSVURL,
    onload: onLoadHandler
  });
}

fateBus.subscribe(module, 'fate.configurationLoaded', storeConfiguration);
fateBus.subscribe(module, 'fate.weaponDataStale', refresh);
fateBus.subscribe(module, 'fate.init', refresh);
