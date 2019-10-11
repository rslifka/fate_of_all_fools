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

    const isMasterwork = ($(this).has('._2kz8P').length + $(this).has('._3iMN1').length) > 0;
    $(this).attr('data-fate-masterwork', isMasterwork);

    const serialNumber = $(this).attr('id').split("-")[0];
    $(this).attr('data-fate-serial', serialNumber);
  });
}

function updateAttributes() {
  $('[data-fate-armor-init=true]').each(function(index,element) {
    const serialNumber = $(this).attr('data-fate-serial');

    const dimTags = $.map($(this).find('svg'), function(value, i) {
      return $(value).attr('data-icon');
    });
    $(this).attr('data-fate-dim-tags', dimTags.join(','));

    const isArmorRegistered = rollDatabase.contains(serialNumber);
    $(this).attr('data-fate-armor-registered', isArmorRegistered);
    
    if (!isArmorRegistered) {
      $(this).removeAttr('data-fate-comment');
      $(this).removeAttr('data-fate-mob');
      $(this).removeAttr('data-fate-res');
      $(this).removeAttr('data-fate-rec');
      $(this).removeAttr('data-fate-int');
      $(this).removeAttr('data-fate-dis');
      $(this).removeAttr('data-fate-str');
      $(this).removeAttr('data-fate-stats-total');
      return;
    }

    const a = rollDatabase.get(serialNumber);
    $(this).attr('data-fate-comment', a.comments);
    $(this).attr('data-fate-mob', a.mob);
    $(this).attr('data-fate-res', a.res);
    $(this).attr('data-fate-rec', a.rec);
    $(this).attr('data-fate-int', a.int);
    $(this).attr('data-fate-dis', a.dis);
    $(this).attr('data-fate-str', a.str);
    $(this).attr('data-fate-stats-total', a.total);
  });
}

fateBus.subscribe(module, 'fate.refresh', function() {
  storeArmorData();
  updateAttributes();
});
