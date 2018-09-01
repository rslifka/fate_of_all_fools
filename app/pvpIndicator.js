const $ = require('jquery');
const logger = require('logger.js');

function preparePvpSpace() {
  $('[data-fate-weapon-registered="true"]').each(function(index,element) {
    if ($(this).children('.fate-pvp.fate-glyph.fglyph-pvp').length > 0) {
      return;
    }
    $(this).append($('<div>', {'class': 'fate-pvp fate-glyph fglyph-pvp', 'style':'display:none'}));
  });
}

function stylePvpIndicators() {
  $('[data-fate-weapon-registered="true"]').each(function(index,element) {
    if ($(this).is('[data-fate-weapon-pvp]')) {
      $(this).children('.fate-pvp').show();
    } else {
      $(this).children('.fate-pvp').hide();
    }
  });
}

fateBus.subscribe(module, 'fate.refresh', function() {
  logger.log('pvpIndicator.js: Calculating pvp useful weapons');
  preparePvpSpace();
  stylePvpIndicators();
  fateBus.publish(module, 'fate.pvpsCalculated');
});
