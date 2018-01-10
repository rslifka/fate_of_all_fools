const $ = require('jquery');
const logger = require('logger.js');

function createMarkup(filterParentSelector) {
  $('.store-row.store-header').append($('<div>', {'class': 'fate-filters'}));
  $('.fate-filters').append($('<div>', {'class': 'fate-filter fate-filter-pve  fglyph-pve'}).append($('<div>', {'class': 'fate-filter-text'}).text('PvE')));
  $('.fate-filters').append($('<div>', {'class': 'fate-filter fate-filter-pvp  fglyph-pvp'}).append($('<div>', {'class': 'fate-filter-text'}).text('PvP')));
  $('.fate-filters').append($('<div>', {'class': 'fate-filter fate-filter-raid fglyph-skull'}).append($('<div>', {'class': 'fate-filter-text'}).text('RAID')));
  $('.fate-filters').append($('<div>', {'class': 'fate-filter fate-filter-fave fglyph-fave'}).append($('<div>', {'class': 'fate-filter-text'}).text('FAVE!')));
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

function clickHandlerRaid() {
  if ($(this).is('.fate-filter-active')) {
    $(this).removeClass('fate-filter-active');
    $('[data-fate-weapon-name]').removeClass('fate-search-hidden');
  } else {
    $(this).addClass('fate-filter-active');
    $('[data-fate-weapon-name]').not('[data-fate-weapon-raid]').addClass('fate-search-hidden');
  }
}

function clickHandlerFave() {
  if ($(this).is('.fate-filter-active')) {
    $(this).removeClass('fate-filter-active');
    $('[data-fate-weapon-name]').removeClass('fate-search-hidden');
  } else {
    $(this).addClass('fate-filter-active');
    $('[data-fate-weapon-name]').not('[data-fate-weapon-favourite]').addClass('fate-search-hidden');
  }
}
function registerMouseHandlers() {
  $('.fate-filter-pve').on('click', clickHandlerPve);
  $('.fate-filter-pvp').on('click', clickHandlerPvp);
  $('.fate-filter-raid').on('click', clickHandlerRaid);
  $('.fate-filter-fave').on('click', clickHandlerFave);
}

fateBus.subscribe(module, 'fate.refresh', function() {
  if ($('.fate-filters').length > 0) {
    return;
  }
  createMarkup();
  registerMouseHandlers();
});
