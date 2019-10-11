const logger = require('logger');
const i = require('itemDatabase.js');
const armorRoll = require('armorRoll.js');

class ArmorRollDB extends i.ItemDatabase {
	constructor() {
		super('armorRoll');
	}
	createItemFromData(data) {
		this.itemMap.set(data[0], new armorRoll.ArmorRoll(...data));
	}
}

exports.armorRollDB = new ArmorRollDB();
