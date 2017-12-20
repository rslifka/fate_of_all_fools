const $ = require('jquery');

/*
    Instead of a yellow border to indicate a mod, we're going to add "M" to the end of
    the item's Power Level. In D1, yellow borders used to indicate that an item was fully
    leveled up, and considering how eventually all items will have legendary mods in them,
    it ends up being visual noise.
*/
function indicateMods() {
  $('[drag-channel=Kinetic],[drag-channel=Energy],[drag-channel=Power],[drag-channel=Helmet],[drag-channel=Gauntlets],[drag-channel=Chest],[drag-channel=Leg],[drag-channel=ClassItem]').each(function(index,element) {
    if ($(this).children('.item-img.complete').length > 0) {
      const currentLight = $(this).children('.item-stat').text();
      if (!currentLight.endsWith('M')) {
        $(this).children('.item-stat').text(currentLight + 'M');
      }
    }
  });
}

fateBus.subscribe(module, 'fate.refresh', indicateMods);
