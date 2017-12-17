const $ = require('jquery');
const postal = require('postal');
const logger = require('logger');
const weaponDatabase = require('weaponDatabase.js');

function updateTitles() {
  logger.log('commentDecorator.js: Updating weapon tooltips');
  $('[drag-channel=Kinetic],[drag-channel=Energy],[drag-channel=Power]').each(function(index,element) {
    const weaponName = $(this).attr('title');
    if (!weaponDatabase.contains(weaponName)) {
      return true;
    }
    var weapon = weaponDatabase.get(weaponName);
    const tooltipText = weaponName + ' // ' + weapon.type + ' - ' + weapon.subtype + '\n' + weapon.comments;
    $(this).attr('title', tooltipText);
  });
}

postal.subscribe({
  topic: 'fate.refresh',
  callback: updateTitles
});
