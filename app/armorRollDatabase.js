const logger = require('logger');
const i = require('itemDatabase.js');
const armorRoll = require('armorRoll.js');

class ArmorRollDB extends i.ItemDatabase {
	constructor() {
		super('armorRoll');
	}
	createItemFromData(data) {
		this.itemMap.set(data[0], new armorRoll.ArmorRoll(data[0], data[1], data[2], data[3], data[4], data[5]));
	}
}

exports.armorRollDB = new ArmorRollDB();
