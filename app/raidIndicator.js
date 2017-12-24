const $ = require('jquery');
const logger = require('logger.js');
const weapon = require('weapon.js');
const weaponDatabase = require('weaponDatabase.js');

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
    const weaponName = $(this).attr('data-fate-weapon-name');
    if (weaponDatabase.get(weaponName).raidUtility === weapon.Utility.YES) {
      $(this).children('.fate-raid').removeClass('fate-right-bump fate-right-double-bump');
      if ($(this).is('[data-fate-weapon-pvp]')) {
        if ($(this).is('[data-fate-weapon-pve]')) {
          $(this).children('.fate-raid').addClass('fate-right-double-bump');
        } else {
          $(this).children('.fate-raid').addClass('fate-right-bump');
        }
      }
      $(this).children('.fate-raid').show();
    } else {
      $(this).children('.fate-raid').hide();
    }
  });
}

function markRaids() {
  $('.fate-raid:visible').parent().attr('data-fate-weapon-raid', true);
  $('.fate-raid:hidden').parent().removeAttr('data-fate-weapon-raid');
}

function onMouseEnter() {
  $('[data-fate-weapon-name]').not('[data-fate-weapon-raid]').addClass('fate-search-hidden');
}

function onMouseLeave() {
  $('.fate-search-hidden').removeClass('fate-search-hidden');
}

function registerListeners() {
  $('.fate-raid:visible').on('mouseenter.raid', onMouseEnter);
  $('.fate-raid:visible').on('mouseleave.raid', onMouseLeave);
}

fateBus.subscribe(module, 'fate.pvesCalculated', function() {
  logger.log('raidIndicator.js: Calculating raid useful weapons');
  prepareRaidSpace();
  styleRaidIndicators();
  registerListeners();
  markRaids();
  fateBus.publish(module, 'fate.raidsCalculated');
});

/*
  jasmine-jquery doesn't seem to play well these days. Not sure why but it can't
  seem to trigger events via $.trigger, so we're going to use our bus to test the
  events.
*/
fateBus.subscribe(module, 'fate.test.mouseenter.raid', function() {
  $('.fate-raid:visible').each(onMouseEnter);
});

fateBus.subscribe(module, 'fate.test.mouseleave.raid', function() {
  $('.fate-raid:visible').each(onMouseLeave);
});
