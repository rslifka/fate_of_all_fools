const $ = require('jquery');
const logger = require('logger.js');

function prepareInfusionSpace() {
  $('[data-fate-weapon-registered]').each(function(index,element) {
    if ($(this).children('.fate-infusion.fate-glyph.fglyph-up').length > 0) {
      return;
    }
    $(this).append($('<div>', {'class': 'fate-infusion fate-positive fate-glyph fglyph-up', 'style':'display:none'}));
  });
}

function calculateWorkingSet() {
  const workingSet = new Map();

  $('[data-fate-weapon-rarity=legendary],[data-fate-weapon-rarity=exotic]').each(function(index,element) {
    const weaponName = $(this).attr('data-fate-weapon-name');
    const weaponType = $(this).attr('data-fate-weapon-type');
    const weaponLight = $(this).attr('data-fate-base-light');
    const weaponModded = $(this).is('[data-fate-is-modded]');
    const weaponData = {
      type: weaponType,
      isModded: weaponModded,
      light: weaponLight,
      domElement: this,
      toString: function() {return weaponType + ' - ' + weaponName + ' ('+weaponLight+')';}
    };
    if (workingSet.has(weaponType)) {
      workingSet.set(weaponType, workingSet.get(weaponType).concat(weaponData));
    } else {
      workingSet.set(weaponType, [weaponData]);
    }
  });

  for (let [weaponType, weapons] of workingSet) {
    weapons = removePreciousWeapons(weapons, weapons.length-1);
    workingSet.set(weaponType, weapons.filter(weapon => weapon !== undefined));
  }

  return workingSet;
}

function removePreciousWeapons(weapons, nextIndex) {
  if (nextIndex == -1) {
    return weapons;
  }
  const w = weapons[nextIndex];
  if ($(w.domElement).is('[data-fate-weapon-dupe],[data-fate-weapon-junk]')) {
    $(w.domElement).attr('data-fate-infuse-ok', true);
    return removePreciousWeapons(weapons, nextIndex-1);
  }
  const previouslyExamined = weapons.slice(nextIndex+1,weapons.length).filter(weapon => weapon !== undefined);
  if (previouslyExamined.length > 0) {
    return removePreciousWeapons(weapons, nextIndex-1);
  }
  weapons[nextIndex] = undefined;
  return removePreciousWeapons(weapons, nextIndex-1);
}

function styleInfusionIndicators(workingSet) {
  $('.fate-infusion').hide();

  for (let [weaponType, weapons] of workingSet) {
    const maxLight = Math.max(...weapons.map(w => w.light));
    const infusables = weapons.filter(w => w.light < maxLight);
    infusables.forEach(function(weapon) {
      if ($(weapon.domElement).is('[data-fate-weapon-dupe]')) {
        $(weapon.domElement).children('.fate-infusion').addClass('fate-left-bump');
      } else {
        $(weapon.domElement).children('.fate-infusion').removeClass('fate-left-bump');
      }
      $(weapon.domElement).children('.fate-infusion').show();
    });
  }

  // Ensure "junk" weapons never get an infuse-up icon
  // TODO - No tests fail when leaving this out; is that OK?
  $('[data-fate-weapon-junk]').children('.fate-infusion').hide();
}

function onMouseEnter() {
  $('[drag-channel=Kinetic],[drag-channel=Energy],[drag-channel=Power]').addClass('fate-search-hidden');
  $(this).parent().removeClass('fate-search-hidden');

  const weaponType = $(this).parent().attr('data-fate-weapon-type');
  const weaponLight = $(this).parent().attr('data-fate-base-light');

  $('[data-fate-weapon-type="'+weaponType+'"]').each(function(index,element) {
    const higherLight = parseInt($(this).attr('data-fate-base-light')) > weaponLight;
    if ($(this).attr('data-fate-infuse-ok') != undefined && higherLight) {
      const newLight = parseInt($(this).attr('data-fate-base-light'));
      $(this).append($("<div>", {"class": "fate-infuse-new-light"}).text(newLight));
      $(this).removeClass('fate-search-hidden');
    }
  });
}

function onMouseLeave() {
  $('.fate-search-hidden').removeClass('fate-search-hidden');
  $('.fate-infuse-new-light').remove();
}

function registerListeners() {
  $('.fate-infusion:visible').on('mouseenter.infuse', onMouseEnter);
  $('.fate-infusion:visible').on('mouseleave.infuse', onMouseLeave);
}

fateBus.subscribe(module, 'fate.dupesCalculated', function() {
  logger.log('infusionIndicator.js: Calculating infuseables');
  prepareInfusionSpace();
  styleInfusionIndicators(calculateWorkingSet());
  registerListeners();
});

/*
  jasmine-jquery doesn't seem to play well these days. Not sure why but it can't
  seem to trigger events via $.trigger, so we're going to use our bus to test the
  events.
*/
fateBus.subscribe(module, 'fate.test.mouseenter.infuse', function(msg, selector) {
  $(selector).each(onMouseEnter);
});

fateBus.subscribe(module, 'fate.test.mouseleave.infuse', function(msg, selector) {
  $(selector).each(onMouseLeave);
});
