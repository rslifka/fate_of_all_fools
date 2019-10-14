const $ = require('jquery');
const logger = require('logger.js');

const DUPLICATE_INDICATOR_CLASS = 'foaf-dupe';
const JUNK_INDICATOR_CLASS = 'foaf-junk';
const PVE_INDICATOR_CLASS = 'foaf-pve';
const PVP_INDICATOR_CLASS = 'foaf-pvp';
const FAVE_INDICATOR_CLASS = 'foaf-fave';
const MASTERWORK_INDICATOR_CLASS = 'foaf-masterwork';

const MOB_INDICATOR_CLASS = 'foaf-mob';
const RES_INDICATOR_CLASS = 'foaf-res';
const REC_INDICATOR_CLASS = 'foaf-rec';
const INT_INDICATOR_CLASS = 'foaf-int';
const DIS_INDICATOR_CLASS = 'foaf-dis';
const STR_INDICATOR_CLASS = 'foaf-str';
const TOTAL_INDICATOR_CLASS = 'foaf-total';

const WEAPON_GLYPHS = new Map([
  [DUPLICATE_INDICATOR_CLASS, 'fglyph-knives'],
  [JUNK_INDICATOR_CLASS,      'fglyph-thumbs-down'],
  [PVE_INDICATOR_CLASS,       'fglyph-pve'],
  [PVP_INDICATOR_CLASS,       'fglyph-pvp'],
  [MASTERWORK_INDICATOR_CLASS, '']
]);

const ARMOR_GLYPHS = new Map([
  [JUNK_INDICATOR_CLASS, 'fglyph-thumbs-down'],
  [PVE_INDICATOR_CLASS,  'fglyph-pve'],
  [PVP_INDICATOR_CLASS,  'fglyph-pvp'],
  [MOB_INDICATOR_CLASS,  'fglyph-mobility'],
  [RES_INDICATOR_CLASS,  'fglyph-resilience'],
  [REC_INDICATOR_CLASS,  'fglyph-recovery'],
  [DIS_INDICATOR_CLASS,  'fglyph-discipline'],
  [INT_INDICATOR_CLASS,  'fglyph-intellect'],
  [STR_INDICATOR_CLASS,  'fglyph-strength'],
  [TOTAL_INDICATOR_CLASS,  ''],
  [MASTERWORK_INDICATOR_CLASS, '']
]);

const SHADER_GLYPHS = new Map([
  [FAVE_INDICATOR_CLASS, 'fglyph-fave'],
  [JUNK_INDICATOR_CLASS, 'fglyph-thumbs-down']
]);

function prepareIndicatorSpace() {
  $('[data-fate-weapon-name]').not('[data-fate-indicator-init=true]').each(function(index,element) {
    WEAPON_GLYPHS.forEach(function(glyph, className) {
      $(element).append($('<div>', {'class': className + ' ' + glyph + ' foaf-glyph'}));
    });
    $(this).attr('data-fate-indicator-init', true);
  });

  $('[data-fate-armor-name]').not('[data-fate-indicator-init=true]').each(function(index,element) {
    ARMOR_GLYPHS.forEach(function(glyph, className) {
      $(element).append($('<div>', {'class': className + ' ' + glyph + ' foaf-glyph'}));
    });
    $(this).attr('data-fate-indicator-init', true);
  });

  $('[data-fate-shader-name]').not('[data-fate-indicator-init=true]').each(function(index,element) {
    SHADER_GLYPHS.forEach(function(glyph, className) {
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
