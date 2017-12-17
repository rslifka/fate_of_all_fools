const $ = require('jquery');
const postal = require('postal');
const logger = require('logger');
const weaponDatabase = require('weaponDatabase.js');

function updateTitles() {
  logger.log('commentDecorator.js: Updating weapon tooltips');
  $('[drag-channel=Kinetic],[drag-channel=Energy],[drag-channel=Power]').not('[data-fate-weapon-name]').each(function(index,element) {
    $(this).attr('data-fate-weapon-name', $(this).attr('title'));
  });
  $('[data-fate-weapon-name]').each(function(index,element) {
    const weaponName = $(this).attr('data-fate-weapon-name');
    if (!weaponDatabase.contains(weaponName)) {
      return true;
    }
    var weapon = weaponDatabase.get(weaponName);
    $(this).attr(
      'title',
      weaponName + ' // ' + weapon.type + ' - ' + weapon.subtype + '\n' + weapon.comments
    );
  });
}

postal.subscribe({
  topic: 'fate.refresh',
  callback: updateTitles
});
