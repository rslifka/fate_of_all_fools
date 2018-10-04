const logger = require('logger');
const i = require('itemDatabase.js');
const armor = require('armor.js');

class ArmorDB extends i.ItemDatabase {
	constructor() {
		super('armor');
	}
	createItemFromData(data) {
		// Name Rarity Slot Assessment Comments
		this.itemMap.set(data[0], new armor.Armor(data[0], data[1], data[2], data[3], data[4]));
	}
}

exports.armorDB = new ArmorDB();
