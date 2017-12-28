const $ = require('jquery');
const logger = require('logger.js');

function prepareRaidSpace() {
  $('[data-fate-weapon-registered]').each(function(index,element) {
    if ($(this).children('.fate-raid.fate-glyph.fglyph-skull').length > 0) {
      return;
    }
    $(this).append($('<div>', {'class': 'fate-raid fate-glyph fglyph-skull', 'style':'display:none'}));
  });
}

function styleRaidIndicators() {
  $('[data-fate-weapon-registered]').each(function(index,element) {
    if (!$(this).is('[data-fate-weapon-raid]')) {
      $(this).children('.fate-raid').hide();
      return;
    }

    $(this).children('.fate-raid').removeClass('fate-right-bump fate-right-double-bump');

    if ($(this).is('[data-fate-weapon-pvp]')) {
      if ($(this).is('[data-fate-weapon-pve]')) {
        $(this).children('.fate-raid').addClass('fate-right-double-bump');
      } else {
        $(this).children('.fate-raid').addClass('fate-right-bump');
      }
    }

    $(this).children('.fate-raid').show();
  });
}

fateBus.subscribe(module, 'fate.pvesCalculated', function() {
  logger.log('raidIndicator.js: Calculating raid useful weapons');
  prepareRaidSpace();
  styleRaidIndicators();
  fateBus.publish(module, 'fate.raidsCalculated');
});
