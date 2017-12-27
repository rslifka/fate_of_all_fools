const $ = require('jquery');
const logger = require('logger.js');

function createMarkup() {
  $('body').append($('<div>', {'class': 'fate-filters'}).text('FILTERS'));

  $('.fate-filters').append($('<div>', {'class': 'fate-filter fate-filter-pve  fglyph-pve'}));
  $('.fate-filters').append($('<div>', {'class': 'fate-filter fate-filter-pvp  fglyph-pvp'}));
  $('.fate-filters').append($('<div>', {'class': 'fate-filter fate-filter-raid fglyph-skull'}));
  $('.fate-filters').append($('<div>', {'class': 'fate-filter fate-filter-fave fglyph-fave'}));
}

fateBus.subscribe(module, 'fate.init', function() {
  createMarkup();
});
