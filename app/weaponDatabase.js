const logger = require('logger');
const i = require('itemDatabase.js');
const weapon = require('weapon.js');

class WeaponDB extends i.ItemDatabase {
	constructor() {
		super('weapon');
	}
	createItemFromData(data) {
		this.itemMap.set(data[0], new weapon.Weapon(data[0], data[1], data[2], data[3], data[4], data[5]));
	}
}

exports.weaponDB = new WeaponDB();
