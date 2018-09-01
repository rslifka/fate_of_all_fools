const logger = require('logger');
const md5 = require('blueimp-md5');

exports.ItemDataRefresher = class ItemDataRefresher {

  constructor(itemType, dataTSVURL, triggerEvent) {
    this.itemType = itemType;
    this.dataTSVURL = dataTSVURL;
    this.subscriptionFunction = this.refresh.bind(this);
    const e = (triggerEvent === undefined) ? 'fate.itemDataStale' : triggerEvent;
    fateBus.subscribe(module, e, this.subscriptionFunction);
    fateBus.subscribe(module, 'fate.configurationLoaded', this.deregister.bind(this));
  }

  onLoadHandler(response) {
    logger.log('itemDataRefresher.js ('+this.itemType+'): data fetched');

    const responseText = response.responseText;
    const responseTextMD5 = md5(responseText);

    if (this.rawDataMD5 === responseTextMD5) {
      logger.log('itemDataRefresher.js ('+this.itemType+'): Checksums match, skipping refresh');
      fateBus.publish(module, 'fate.'+this.itemType+'DataUpdated');
      return;
    }

    this.rawDataMD5 = responseTextMD5;

    logger.log('itemDataRefresher.js ('+this.itemType+'): Modified data, triggering refresh');

    let itemData = responseText.substring(responseText.indexOf("\n") + 1);
    itemData = itemData.substring(itemData.indexOf("\n") + 1);

    fateBus.publish(module, 'fate.'+this.itemType+'DataFetched', itemData);
  }

  refresh() {
    GM_xmlhttpRequest({method: 'GET', url: this.dataTSVURL, onload: this.onLoadHandler.bind(this)});
  }

  deregister() {
    fateBus.unsubscribeFunctionFromAllTopics(this.subscriptionFunction);
  }
}
