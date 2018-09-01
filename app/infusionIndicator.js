const $ = require('jquery');
const logger = require('logger.js');

function prepareInfusionIndicator() {
  $('[data-fate-weapon-registered="true"]').not('[data-fate-weapon-junk]').each(function(index,element) {
    if (!$(this).is('[data-fate-weapon-rarity=legendary],[data-fate-weapon-rarity=exotic]')) {
      return;
    }
    if ($(this).children('.fate-infusion.fate-glyph.fglyph-up').length > 0) {
      return;
    }
    $(this).append($('<div>', {'class': 'fate-infusion fate-positive fate-glyph fglyph-up', 'style':'display:none'}));
  });
}

function calculateInfusionFodder() {
  const infusionFodder = new Map();
  $('[data-fate-weapon-registered="true"]').each(function(index,element) {
    if (!$(this).is('[data-fate-weapon-dupe],[data-fate-weapon-junk]')) {
      return;
    }
    $(this).attr('data-fate-infuse-ok', true);
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
    if (infusionFodder.has(weaponType)) {
      infusionFodder.set(weaponType, infusionFodder.get(weaponType).concat(weaponData));
    } else {
      infusionFodder.set(weaponType, [weaponData]);
    }
  });
  return infusionFodder;
}

function styleInfusionIndicators(infusionFodder) {
  $('.fate-infusion').hide();
  $('.fate-infusion').parent().each(function(index,element) {
    const weaponType = $(this).attr('data-fate-weapon-type');
    const fodder = infusionFodder.get(weaponType);
    if (fodder === undefined) {
      return;
    }
    const light = parseInt($(this).attr('data-fate-base-light'));
    if ((fodder.filter(w => w.light > light)).length > 0) {
      $(this).children('.fate-infusion').show();
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
  prepareInfusionIndicator();
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
