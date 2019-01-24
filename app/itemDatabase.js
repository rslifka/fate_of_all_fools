const logger = require('logger');

class ItemDatabase {

  constructor(itemType) {
    this.itemType = itemType;
    this.itemMap = new Map();
    fateBus.subscribe(module, 'fate.'+this.itemType+'DataFetched', this.refresh.bind(this));
  }

  refresh(message, newItemData) {
    this.itemMap.clear();

  	const dataLines = newItemData.split(/[\r\n]+/);
    for (let line of dataLines) {
      this.createItemFromData(line.split('\t'));
    }

    fateBus.publish(module, 'fate.'+this.itemType+'DataUpdated');

    logger.log('itemDatabase.js ('+this.itemType+'): Found ('+(dataLines.length)+') items');
  }

  createItemFromData(data) {
    // Overidden in subclasses
  }

  contains(itemName) {
  	return this.itemMap.has(itemName);
  }

  get(itemName) {
  	return this.itemMap.get(itemName);
  }
}

exports.ItemDatabase = ItemDatabase;
