const $ = require('jquery');
const logger = require('logger.js');
const indicators = require('indicators.js');

fateBus.subscribe(module, 'fate.refresh', function() {
  logger.log('dupeIndicator.js: Calculating duplicates');
  styleDupeIndicators(calculateWorkingSet());
  registerListeners();
  fateBus.publish(module, 'fate.dupesCalculated');
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
        const isDupe = $(weapon.domElement).attr('data-fate-roll-stored') === 'false';
        $(weapon.domElement).attr('data-fate-weapon-dupe', isDupe);
      }
    });
  }
}

function onMouseEnter() {
  const weaponName = $(this).parent().attr('data-fate-weapon-name');
  $('[data-fate-weapon-name]').not('[data-fate-weapon-name="'+weaponName+'"]').addClass('fate-search-hidden');
}

function onMouseLeave() {
  $('.fate-search-hidden').removeClass('fate-search-hidden');
}

function registerListeners() {
  $('[data-fate-weapon-dupe="true"] > .' + indicators.DUPLICATE_INDICATOR_CLASS).on('mouseenter.dupe', onMouseEnter);
  $('[data-fate-weapon-dupe="true"] > .' + indicators.DUPLICATE_INDICATOR_CLASS).on('mouseleave.dupe', onMouseLeave);
}

/*
  jasmine-jquery doesn't seem to play well these days. Not sure why but it can't
  seem to trigger events via $.trigger, so we're going to use our bus to test the
  events.
*/
fateBus.subscribe(module, 'fate.test.mouseenter.dupe', function(msg, selector) {
  $(selector).each(onMouseEnter);
});

fateBus.subscribe(module, 'fate.test.mouseleave.dupe', function(msg, selector) {
  $(selector).each(onMouseLeave);
});
