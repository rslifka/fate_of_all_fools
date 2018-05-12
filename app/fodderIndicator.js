const $ = require('jquery');
const logger = require('logger.js');

function prepareFodderIndicator() {
  $('[data-fate-weapon-registered]').each(function(index,element) {
    if ($(this).children('.fate-fodder.fate-glyph.fglyph-up').length > 0) {
      return;
    }
    $(this).append($('<div>', {'class': 'fate-fodder fate-middling fate-glyph fglyph-up', 'style':'display:none'}));
  });
}

function calculateFodder() {
  const goodWeaponsToInfuse = new Map();
  $('[data-fate-weapon-registered]').each(function(index,element) {
    if ($(this).attr('data-fate-weapon-junk') === 'true') {
      return;
    }
    if (!$(this).is('[data-fate-weapon-rarity=legendary],[data-fate-weapon-rarity=exotic]')) {
      return;
    }
    const weaponName = $(this).attr('data-fate-weapon-name');
    const weaponType = $(this).attr('data-fate-weapon-type');
    const weaponLight = $(this).attr('data-fate-base-light');
    const weaponModded = $(this).is('[data-fate-is-modded]');
    const weaponData = {
      type: weaponType,
      isModded: weaponModded,
      light: parseInt(weaponLight),
      domElement: this,
      toString: function() {return weaponType + ' - ' + weaponName + ' ('+weaponLight+')';}
    };
    if (goodWeaponsToInfuse.has(weaponType)) {
      goodWeaponsToInfuse.set(weaponType, goodWeaponsToInfuse.get(weaponType).concat(weaponData));
    } else {
      goodWeaponsToInfuse.set(weaponType, [weaponData]);
    }
  });
  return goodWeaponsToInfuse;
}

function styleFodderIndicators(goodWeaponsToBoost) {
  $('.fate-fodder').hide();
  $('.fate-fodder').removeClass('fate-left-bump');
  $('.fate-fodder').parent().each(function(index,element) {
    const weaponType = $(this).attr('data-fate-weapon-type');
    const boostableWeapons = goodWeaponsToBoost.get(weaponType);
    if (boostableWeapons === undefined) {
      return;
    }
    const light = parseInt($(this).attr('data-fate-base-light'));
    if ((boostableWeapons.filter(w => w.light < light)).length > 0) {
      if ($(this).children('.fate-infusion:visible').length > 0) {
        $(this).children('.fate-fodder').addClass('fate-left-bump');
      }
      $(this).children('.fate-fodder').show();
    }
  });
}

function onMouseEnter() {
  $('[drag-channel=Kinetic],[drag-channel=Energy],[drag-channel=Power]').addClass('fate-search-hidden');
  $(this).parent().removeClass('fate-search-hidden');

  const weaponType = $(this).parent().attr('data-fate-weapon-type');
  const weaponLight = $(this).parent().attr('data-fate-base-light');

  $('[data-fate-weapon-type="'+weaponType+'"]').each(function(index,element) {
    if ($(this).attr('data-fate-weapon-junk') === 'true') {
      return;
    }
    if (!$(this).is('[data-fate-weapon-rarity=legendary],[data-fate-weapon-rarity=exotic]')) {
      return;
    }
    const lowerLight = parseInt($(this).attr('data-fate-base-light')) < weaponLight;
    if (lowerLight) {
      $(this).removeClass('fate-search-hidden');
    }
  });
}

function onMouseLeave() {
  $('.fate-search-hidden').removeClass('fate-search-hidden');
}

function registerListeners() {
  $('.fate-fodder:visible').on('mouseenter.fodder', onMouseEnter);
  $('.fate-fodder:visible').on('mouseleave.fodder', onMouseLeave);
}

fateBus.subscribe(module, 'fate.infusionCalculated', function() {
  logger.log('fodderIndicator.js: Calculating fodder');
  prepareFodderIndicator();
  styleFodderIndicators(calculateFodder());
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
