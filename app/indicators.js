const $ = require('jquery');
const logger = require('logger.js');

const PVE_INDICATOR_CLASS = 'foaf-pve';
const PVP_INDICATOR_CLASS = 'foaf-pvp';
const INFUSION_INDICATOR_CLASS = 'foaf-infusable';
const WISHLIST_PASS_INDICATOR_CLASS = 'foaf-wishlist-pass';
const WISHLIST_FAIL_INDICATOR_CLASS = 'foaf-wishlist-fail';
const ELEMENT_INDICATOR_CLASS = 'foaf-element';
const ATTUNED_INDICATOR_CLASS = 'foaf-attuned';

const WEAPON_GLYPHS = new Map([
  [PVE_INDICATOR_CLASS,       'fglyph-pve'],
  [PVP_INDICATOR_CLASS,       'fglyph-pvp'],
  [INFUSION_INDICATOR_CLASS,   'fglyph-up'],
  [WISHLIST_PASS_INDICATOR_CLASS, 'fglyph-wishlist-pass'],
  [WISHLIST_FAIL_INDICATOR_CLASS, 'fglyph-wishlist-fail'],
  [ELEMENT_INDICATOR_CLASS, ''],
  [ATTUNED_INDICATOR_CLASS, 'fglyph-exclamation']
]);

const ARMOR_GLYPHS = new Map([
  [PVE_INDICATOR_CLASS,  'fglyph-pve'],
  [PVP_INDICATOR_CLASS,  'fglyph-pvp'],
  [INFUSION_INDICATOR_CLASS, 'fglyph-up'],
  [ELEMENT_INDICATOR_CLASS, '']
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
}

fateBus.subscribe(module, 'fate.refresh', function() {
  // logger.log('indicators.js: Inserting indicator elements');
  prepareIndicatorSpace();
});
