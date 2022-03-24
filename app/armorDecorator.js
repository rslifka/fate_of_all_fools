const $ = require('jquery');
const rollDatabase = require('armorRollDatabase.js').armorRollDB;
const Utility = require('armorRoll.js').Utility;
const elementDetector = require('elementDetector.js');
const volatiles = require('dimVolatileClasses.js').VOLATILE_CLASSES;

const ARMOR_BUCKETS = [
  'bucket-3448274439', // Helm
  'bucket-3551918588', // Gloves
  'bucket-14239492',   // Chest
  'bucket-20886954',   // Legs
  'bucket-1585787867', // Class
]

function storeArmorData() {
  ARMOR_BUCKETS.forEach(function(className) {
    $('.'+className).find('.item').not('[data-fate-armor-registered]').each(function() {
      $(this).attr('data-fate-armor-registered', false);

      const serialNumber = $(this).attr('id').split("-")[0];
      $(this).attr('data-fate-serial', serialNumber);

      const itemName = $(this).attr('title').split("\n")[0];
      $(this).attr('data-fate-item-name', itemName);
    });
  });
}

function updateAttributes() {
  $('[data-fate-armor-registered]').each(function(index,element) {
    const serialNumber = $(this).attr('data-fate-serial');

    const isMasterwork = $(this).has(volatiles.MASTERWORK_CLASS).length > 0;
    $(this).attr('data-fate-masterwork', isMasterwork);

    const light = $(this).find(volatiles.POWER_LEVEL_CLASS).children('span:not(' + volatiles.ARMOR_SPAN_AVOID_CLASS + ')').text();
    $(this).attr('data-fate-light', light);

    // It would be ideal to put this in the one-time-init section above since
    // elements don't change, but we need to give time to the element detection
    // code to wake up.
    if (!$(this).is('[data-fate-element]')) {
      const elementIconSrc = $(this).find(volatiles.ELEMENT_ICON_CLASS).attr('src');
      if (elementIconSrc === undefined) {
        $(this).attr('data-fate-element', 'kinetic');
      } else {
        $(this).attr('data-fate-element', elementDetector.getElementFromURL(elementIconSrc));
      }
    }

    const dimTags = $.map($(this).find('span.app-icon'), function(value, i) {
      const className = $(value).attr('class').split(' ').filter(function(cname) {
        return cname.startsWith('fa-');
      })[0];
      return className.replace('fa-', '');
    });

    const dimJunk = dimTags.includes('ban');
    $(this).attr('data-fate-dimtag-junk', dimJunk);

    const dimArchive = dimTags.includes('archive');
    $(this).attr('data-fate-dimtag-archive', dimArchive);

    const dimKeep = dimTags.includes('tag');
    $(this).attr('data-fate-dimtag-keep', dimKeep);

    const dimFavourite = dimTags.includes('heart');
    $(this).attr('data-fate-dimtag-favourite', dimFavourite);

    const isArmorRegistered = rollDatabase.contains(serialNumber);
    $(this).attr('data-fate-armor-registered', isArmorRegistered);
    
    if (!isArmorRegistered) {
      $(this).removeAttr('data-fate-armor-junk');
      $(this).removeAttr('data-fate-armor-pve');
      $(this).removeAttr('data-fate-armor-pvp');
      return;
    }

    const a = rollDatabase.get(serialNumber);
    $(this).attr('data-fate-armor-junk', a.pveUtility === Utility.NO && a.pvpUtility === Utility.NO);
    $(this).attr('data-fate-armor-pve', a.pveUtility === Utility.YES);
    $(this).attr('data-fate-armor-pvp', a.pvpUtility === Utility.YES);

    const $itemOverlay = $(this).find('.foaf-item-overlay');
    if ($itemOverlay.text() != a.overlay) {
      $(this).find('.foaf-item-overlay').text(a.overlay);
    }
  });
}

fateBus.subscribe(module, 'fate.refresh', function() {
  storeArmorData();
  updateAttributes();
});
