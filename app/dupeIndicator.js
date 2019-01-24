const $ = require('jquery');
const logger = require('logger.js');
const indicators = require('indicators.js');

fateBus.subscribe(module, 'fate.refresh', function() {
  logger.log('dupeIndicator.js: Calculating duplicates');
  styleDupeIndicators(calculateWorkingSet());
});

function calculateWorkingSet() {
  const weapons = new Map();
  $('[data-fate-weapon-name]').each(function(index,element) {
    const weaponName = $(this).attr('data-fate-weapon-name');
    const weaponData = {
      name: weaponName,
      domElement: this
    };
    if (weapons.has(weaponName)) {
        weapons.set(weaponName, weapons.get(weaponName).concat(weaponData));
    } else {
        weapons.set(weaponName, [weaponData]);
    }
  });
  return weapons;
}

function styleDupeIndicators(weapons) {
  for (let [weaponName, weaponInstances] of weapons) {
    weaponInstances.forEach(function(weapon) {
      if (weaponInstances.length === 1) {
        $(weapon.domElement).attr('data-fate-weapon-dupe', false);
      } else {
        const isDupe = $(weapon.domElement).attr('data-fate-weapon-registered') === 'false';
        $(weapon.domElement).attr('data-fate-weapon-dupe', isDupe);
      }
    });
  }
}
