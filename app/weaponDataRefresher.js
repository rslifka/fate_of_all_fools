const postal = require('postal');
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
  postal.publish({
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

postal.subscribe({
	topic: 'fate.weaponDataStale',
	callback: refresh
});
