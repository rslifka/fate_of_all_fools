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

  $('[data-fate-weapon-rarity=legendary],[data-fate-weapon-rarity=exotic]').each(function(index,element) {
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
      if ($(weapon.domElement).is('[data-fate-weapon-dupe]')) {
        $(weapon.domElement).children('.fate-infusion').addClass('fate-left-bump');
      } else {
        $(weapon.domElement).children('.fate-infusion').removeClass('fate-left-bump');
      }
      $(weapon.domElement).children('.fate-infusion').show();
    });
  }
}

function onMouseEnter() {
  const weaponType = $(this).parent().attr('data-fate-weapon-type');
  const weaponLight = $(this).parent().attr('data-fate-base-light');
  $('[data-fate-weapon-type]').not('[data-fate-weapon-type="'+weaponType+'"]').addClass('fate-search-hidden');
  $('[data-fate-weapon-type="'+weaponType+'"]').each(function(index,element) {
    const infusable = parseInt($(this).attr('data-fate-base-light')) > weaponLight;
    if (infusable) {
      const newLight = parseInt($(this).attr('data-fate-base-light'));
      $(this).append($("<div>", {"class": "fate-infuse-new-light"}).text(newLight));
    } else {
      $(this).addClass('fate-search-hidden');
    }
  });

  // Don't hide yourself!
  $(this).parent().removeClass('fate-search-hidden');
}

function onMouseLeave() {
  $('.fate-search-hidden').removeClass('fate-search-hidden');
  $('.fate-infuse-new-light').remove();
}

function registerListeners() {
  $('.fate-infusion:visible').on('mouseenter.infuse', onMouseEnter);
  $('.fate-infusion:visible').on('mouseleave.infuse', onMouseLeave);
}

fateBus.subscribe(module, 'fate.dupesCalculated', function() {
  logger.log('infusionIndicator.js: Calculating infuseables');
  prepareInfusionSpace();
  styleInfusionIndicators(calculateWorkingSet());
  registerListeners();
});

/*
  jasmine-jquery doesn't seem to play well these days. Not sure why but it can't
  seem to trigger events via $.trigger, so we're going to use our bus to test the
  events.
*/
fateBus.subscribe(module, 'fate.test.mouseenter.infuse', function() {
  $('[data-fate-weapon-name="Perseverance"]:has(.item-stat:contains(305)) .fate-infusion.fate-positive.fate-glyph.fglyph-up').each(onMouseEnter);
});

fateBus.subscribe(module, 'fate.test.mouseleave.infuse', function() {
  $('[data-fate-weapon-name="Perseverance"]:has(.item-stat:contains(305)) .fate-infusion.fate-positive.fate-glyph.fglyph-up').each(onMouseLeave);
});
