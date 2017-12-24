const $ = require('jquery');
const logger = require('logger.js');
const weapon = require('weapon.js');
const weaponDatabase = require('weaponDatabase.js');

function prepareFaveSpace() {
  $('[data-fate-weapon-registered]').each(function(index,element) {
    if ($(this).children('.fate-fave.fate-glyph.fglyph-fave').length > 0) {
      return;
    }
    $(this).append($('<div>', {'class': 'fate-fave fate-glyph fglyph-fave', 'style':'display:none'}));
  });
}

function styleFaveIndicators() {
  $('[data-fate-weapon-registered]').each(function(index,element) {
    const weaponName = $(this).attr('data-fate-weapon-name');
    if (weaponDatabase.get(weaponName).favouriteUtility === weapon.Utility.YES) {
      $(this).children('.fate-fave').show();
    } else {
      $(this).children('.fate-fave').hide();
    }
  });
}

function markFaves() {
  $('.fate-fave:visible').parent().attr('data-fate-weapon-favourite', true);
  $('.fate-fave:hidden').parent().removeAttr('data-fate-weapon-favourite');
}

function onMouseEnter() {
  $('[data-fate-weapon-name]').not('[data-fate-weapon-favourite]').addClass('fate-search-hidden');
}

function onMouseLeave() {
  $('.fate-search-hidden').removeClass('fate-search-hidden');
}

function registerListeners() {
  $('.fate-fave:visible').on('mouseenter.fave', onMouseEnter);
  $('.fate-fave:visible').on('mouseleave.fave', onMouseLeave);
}

fateBus.subscribe(module, 'fate.refresh', function() {
  logger.log('favouritesIndicator.js: Calculating favourites');
  prepareFaveSpace();
  styleFaveIndicators();
  registerListeners();
  markFaves();
  fateBus.publish(module, 'fate.favesCalculated');
});

/*
  jasmine-jquery doesn't seem to play well these days. Not sure why but it can't
  seem to trigger events via $.trigger, so we're going to use our bus to test the
  events.
*/
fateBus.subscribe(module, 'fate.test.mouseenter.fave', function() {
  $('.fate-fave:visible').each(onMouseEnter);
});

fateBus.subscribe(module, 'fate.test.mouseleave.fave', function() {
  $('.fate-fave:visible').each(onMouseLeave);
});
