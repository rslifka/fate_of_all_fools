const logger = require('logger');
const i = require('itemDatabase.js');
const weaponRoll = require('weaponRollAssessment.js');

class WeaponRollDB extends i.ItemDatabase {
	constructor() {
		super('weaponRoll');
	}
	createItemFromData(data) {
		this.itemMap.set(data[0], new weaponRoll.WeaponRollAssessment(...data));
	}
}

exports.weaponRollDB = new WeaponRollDB();
