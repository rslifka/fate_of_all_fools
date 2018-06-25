const logger = require('logger');
const i = require('itemDatabase.js');
const roll = require('rollAssessment.js');

class RollDB extends i.ItemDatabase {
	constructor() {
		super('roll');
	}
	createItemFromData(data) {
		this.itemMap.set(data[0], new roll.RollAssessment(data[0], data[1], data[2], data[3], data[4]));
	}
}

exports.rollDB = new RollDB();
