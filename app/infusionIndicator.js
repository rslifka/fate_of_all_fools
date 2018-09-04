const $ = require('jquery');
const logger = require('logger.js');

const INFUSION_FODDER = new Map();

function calculateInfusionFodder() {
  INFUSION_FODDER.clear();
  $('[data-fate-weapon-registered="true"]').each(function(index,element) {
    if ($(this).is('[data-fate-weapon-dupe="false"]') && $(this).is('[data-fate-weapon-junk="false"]')) {
      return;
    }
    if ($(this).is('[data-fate-weapon-rarity="common"]') || $(this).is('[data-fate-weapon-rarity="uncommon"]')) {
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
    if (INFUSION_FODDER.has(weaponSlot)) {
      INFUSION_FODDER.set(weaponSlot, INFUSION_FODDER.get(weaponSlot).concat(weaponData));
    } else {
      INFUSION_FODDER.set(weaponSlot, [weaponData]);
    }
  });
}

function styleInfusionIndicators() {
  $('[data-fate-weapon-name]').each(function(index,element) {

    if ($(this).is('[data-fate-weapon-registered="false"]')) {
      $(this).attr('data-fate-infusable', false);
      return;
    }

    if ($(this).is('[data-fate-weapon-junk="true"]')) {
      $(this).attr('data-fate-infusable', false);
      return;
    }

    if (!$(this).is('[data-fate-weapon-rarity="legendary"],[data-fate-weapon-rarity="exotic"]')) {
      $(this).attr('data-fate-infusable', false);
      return;
    }

    const fodder = INFUSION_FODDER.get($(this).attr('drag-channel'));
    if (fodder === undefined) {
      $(this).attr('data-fate-infusable', false);
      return;
    }

    const light = parseInt($(this).attr('data-fate-base-light'));
    if ((fodder.filter(w => w.light > light)).length > 0) {
      $(this).attr('data-fate-infusable', true);
    } else {
      $(this).attr('data-fate-infusable', false);
    }
  });
}

function onMouseEnter() {
  const weaponSlot = $(this).parent().attr('drag-channel');
  const weaponLight = $(this).parent().attr('data-fate-base-light');

  const fodder = INFUSION_FODDER.get(weaponSlot);

  // Hide all weapons in the same slot
  $('[drag-channel='+weaponSlot+']').addClass('fate-search-hidden');

  // Show the current weapon
  $(this).parent().removeClass('fate-search-hidden');

  // console.log(fodder);

  // Show valid fodder in this slot
  fodder.filter(w => w.light > weaponLight).forEach(function(weaponData) {
    $(weaponData.domElement).removeClass('fate-search-hidden');
  });
}

function onMouseLeave() {
  $('.fate-search-hidden').removeClass('fate-search-hidden');
}

function registerListeners() {
  $('.foaf-infusable').on('mouseenter.infuse', onMouseEnter);
  $('.foaf-infusable').on('mouseleave.infuse', onMouseLeave);
}

fateBus.subscribe(module, 'fate.dupesCalculated', function() {
  logger.log('infusionIndicator.js: Calculating infuseables');
  calculateInfusionFodder();
  styleInfusionIndicators();
  registerListeners();
  fateBus.publish(module, 'fate.infusionCalculated');
});

/*
  jasmine-jquery doesn't seem to play well these days. Not sure why but it can't
  seem to trigger events via $.trigger, so we're going to use our bus to test the
  events.
*/
fateBus.subscribe(module, 'fate.test.mouseenter.infuse', function(msg, selector) {
  $(selector).each(onMouseEnter);
});

fateBus.subscribe(module, 'fate.test.mouseleave.infuse', function(msg, selector) {
  $(selector).each(onMouseLeave);
});
