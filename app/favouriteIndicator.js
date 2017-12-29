const $ = require('jquery');
const logger = require('logger.js');

function prepareFaveSpace() {
  $('[data-fate-weapon-registered]').each(function(index,element) {
    if ($(this).children('.fate-fave.fate-glyph.fglyph-fave').length > 0) {
      return;
    }
    $(this).append($('<div>', {'class': 'fate-fave fate-glyph fglyph-fave', 'style':'display:none'}));
  });
}

function styleFaveIndicators() {
  $('[data-fate-weapon-registered]').each(function(index,element) {
    if ($(this).is('[data-fate-weapon-favourite]')) {
      $(this).children('.fate-fave').show();
    } else {
      $(this).children('.fate-fave').hide();
    }
  });
}

fateBus.subscribe(module, 'fate.refresh', function() {
  logger.log('favouritesIndicator.js: Calculating favourites');
  prepareFaveSpace();
  styleFaveIndicators();
  fateBus.publish(module, 'fate.favesCalculated');
});
