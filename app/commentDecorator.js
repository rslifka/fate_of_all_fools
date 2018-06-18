const $ = require('jquery');
const logger = require('logger');
const weaponDatabase = require('weaponDatabase.js');

function updateTitles() {
  logger.log('commentDecorator.js: Updating weapon tooltips');
  $('[data-fate-weapon-name]').each(function(index,element) {
    const weaponName = $(this).attr('data-fate-weapon-name');
    if (!weaponDatabase.contains(weaponName)) {
      return true;
    }
    const weapon = weaponDatabase.get(weaponName);
    $(this).attr(
      'title',
      weaponName + ' // ' + weapon.type + '\n' + weapon.comments
    );
  });
}

fateBus.subscribe(module, 'fate.refresh', updateTitles);
