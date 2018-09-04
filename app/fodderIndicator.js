const $ = require('jquery');
const logger = require('logger.js');
const indicators = require('indicators.js');

const GOOD_WEAPONS = new Map();

function calculateFodder() {
  GOOD_WEAPONS.clear();
  $('[data-fate-weapon-registered="true"]').each(function(index,element) {
    if ($(this).attr('data-fate-weapon-junk') === 'true') {
      return;
    }
    if ($(this).is('[data-fate-weapon-rarity=common]') || $(this).is('[data-fate-weapon-rarity=uncommon]') || $(this).is('[data-fate-weapon-rarity=rare]')) {
      return;
    }
    const weaponName = $(this).attr('data-fate-weapon-name');
    const weaponSlot = $(this).attr('drag-channel');
    const weaponLight = parseInt($(this).attr('data-fate-base-light'));
    const weaponData = {
      slot: weaponSlot,
      light: weaponLight,
      domElement: this,
      toString: function() {return weaponSlot + ' - ' + weaponName + ' ('+weaponLight+')';}
    };
    if (GOOD_WEAPONS.has(weaponSlot)) {
      GOOD_WEAPONS.set(weaponSlot, GOOD_WEAPONS.get(weaponSlot).concat(weaponData));
    } else {
      GOOD_WEAPONS.set(weaponSlot, [weaponData]);
    }
  });
}

function styleFodderIndicators(goodWeaponsToBoost) {
  $('[data-fate-weapon-name]').each(function(index,element) {

    if ($(this).is('[data-fate-weapon-registered="false"]')) {
      $(this).attr('data-fate-fodder', false);
      return;
    }

    if ($(this).is('[data-fate-weapon-junk="false"]') && $(this).is('[data-fate-weapon-dupe="false"]')) {
      $(this).attr('data-fate-fodder', false);
      return;
    }

    if ($(this).is('[data-fate-weapon-rarity="common"]') || $(this).is('[data-fate-weapon-rarity="uncommon"]')) {
      $(this).attr('data-fate-fodder', false);
      return;
    }

    const goodWeaponsInSlot = GOOD_WEAPONS.get($(this).attr('drag-channel'));
    if (goodWeaponsInSlot === undefined) {
      $(this).attr('data-fate-fodder', false);
      return;
    }

    const light = parseInt($(this).attr('data-fate-base-light'));
    if ((goodWeaponsInSlot.filter(w => w.light < light)).length > 0) {
      $(this).attr('data-fate-fodder', true);
    } else {
      $(this).attr('data-fate-fodder', false);
    }
  });
}

function onMouseEnter() {
  const weaponSlot = $(this).parent().attr('drag-channel');
  const weaponLight = $(this).parent().attr('data-fate-base-light');

  const goodWeaponsInSlot = GOOD_WEAPONS.get(weaponSlot);

  // Hide all weapons in the same slot
  $('[drag-channel='+weaponSlot+']').addClass('fate-search-hidden');

  // Show the current weapon
  $(this).parent().removeClass('fate-search-hidden');

  // Show valid fodder in this slot
  goodWeaponsInSlot.filter(w => w.light < weaponLight).forEach(function(weaponData) {
    $(weaponData.domElement).removeClass('fate-search-hidden');
  });

}

function onMouseLeave() {
  $('.fate-search-hidden').removeClass('fate-search-hidden');
}

function registerListeners() {
  $('.'+indicators.FODDER_INDICATOR_CLASS).on('mouseenter.fodder', onMouseEnter);
  $('.'+indicators.FODDER_INDICATOR_CLASS).on('mouseleave.fodder', onMouseLeave);
}

fateBus.subscribe(module, 'fate.infusionCalculated', function() {
  logger.log('fodderIndicator.js: Calculating fodder');
  calculateFodder();
  styleFodderIndicators();
  registerListeners();
});

/*
  jasmine-jquery doesn't seem to play well these days. Not sure why but it can't
  seem to trigger events via $.trigger, so we're going to use our bus to test the
  events.
*/
fateBus.subscribe(module, 'fate.test.mouseenter.fodder', function(msg, selector) {
  $(selector).each(onMouseEnter);
});

fateBus.subscribe(module, 'fate.test.mouseleave.fodder', function(msg, selector) {
  $(selector).each(onMouseLeave);
});
