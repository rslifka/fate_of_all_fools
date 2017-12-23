const $ = require('jquery');
const logger = require('logger.js');
const weaponDatabase = require('weaponDatabase.js');

function preparePvpSpace() {
  $('[data-fate-weapon-registered]').each(function(index,element) {
    if ($(this).children('.fate-pve.fate-glyph.fglyph-pve').length > 0) {
      return;
    }
    $(this).append($('<div>', {'class': 'fate-pve fate-glyph fglyph-pve', 'style':'display:none'}));
  });
}

function stylePvpIndicators() {
  $('[data-fate-weapon-registered]').each(function(index,element) {
    const weaponName = $(this).attr('data-fate-weapon-name');
    if (weaponDatabase.get(weaponName).pveUseful) {
      $(this).children('.fate-pve').removeClass('fate-right-bump');
      
      if ($(this).is('[data-fate-weapon-pvp]')) {
        $(this).children('.fate-pve').addClass('fate-right-bump');
      }
      $(this).children('.fate-pve').show();
    } else {
      $(this).children('.fate-pve').hide();
    }
  });
}

function markPvps() {
  $('.fate-pve:visible').parent().attr('data-fate-weapon-pve', true);
  $('.fate-pve:hidden').parent().removeAttr('data-fate-weapon-pve');
}

function onMouseEnter() {
  $('[data-fate-weapon-name]').not('[data-fate-weapon-pve]').addClass('fate-search-hidden');
}

function onMouseLeave() {
  $('.fate-search-hidden').removeClass('fate-search-hidden');
}

function registerListeners() {
  $('.fate-pve:visible').on('mouseenter.pve', onMouseEnter);
  $('.fate-pve:visible').on('mouseleave.pve', onMouseLeave);
}

fateBus.subscribe(module, 'fate.pvpsCalculated', function() {
  logger.log('pveIndicator.js: Calculating pve useful weapons');
  preparePvpSpace();
  stylePvpIndicators();
  registerListeners();
  markPvps();
  fateBus.publish(module, 'fate.pvesCalculated');
});

/*
  jasmine-jquery doesn't seem to play well these days. Not sure why but it can't
  seem to trigger events via $.trigger, so we're going to use our bus to test the
  events.
*/
fateBus.subscribe(module, 'fate.test.mouseenter.pve', function() {
  $('.fate-pve:visible').each(onMouseEnter);
});

fateBus.subscribe(module, 'fate.test.mouseleave.pve', function() {
  $('.fate-pve:visible').each(onMouseLeave);
});
