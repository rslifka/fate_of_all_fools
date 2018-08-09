const $ = require('jquery');
const logger = require('logger.js');

function prepareMasterworkSpace() {
  $('[data-fate-masterwork]').each(function(index,element) {
    if ($(this).children('.fate-masterwork').length > 0) {
      return;
    }
    $(this).append($('<div class="fate-masterwork" style="display:none">M</div>'));
  });
}

function styleMasterworkIndicators() {
  $('[data-fate-masterwork]').each(function(index,element) {
    if ($(this).attr('data-fate-masterwork') === 'true') {
      $(this).children('.fate-masterwork').show();
    } else {
      $(this).children('.fate-masterwork').hide();
    }
  });
}

fateBus.subscribe(module, 'fate.refresh', function() {
  logger.log('masterworkIndicator.js: Calculating masterworks');
  prepareMasterworkSpace();
  styleMasterworkIndicators();
});
