const $ = require('jquery');
const armor = require('armor.js');
const armorDatabase = require('armorDatabase.js').armorDB;
const rollDatabase = require('armorRollDatabase.js').armorRollDB;

const ARMOR_TYPES = [
  "Helmet",
  "Gauntlets",
  "Chest Armor",
  "Leg Armor",
  "Warlock Bond",
  "Titan Mark",
  "Hunter Cloak",
]
const SEARCH_STRING = ARMOR_TYPES.map(type => "[title$=\'"+type+"\']").join(',');

function storeArmorData() {
  $(SEARCH_STRING).not('[data-fate-armor-init]').each(function(index,element) {
    // Don't mistake popups for gear (popups don't have carraige returns in them)
    if (!$(this).attr('title').includes("\n")) {
      return;
    }

    $(this).attr('data-fate-armor-init', true);

    const armorName = $(this).attr('title').split("\n")[0];
    $(this).attr('data-fate-armor-name', armorName);

    const isMasterwork = $(this).is('.masterwork');
    $(this).attr('data-fate-masterwork', isMasterwork);

    const itemStatValue = $(this).find('.item-stat.item-equipment').text().match(/(\d+)/)[0];
    $(this).attr('data-fate-base-light', itemStatValue);

    $(this).attr('data-fate-serial', $(this).attr('id').split("-")[0]);
  });
}

function updateAttributes() {
  $('[data-fate-armor-init=true]').each(function(index,element) {
    const name = $(this).attr('data-fate-armor-name');
    $(this).attr('data-fate-armor-registered', armorDatabase.contains(name));

    if (!armorDatabase.contains(name)) {
      $(this).removeAttr('data-fate-armor-keep');
      $(this).removeAttr('data-fate-armor-rarity');
      $(this).removeAttr('data-fate-comment');
      return;
    }

    $(this).attr('data-fate-armor-rarity', armorDatabase.get(name).rarity);

    const a = getRollOrArmor($(this));
    switch(a.keep) {
      case armor.Keep.YES:
        $(this).attr('data-fate-armor-keep', true);
        break;
      case armor.Keep.NO:
        $(this).attr('data-fate-armor-keep', false);
        break;
      default:
        $(this).removeAttr('data-fate-armor-keep');
    }

    $(this).attr('data-fate-comment', a.comments);
  });
}

function getRollOrArmor($element) {
  if (rollDatabase.contains($element.attr('data-fate-serial'))) {
    return rollDatabase.get($element.attr('data-fate-serial'));
  }
  if (armorDatabase.contains($element.attr('data-fate-armor-name'))) {
    return armorDatabase.get($element.attr('data-fate-armor-name'));
  }
  return undefined;
};

fateBus.subscribe(module, 'fate.refresh', function() {
  storeArmorData();
  updateAttributes();
});
