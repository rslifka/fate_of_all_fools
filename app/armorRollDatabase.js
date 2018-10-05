const logger = require('logger');
const i = require('itemDatabase.js');
const armorRoll = require('armorRollAssessment.js');

class ArmorRollDB extends i.ItemDatabase {
	constructor() {
		super('armorRoll');
	}
	createItemFromData(data) {
		this.itemMap.set(data[0], new armorRoll.ArmorRollAssessment(data[0], data[1], data[2], data[3]));
	}
}

exports.armorRollDB = new ArmorRollDB();
