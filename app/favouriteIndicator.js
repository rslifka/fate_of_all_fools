const $ = require('jquery');
const logger = require('logger.js');
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
    if (weaponDatabase.get(weaponName).isFavourite) {
      $(this).children('.fate-fave').show();
    } else {
      $(this).children('.fate-fave').hide();
    }
  });
}

//
// function markDupes() {
//   $('.fate-dupe:visible').parent().attr('data-fate-weapon-dupe', true);
//   $('.fate-dupe:hidden').parent().removeAttr('data-fate-weapon-dupe');
// }
//
// function onMouseEnter() {
//   const weaponName = $(this).parent().attr('data-fate-weapon-name');
//   $('[data-fate-weapon-name]').not('[data-fate-weapon-name="'+weaponName+'"]').addClass('fate-search-hidden');
// }
//
// function onMouseLeave() {
//   $('.fate-search-hidden').removeClass('fate-search-hidden');
// }
//
// function registerListeners() {
//   $('.fate-dupe:visible').on('mouseenter.dupe', onMouseEnter);
//   $('.fate-dupe:visible').on('mouseleave.dupe', onMouseLeave);
// }

fateBus.subscribe(module, 'fate.refresh', function() {
  logger.log('favouritesIndicator.js: Calculating favourites');
  prepareFaveSpace();
  styleFaveIndicators();
  // registerListeners();
  // markDupes();
  fateBus.publish(module, 'fate.favesCalculated');
});
//
// /*
//   jasmine-jquery doesn't seem to play well these days. Not sure why but it can't
//   seem to trigger events via $.trigger, so we're going to use our bus to test the
//   events.
// */
// fateBus.subscribe(module, 'fate.test.mouseenter.dupe', function() {
//   $('.fate-dupe:visible').each(onMouseEnter);
// });
//
// fateBus.subscribe(module, 'fate.test.mouseleave.dupe', function() {
//   $('.fate-dupe:visible').each(onMouseLeave);
// });
