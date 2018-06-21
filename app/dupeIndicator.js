const $ = require('jquery');

const logger = require('logger.js');

function prepareDupeSpace() {
  $('[data-fate-weapon-name]').each(function(index,element) {
    if ($(this).children('.fate-dupe.fate-glyph.fglyph-knives').length > 0) {
      return;
    }
    $(this).append($('<div>', {'class': 'fate-glyph fate-dupe fglyph-knives', 'style':'display:none'}));
  });
}

function calculateWorkingSet() {
  const weapons = new Map();
  $('[data-fate-weapon-name]').each(function(index,element) {
    const weaponName = $(this).attr('data-fate-weapon-name');
    const weaponData = {
      name: weaponName,
      domElement: this,
      light: parseInt($(this).attr('data-fate-base-light'))
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
      $(weaponInstances[0].domElement).children('.fate-dupe').hide();
      continue;
    }
    const maxLight = Math.max(...weaponInstances.map(function(w) {return w.light;}));
    weaponInstances.forEach(function(weapon) {
      $(weapon.domElement).find('.fate-dupe').removeClass('fate-negative fate-positive');
      $(weapon.domElement).find('.fate-dupe').addClass(weapon.light < maxLight ? 'fate-negative' : 'fate-positive');
      if ($(weapon.domElement).attr('data-fate-weapon-junk') === 'true') {
        return;
      }
      $(weapon.domElement).find('.fate-dupe').show();
    });
  }
}

function markDupes() {
  $('.fate-dupe:visible').parent().attr('data-fate-weapon-dupe', true);
  $('.fate-dupe:hidden').parent().removeAttr('data-fate-weapon-dupe');
}

function onMouseEnter() {
  const weaponName = $(this).parent().attr('data-fate-weapon-name');
  $('[data-fate-weapon-name]').not('[data-fate-weapon-name="'+weaponName+'"]').addClass('fate-search-hidden');
}

function onMouseLeave() {
  $('.fate-search-hidden').removeClass('fate-search-hidden');
}

function registerListeners() {
  $('.fate-dupe:visible').on('mouseenter.dupe', onMouseEnter);
  $('.fate-dupe:visible').on('mouseleave.dupe', onMouseLeave);
}

fateBus.subscribe(module, 'fate.refresh', function() {
  logger.log('dupeIndicator.js: Calculating duplicates');
  prepareDupeSpace();
  styleDupeIndicators(calculateWorkingSet());
  registerListeners();
  markDupes();
  fateBus.publish(module, 'fate.dupesCalculated');
});

/*
  jasmine-jquery doesn't seem to play well these days. Not sure why but it can't
  seem to trigger events via $.trigger, so we're going to use our bus to test the
  events.
*/
fateBus.subscribe(module, 'fate.test.mouseenter.dupe', function() {
  $('.fate-dupe:visible').each(onMouseEnter);
});

fateBus.subscribe(module, 'fate.test.mouseleave.dupe', function() {
  $('.fate-dupe:visible').each(onMouseLeave);
});
