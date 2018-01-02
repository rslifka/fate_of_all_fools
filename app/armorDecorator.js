const $ = require('jquery');

function storeModStatus() {
  $('[drag-channel=Helmet],[drag-channel=Gauntlets],[drag-channel=Chest],[drag-channel=Leg],[drag-channel=ClassItem]').each(function(index,element) {
    $(this).attr('data-fate-is-modded', $(this).children('.item-img.complete').length > 0);
  });
}

function storeBaseLightLevel() {
  $('[drag-channel=Helmet],[drag-channel=Gauntlets],[drag-channel=Chest],[drag-channel=Leg],[drag-channel=ClassItem]').each(function(index,element) {
     const itemStatValue = parseInt($(this).children('.item-stat').text().match(/(\d+)/));
     const baseLightLevel = ($(this).attr('data-fate-is-modded') === 'true') ? itemStatValue-5 : itemStatValue;
     $(this).attr('data-fate-base-light', baseLightLevel);
  });
}

fateBus.subscribe(module, 'fate.refresh', function() {
  storeModStatus();
  storeBaseLightLevel();
});
