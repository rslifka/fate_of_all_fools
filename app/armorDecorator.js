const $ = require('jquery');

function storeArmorName() {
  $('[drag-channel=Helmet],[drag-channel=Gauntlets],[drag-channel=Chest],[drag-channel=Leg],[drag-channel=ClassItem]').not('[data-fate-armor-name]').each(function(index,element) {
    $(this).attr('data-fate-armor-name', $(this).attr('title').split("\n")[0]);
  });
}

function storeBaseLightLevel() {
  $('[drag-channel=Helmet],[drag-channel=Gauntlets],[drag-channel=Chest],[drag-channel=Leg],[drag-channel=ClassItem]').not('[data-fate-base-light]').each(function(index,element) {
     const itemStatValue = parseInt($(this).children('.item-stat').text().match(/(\d+)/));
     $(this).attr('data-fate-base-light', itemStatValue);
  });
}

function storeSerialNumber() {
  $('[drag-channel=Helmet],[drag-channel=Gauntlets],[drag-channel=Chest],[drag-channel=Leg],[drag-channel=ClassItem]').not('[data-fate-serial]').each(function(index,element) {
    $(this).attr('data-fate-serial', $(this).attr('id').split("-")[0])
  });
}

function storeMasterwork() {
  $('[drag-channel=Helmet],[drag-channel=Gauntlets],[drag-channel=Chest],[drag-channel=Leg],[drag-channel=ClassItem]').each(function(index,element) {
    const isMasterwork = $(this).children('.item-img.masterwork').length > 0;
    $(this).attr('data-fate-masterwork', isMasterwork);
  });
}

fateBus.subscribe(module, 'fate.refresh', function() {
  storeArmorName();
  storeBaseLightLevel();
  storeSerialNumber();
  storeMasterwork();
});
