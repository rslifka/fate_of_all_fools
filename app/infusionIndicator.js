const $ = require('jquery');
const logger = require('logger.js');
const weaponDatabase = require('weaponDatabase.js');

function prepareInfusionSpace() {
  $('[data-fate-weapon-name]').each(function(index,element) {
    if ($(this).children('.fate-infusion.fate-glyph.fglyph-up').length > 0) {
      return;
    }
    $(this).append($('<div>', {'class': 'fate-infusion fate-positive fate-glyph fglyph-up', 'style':'display:none'}));
  });
}

function calculateWorkingSet() {
  const weapons = new Map();

  $('[data-fate-weapon-type]').not('[data-fate-weapon-rarity=rare]').each(function(index,element) {
    const weaponName = $(this).attr('data-fate-weapon-name');
    if (weaponDatabase.contains(weaponName) && weaponDatabase.get(weaponName).isJunk()) {
      return;
    }

    const weaponType = $(this).attr('data-fate-weapon-type');
    const weaponData = {
      type: weaponType,
      isModded: $(this).is('[data-fate-is-modded]'),
      light: parseInt($(this).attr('data-fate-base-light')),
      domElement: this
    };
    if (weapons.has(weaponType)) {
      weapons.set(weaponType, weapons.get(weaponType).concat(weaponData));
    } else {
      weapons.set(weaponType, [weaponData]);
    }
  });
  return weapons;
}

function styleInfusionIndicators(weaponData) {
  for (let [weaponType, weapons] of weaponData) {
    if (weapons.length === 1) {
      $(weapons[0].domElement).children('.fate-infusion').hide();
      continue;
    }
    const maxLight = Math.max(...weapons.map(w => w.light));
    const infusables = weapons.filter(w => w.light < maxLight);
    infusables.forEach(function(weapon) {
      $(weapon.domElement).children('.fate-infusion').show();
    });
  }
}

fateBus.subscribe(module, 'fate.dupesCalculated', function() {
  logger.log('infusionIndicator.js: Calculating infuseables');
  prepareInfusionSpace();
  styleInfusionIndicators(calculateWorkingSet());
});
