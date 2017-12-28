const $ = require('jquery');
const logger = require('logger.js');

function createMarkup(filterParentSelector) {
  $('body').append($('<div>', {'class': 'fate-filters'}).text('FILTERS'));

  $('.fate-filters').append($('<div>', {'class': 'fate-filter fate-filter-pve  fglyph-pve'}));
  $('.fate-filters').append($('<div>', {'class': 'fate-filter fate-filter-pvp  fglyph-pvp'}));
  $('.fate-filters').append($('<div>', {'class': 'fate-filter fate-filter-raid fglyph-skull'}));
  $('.fate-filters').append($('<div>', {'class': 'fate-filter fate-filter-fave fglyph-fave'}));
}

function clickHandlerPve() {
  if ($(this).is('.fate-filter-active')) {
    $(this).removeClass('fate-filter-active');
    $('[data-fate-weapon-name]').removeClass('fate-search-hidden');
  } else {
    $(this).addClass('fate-filter-active');
    $('[data-fate-weapon-name]').not('[data-fate-weapon-pve]').addClass('fate-search-hidden');
  }
}

function clickHandlerPvp() {
  if ($(this).is('.fate-filter-active')) {
    $(this).removeClass('fate-filter-active');
    $('[data-fate-weapon-name]').removeClass('fate-search-hidden');
  } else {
    $(this).addClass('fate-filter-active');
    $('[data-fate-weapon-name]').not('[data-fate-weapon-pvp]').addClass('fate-search-hidden');
  }
}

function registerMouseHandlers() {
  $('.fate-filter-pve').on('click', clickHandlerPve);
  $('.fate-filter-pvp').on('click', clickHandlerPvp);
}

fateBus.subscribe(module, 'fate.init', function() {
  createMarkup();
  registerMouseHandlers();
});
