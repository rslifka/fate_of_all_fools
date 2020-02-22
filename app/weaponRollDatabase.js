const logger = require('logger');
const i = require('itemDatabase.js');
const weaponRoll = require('weaponRollAssessment.js');

class WeaponRollDB extends i.ItemDatabase {
	constructor() {
		super('weaponRoll');
	}
	createItemFromData(data) {
		this.itemMap.set(data[0], new weaponRoll.WeaponRollAssessment(data[0], data[1], data[2], data[3], data[4], data[5]));
	}
}

exports.weaponRollDB = new WeaponRollDB();
