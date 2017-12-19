const logger = require('logger');
const md5 = require('md5');

let rawWeaponDataMD5;

function onLoadHandler(response) {
  logger.log('weaponDataRefresher.js: Weapon data fetched');

  const responseText = response.responseText;

  if (rawWeaponDataMD5 === md5(responseText)) {
    logger.log('weaponDataRefresher.js: Checksums match, skipping refresh');
    return;
  }

  rawWeaponDataMD5 = md5(responseText);

  logger.log('weaponDataRefresher.js: Modified data, triggering refresh');
  fateBus.publish(module, {
    topic: 'fate.weaponDataFetched',
    data: responseText.substring(responseText.indexOf("\n") + 1)
  });
}

function refresh() {
  GM_xmlhttpRequest({
    method: 'GET',
    url: GM_config.get('weaponDataTSV'),
    onload: onLoadHandler
  });
}

fateBus.subscribe(module, {
	topic: 'fate.weaponDataStale',
	callback: refresh
});

fateBus.subscribe(module, {
	topic: 'fate.init',
	callback: refresh
});
