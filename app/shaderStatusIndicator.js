const $ = require('jquery');
const logger = require('logger.js');

function prepareIgnoreSpace() {
  $('[data-fate-shader-name]').not('[data-fate-shader-init="true"]').each(function(index,element) {
    $(this).append($('<div>', {'class': 'fate-question-mark fate-middling fglyph-question-mark fate-ignore-slot fate-glyph'}));
    $(this).append($('<div>', {'class': 'fate-fave          fate-positive fglyph-fave          fate-ignore-slot fate-glyph'}));
    $(this).append($('<div>', {'class': 'fate-thumbs-down   fate-positive fglyph-thumbs-down   fate-ignore-slot fate-glyph'}));
    $(this).attr('data-fate-shader-init', true);
  });
}

fateBus.subscribe(module, 'fate.refresh', function() {
  logger.log('ignoreStatusIndicator.js: Calculating ignore status');
  prepareIgnoreSpace();
});
