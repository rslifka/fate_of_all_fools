const $ = require('jquery');
const postal = require('postal');

function storeWeaponNames() {
  $('[drag-channel=Kinetic],[drag-channel=Energy],[drag-channel=Power]').not('[data-fate-weapon-name]').each(function(index,element) {
    $(this).attr('data-fate-weapon-name', $(this).attr('title').split("\n")[0]);
  });
}

postal.subscribe({
  topic: 'fate.refresh',
  callback: function() {
    storeWeaponNames();
  }
});
