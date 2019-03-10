const $ = require('jquery');
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

    const serialNumber = $(this).attr('id').split("-")[0];
    $(this).attr('data-fate-serial', serialNumber);
  });
}

function updateAttributes() {
  $('[data-fate-armor-init=true]').each(function(index,element) {
    const serialNumber = $(this).attr('data-fate-serial');
    const armorRoll = rollDatabase.get(serialNumber);
    const isRegistered = (armorRoll != undefined);

    $(this).attr('data-fate-armor-registered', isRegistered);

    if (isRegistered) {
      $(this).attr('data-fate-comment', armorRoll.comments);
    } else {
      $(this).removeAttr('data-fate-comment');
    }
  });
}

fateBus.subscribe(module, 'fate.refresh', function() {
  storeArmorData();
  updateAttributes();
});
