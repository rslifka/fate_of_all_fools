const $ = require('jquery');
const logger = require('logger.js');

function preparePvpSpace() {
  $('[data-fate-weapon-registered="true"]').each(function(index,element) {
    if ($(this).children('.fate-pve.fate-glyph.fglyph-pve').length > 0) {
      return;
    }
    $(this).append($('<div>', {'class': 'fate-pve fate-glyph fglyph-pve', 'style':'display:none'}));
  });
}

function stylePvpIndicators() {
  $('[data-fate-weapon-registered="true"]').each(function(index,element) {
    if (!$(this).is('[data-fate-weapon-pve]')) {
      $(this).children('.fate-pve').hide();
      return;
    }

    if ($(this).is('[data-fate-weapon-pvp]')) {
      $(this).children('.fate-pve').addClass('fate-right-bump');
    }

    $(this).children('.fate-pve').show();
  });
}

fateBus.subscribe(module, 'fate.pvpsCalculated', function() {
  logger.log('pveIndicator.js: Calculating pve useful weapons');
  preparePvpSpace();
  stylePvpIndicators();
  fateBus.publish(module, 'fate.pvesCalculated');
});
