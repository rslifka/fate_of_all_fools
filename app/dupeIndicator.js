const $ = require('jquery');
const logger = require('logger.js');
const postal = require('postal');

function prepareDupeSpace() {
  $('[drag-channel=Kinetic],[drag-channel=Energy],[drag-channel=Power]').each(function(index,element) {
    if ($(this).children('.fate-dupe.fate-glyph.fglyph-knives').length > 0) {
      return;
    }
    $(this).append($('<div>', {'class': 'fate-glyph fate-dupe fglyph-knives', 'style':'display:none'}));
  });
}

function calculateWorkingSet() {
  const weapons = new Map();
  $('[drag-channel=Kinetic],[drag-channel=Energy],[drag-channel=Power]').each(function(index,element) {
    const weaponName = $(this).attr('title');
    const weaponData = {
      name: weaponName,
      domElement: this,
      light: parseInt($(this).children('.item-stat').text().replace(/M/,''))
    };
    if (weapons.has(weaponName)) {
        weapons.set(weaponName, weapons.get(weaponName).concat(weaponData));
    } else {
        weapons.set(weaponName, [weaponData]);
    }
  });
  return weapons;
}

function styleDupeIndicators(weapons) {
  for (let [weaponName, weaponInstances] of weapons) {
    if (weaponInstances.length === 1) {
      $(weaponInstances[0].domElement).children('.fate-dupe').hide();
      continue;
    }
    const maxLight = Math.max(...weaponInstances.map(function(w) {return w.light;}));
    weaponInstances.forEach(function(weapon) {
      $(weapon.domElement).children('.fate-dupe').removeClass('fate-negative fate-positive');
      $(weapon.domElement).children('.fate-dupe').addClass(weapon.light < maxLight ? 'fate-negative' : 'fate-positive');
      $(weapon.domElement).children('.fate-dupe').show();
    });
  }
}

function onMouseEnter() {
  const dragChannel = $(this).parent().attr('drag-channel');
  const title = $(this).parent().attr('title');
  $('[drag-channel='+dragChannel+']').not('[title="'+title+'"]').addClass('fate-search-hidden');
  $('[drag-channel=Kinetic],[drag-channel=Energy],[drag-channel=Power]').not('[drag-channel="'+dragChannel+'"]').addClass('fate-search-hidden');
}

function onMouseLeave() {
  $('.fate-search-hidden').removeClass('fate-search-hidden');
}

function registerListeners() {
  $('.fate-dupe:visible').on('mouseenter.dupe', onMouseEnter);
  $('.fate-dupe:visible').on('mouseleave.dupe', onMouseLeave);
}

postal.subscribe({
  topic: 'fate.refresh',
  callback: function() {
    logger.log('dupeIndicator.js: Calculating duplicates');
    prepareDupeSpace();
    styleDupeIndicators(calculateWorkingSet());
    registerListeners();
  }
});

/*
  jasmine-jquery doesn't seem to play well these days. Not sure why but it can't
  seem to trigger events via $.trigger, so we're going to use postal to test the
  events.
*/
postal.subscribe({
  topic: 'fate.test.mouseenter.dupe',
  callback: function() {
    $('.fate-dupe:visible').each(onMouseEnter);
  }
})
postal.subscribe({
  topic: 'fate.test.mouseleave.dupe',
  callback: function() {
    $('.fate-dupe:visible').each(onMouseLeave);
  }
})
