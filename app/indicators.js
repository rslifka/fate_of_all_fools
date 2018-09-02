const $ = require('jquery');
const logger = require('logger.js');

const DUPLICATE_INDICATOR_CLASS = 'foaf-dupe';

const INDICATORS_TO_GLYPHS = new Map([
  [DUPLICATE_INDICATOR_CLASS, 'fglyph-knives']
]);

function prepareIndicatorSpace() {
  $('[data-fate-weapon-name]').not('[data-fate-indicator-init="true"]').each(function(index,element) {
    INDICATORS_TO_GLYPHS.forEach(function(glyph, className) {
      $(element).append($('<div>', {'class': className + ' ' + glyph + ' foaf-glyph'}));
    });
    $(this).attr('data-fate-indicator-init', true);
  });
}

fateBus.subscribe(module, 'fate.refresh', function() {
  logger.log('indicators.js: Inserting indicator elements');
  prepareIndicatorSpace();
});

exports.DUPLICATE_INDICATOR_CLASS = DUPLICATE_INDICATOR_CLASS;
