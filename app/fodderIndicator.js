const $ = require('jquery');
const logger = require('logger.js');
const indicators = require('indicators.js');

const GOOD_WEAPONS = new Map();

function calculateFodder() {
  GOOD_WEAPONS.clear();
  $('[data-fate-weapon-registered="true"]').each(function(index,element) {
    // console.log('  => Examining ' + $(this).attr('data-fate-weapon-name'));
    if ($(this).attr('data-fate-weapon-junk') === 'true') {
      // console.log('  => JUNK!');
      return;
    }
    if ($(this).is('[data-fate-weapon-rarity=common]') || $(this).is('[data-fate-weapon-rarity=uncommon]') || $(this).is('[data-fate-weapon-rarity=rare]')) {
      // console.log('  => COMMON, UNCOMMON or RARE!');
      return;
    }
    // console.log('   => Good weapon!');
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

    // console.log('Examining ' + $(this).attr('data-fate-weapon-name'));
    if ($(this).is('[data-fate-weapon-registered="false"]')) {
      // console.log(' => skipping, unregistered');
      $(this).attr('data-fate-fodder', false);
      return;
    }

    if ($(this).is('[data-fate-weapon-junk="false"]') && $(this).is('[data-fate-weapon-dupe="false"]')) {
      // console.log(' => skipping, not junk and not dupe');
      $(this).attr('data-fate-fodder', false);
      return;
    }

    if ($(this).is('[data-fate-weapon-rarity="common"]') || $(this).is('[data-fate-weapon-rarity="uncommon"]')) {
      // console.log(' => skipping, common or uncommon');
      $(this).attr('data-fate-fodder', false);
      return;
    }

    const goodWeaponsInSlot = GOOD_WEAPONS.get($(this).attr('drag-channel'));
    if (goodWeaponsInSlot === undefined) {
      // console.log(' => skipping, no good weapons');
      $(this).attr('data-fate-fodder', false);
      return;
    }

    const light = parseInt($(this).attr('data-fate-base-light'));
    if ((goodWeaponsInSlot.filter(w => w.light < light)).length > 0) {
      // console.log(' => FODDER!');
      $(this).attr('data-fate-fodder', true);
    } else {
      // console.log(' => NOT FODDER!');
      $(this).attr('data-fate-fodder', false);
    }
  });
}

function onMouseEnter() {
  // $('[drag-channel=Kinetic],[drag-channel=Energy],[drag-channel=Power]').addClass('fate-search-hidden');
  // $(this).parent().removeClass('fate-search-hidden');
  //
  // const weaponType = $(this).parent().attr('data-fate-weapon-type');
  // const weaponLight = $(this).parent().attr('data-fate-base-light');
  //
  // $('[data-fate-weapon-type="'+weaponType+'"]').each(function(index,element) {
  //   if ($(this).attr('data-fate-weapon-junk') === 'true') {
  //     return;
  //   }
  //   if (!$(this).is('[data-fate-weapon-rarity=legendary],[data-fate-weapon-rarity=exotic]')) {
  //     return;
  //   }
  //   const lowerLight = parseInt($(this).attr('data-fate-base-light')) < weaponLight;
  //   if (lowerLight) {
  //     $(this).removeClass('fate-search-hidden');
  //   }
  // });
}

function onMouseLeave() {
  $('.fate-search-hidden').removeClass('fate-search-hidden');
}

function registerListeners() {
  // $('.fate-fodder:visible').on('mouseenter.fodder', onMouseEnter);
  // $('.fate-fodder:visible').on('mouseleave.fodder', onMouseLeave);
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
