const $ = require('jquery');

function storeArmorName() {
  $('[drag-channel=Helmet],[drag-channel=Gauntlets],[drag-channel=Chest],[drag-channel=Leg],[drag-channel=ClassItem]').not('[data-fate-armor-name]').each(function(index,element) {
    $(this).attr('data-fate-armor-name', $(this).attr('title').split("\n")[0]);
  });
}

function storeBaseLightLevel() {
  $('[drag-channel=Helmet],[drag-channel=Gauntlets],[drag-channel=Chest],[drag-channel=Leg],[drag-channel=ClassItem]').not('[data-fate-base-light]').each(function(index,element) {
     const itemStatValue = parseInt($(this).children('.item-stat').text().match(/(\d+)/));
     const baseLightLevel = ($(this).attr('data-fate-is-modded') === 'true') ? itemStatValue-5 : itemStatValue;
     $(this).attr('data-fate-base-light', baseLightLevel);
  });
}

function storeModStatus() {
  $('[drag-channel=Helmet],[drag-channel=Gauntlets],[drag-channel=Chest],[drag-channel=Leg],[drag-channel=ClassItem]').each(function(index,element) {
    $(this).attr('data-fate-is-modded', $(this).children('.item-img.complete').length > 0);
  });
}

function storeSerialNumber() {
  $('[drag-channel=Helmet],[drag-channel=Gauntlets],[drag-channel=Chest],[drag-channel=Leg],[drag-channel=ClassItem]').not('[data-fate-serial]').each(function(index,element) {
    $(this).attr('data-fate-serial', $(this).attr('id').split("-")[0])
  });
}

fateBus.subscribe(module, 'fate.refresh', function() {
  storeArmorName();
  storeModStatus();
  storeBaseLightLevel();
  storeSerialNumber();
});
