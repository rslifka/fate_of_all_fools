const $ = require('jquery');

const ARMOR_TYPES = [
  "Helmet",
  "Gauntlets",
  "'Chest Armor'",
  "'Leg Armor'",
  "'Warlock Bond'",
  "'Titan Mark'",
  "'Hunter Cloak'",
]
const SEARCH_STRING = ARMOR_TYPES.map(type => "[title*="+type+"]").join(',');

function storeArmorData() {
  $(SEARCH_STRING).not('[data-fate-armor-init]').each(function(index,element) {
    $(this).attr('data-fate-armor-name', $(this).attr('title').split("\n")[0]);

    const isMasterwork = $(this).find('.item-img.masterwork').length > 0;
    $(this).attr('data-fate-masterwork', isMasterwork);

    const itemStatValue = $(this).find('.item-stat.item-equipment').text().match(/(\d+)/)[0];
    $(this).attr('data-fate-base-light', itemStatValue);

    $(this).attr('data-fate-serial', $(this).attr('id').split("-")[0]);

    $(this).attr('data-fate-armor-init', true);
  });
}

fateBus.subscribe(module, 'fate.refresh', function() {
  storeArmorData();
});
