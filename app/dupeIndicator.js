const $ = require('jquery');
const logger = require('logger.js');

function prepareDupeSpace() {
  $('[data-fate-weapon-name]').not('[data-fate-weapon-dupe]').each(function(index,element) {
    $(this).attr('data-fate-weapon-dupe', false);
    $(this).append($('<div>', {'class': 'fate-glyph fate-dupe fate-middling fglyph-knives'}));
  });
}

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
    if (weaponInstances.length === 1) {
      if ($(weaponInstances[0].domElement).attr('data-fate-weapon-dupe') === 'true') {
        $(weaponInstances[0].domElement).attr('data-fate-weapon-dupe', false);
      }
      continue;
    }
    weaponInstances.forEach(function(weapon) {
      if ($(weapon.domElement).attr('data-fate-roll-stored') === 'true') {
        if ($(weapon.domElement).attr('data-fate-weapon-dupe') === 'false') {
          return;
        }
        $(weapon.domElement).attr('data-fate-weapon-dupe', false);
      } else {
        if ($(weapon.domElement).attr('data-fate-weapon-dupe') === 'true') {
          return;
        }
        $(weapon.domElement).attr('data-fate-weapon-dupe', true);
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
  $('[data-fate-weapon-dupe="true"] > .fate-dupe').on('mouseenter.dupe', onMouseEnter);
  $('[data-fate-weapon-dupe="true"] > .fate-dupe').on('mouseleave.dupe', onMouseLeave);
}

fateBus.subscribe(module, 'fate.refresh', function() {
  logger.log('dupeIndicator.js: Calculating duplicates');
  prepareDupeSpace();
  styleDupeIndicators(calculateWorkingSet());
  registerListeners();
  fateBus.publish(module, 'fate.dupesCalculated');
});

/*
  jasmine-jquery doesn't seem to play well these days. Not sure why but it can't
  seem to trigger events via $.trigger, so we're going to use our bus to test the
  events.
*/
fateBus.subscribe(module, 'fate.test.mouseenter.dupe', function() {
  $('[data-fate-weapon-dupe="true"] > .fate-dupe').each(onMouseEnter);
});

fateBus.subscribe(module, 'fate.test.mouseleave.dupe', function() {
  $('[data-fate-weapon-dupe="true"] > .fate-dupe').each(onMouseLeave);
});
