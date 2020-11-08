const $ = require('jquery');
const logger = require('logger.js');

const DUPLICATE_INDICATOR_CLASS = 'foaf-dupe';
const JUNK_INDICATOR_CLASS = 'foaf-junk';
const PVE_INDICATOR_CLASS = 'foaf-pve';
const PVP_INDICATOR_CLASS = 'foaf-pvp';
const FAVE_INDICATOR_CLASS = 'foaf-fave';
const INFUSION_INDICATOR_CLASS = 'foaf-infusable';
const MASTERWORK_INDICATOR_CLASS = 'foaf-masterwork';
const WISHLIST_PASS_INDICATOR_CLASS = 'foaf-wishlist-pass';
const WISHLIST_FAIL_INDICATOR_CLASS = 'foaf-wishlist-fail';

const WEAPON_GLYPHS = new Map([
  [DUPLICATE_INDICATOR_CLASS, 'fglyph-dupe'],
  [PVE_INDICATOR_CLASS,       'fglyph-pve'],
  [PVP_INDICATOR_CLASS,       'fglyph-pvp'],
  [INFUSION_INDICATOR_CLASS,   'fglyph-up'],
  [WISHLIST_PASS_INDICATOR_CLASS, 'fglyph-wishlist-pass'],
  [WISHLIST_FAIL_INDICATOR_CLASS, 'fglyph-wishlist-fail'],
  [MASTERWORK_INDICATOR_CLASS, '']
]);

const ARMOR_GLYPHS = new Map([
  [PVE_INDICATOR_CLASS,  'fglyph-pve'],
  [PVP_INDICATOR_CLASS,  'fglyph-pvp'],
  [INFUSION_INDICATOR_CLASS, 'fglyph-up'],
  [MASTERWORK_INDICATOR_CLASS, '']
]);

const SHADER_GLYPHS = new Map([
  [FAVE_INDICATOR_CLASS, 'fglyph-fave'],
  [JUNK_INDICATOR_CLASS, 'fglyph-junk']
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
    $(this).append($('<div>', {'class': 'foaf-item-overlay'}));
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
  // logger.log('indicators.js: Inserting indicator elements');
  prepareIndicatorSpace();
});

exports.DUPLICATE_INDICATOR_CLASS = DUPLICATE_INDICATOR_CLASS;
