const logger = require('logger');
const weapon = require('weapon.js');

const weaponMap = new Map();

function refresh(newWeaponData) {
	weaponMap.clear();
	const dataLines = newWeaponData.split(/[\r\n]+/);
	logger.log('weaponDatabase.js: Found ('+(dataLines.length-1)+') weapons');

	dataLines.forEach(function(weaponLine) {
		const data = weaponLine.split('\t');
		weaponMap.set(data[0], new weapon.Weapon(data[0], data[1], data[2], data[3], data[4], data[5]));
	});
}

function contains(weaponName) {
	return weaponMap.has(weaponName);
}

function get(weaponName) {
	return weaponMap.get(weaponName);
}

fateBus.subscribe(module, 'fate.weaponDataFetched', function(msg, newWeaponData) {
  refresh(newWeaponData);
});

exports.contains = contains;
exports.get = get;
