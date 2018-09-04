const $ = require('jquery');
const logger = require('logger.js');

function calculateInfusionFodder() {
  const infusionFodder = new Map();
  $('[data-fate-weapon-registered="true"]').each(function(index,element) {
    if (!$(this).is('[data-fate-weapon-dupe="true"],[data-fate-weapon-junk="true"]')) {
      return;
    }
    if (!$(this).is('[data-fate-weapon-rarity="rare"],[data-fate-weapon-rarity="legendary"],[data-fate-weapon-rarity="exotic"]')) {
      return;
    }
    $(this).attr('data-fate-infuse-ok', true);
    const weaponName = $(this).attr('data-fate-weapon-name');
    const weaponSlot = $(this).attr('drag-channel');
    const weaponLight = parseInt($(this).attr('data-fate-base-light'));
    const weaponData = {
      slot: weaponSlot,
      light: weaponLight,
      domElement: this,
      toString: function() {return weaponSlot + ' - ' + weaponName + ' ('+weaponLight+')';}
    };
    if (infusionFodder.has(weaponSlot)) {
      infusionFodder.set(weaponSlot, infusionFodder.get(weaponSlot).concat(weaponData));
    } else {
      infusionFodder.set(weaponSlot, [weaponData]);
    }
  });
  return infusionFodder;
}

function styleInfusionIndicators(infusionFodder) {
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

    const fodder = infusionFodder.get($(this).attr('drag-channel'));
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
  $('[drag-channel=Kinetic],[drag-channel=Energy],[drag-channel=Power]').addClass('fate-search-hidden');
  $(this).parent().removeClass('fate-search-hidden');

  const weaponType = $(this).parent().attr('data-fate-weapon-type');
  const weaponLight = $(this).parent().attr('data-fate-base-light');

  $('[data-fate-weapon-type="'+weaponType+'"]').each(function(index,element) {
    const higherLight = parseInt($(this).attr('data-fate-base-light')) > weaponLight;
    if ($(this).attr('data-fate-infuse-ok') != undefined && higherLight) {
      const newLight = parseInt($(this).attr('data-fate-base-light'));
      $(this).append($("<div>", {"class": "fate-infuse-new-light"}).text(newLight));
      $(this).removeClass('fate-search-hidden');
    }
  });
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
  const infusionFodder = calculateInfusionFodder();
  styleInfusionIndicators(infusionFodder);
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
