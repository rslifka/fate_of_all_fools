const $ = require('jquery');
const logger = require('logger.js');
const weapon = require('weapon.js');
const weaponDatabase = require('weaponDatabase.js');

function preparePvpSpace() {
  $('[data-fate-weapon-registered]').each(function(index,element) {
    if ($(this).children('.fate-pvp.fate-glyph.fglyph-pvp').length > 0) {
      return;
    }
    $(this).append($('<div>', {'class': 'fate-pvp fate-glyph fglyph-pvp', 'style':'display:none'}));
  });
}

function stylePvpIndicators() {
  $('[data-fate-weapon-registered]').each(function(index,element) {
    const weaponName = $(this).attr('data-fate-weapon-name');
    if (weaponDatabase.get(weaponName).pvpUtility === weapon.Utility.YES) {
      $(this).children('.fate-pvp').show();
    } else {
      $(this).children('.fate-pvp').hide();
    }
  });
}

function markPvps() {
  $('.fate-pvp:visible').parent().attr('data-fate-weapon-pvp', true);
  $('.fate-pvp:hidden').parent().removeAttr('data-fate-weapon-pvp');
}

function onMouseEnter() {
  $('[data-fate-weapon-name]').not('[data-fate-weapon-pvp]').addClass('fate-search-hidden');
}

function onMouseLeave() {
  $('.fate-search-hidden').removeClass('fate-search-hidden');
}

function registerListeners() {
  $('.fate-pvp:visible').on('mouseenter.pvp', onMouseEnter);
  $('.fate-pvp:visible').on('mouseleave.pvp', onMouseLeave);
}

fateBus.subscribe(module, 'fate.refresh', function() {
  logger.log('pvpIndicator.js: Calculating pvp useful weapons');
  preparePvpSpace();
  stylePvpIndicators();
  registerListeners();
  markPvps();
  fateBus.publish(module, 'fate.pvpsCalculated');
});

/*
  jasmine-jquery doesn't seem to play well these days. Not sure why but it can't
  seem to trigger events via $.trigger, so we're going to use our bus to test the
  events.
*/
fateBus.subscribe(module, 'fate.test.mouseenter.pvp', function() {
  $('.fate-pvp:visible').each(onMouseEnter);
});

fateBus.subscribe(module, 'fate.test.mouseleave.pvp', function() {
  $('.fate-pvp:visible').each(onMouseLeave);
});
