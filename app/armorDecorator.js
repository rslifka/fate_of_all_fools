const $ = require('jquery');
const rollDatabase = require('armorRollDatabase.js').armorRollDB;
const Utility = require('armorRoll.js').Utility;

const ARMOR_BUCKETS = [
  'bucket-3448274439', // Helm
  'bucket-3551918588', // Gloves
  'bucket-14239492',   // Chest
  'bucket-20886954',   // Legs
  'bucket-1585787867', // Class
]

const POWER_LEVEL_CLASS = '._7AyRH';

function storeArmorData() {
  ARMOR_BUCKETS.forEach(function(className) {
    $('.'+className).find('.item').not('[data-fate-armor-registered]').each(function() {
      $(this).attr('data-fate-armor-registered', false);

      const armorName = $(this).attr('title').split("\n")[0];
      $(this).attr('data-fate-armor-name', armorName);
      
      // Is it an exotic or legendary masterwork?
      const isMasterwork = $(this).has('._3iMN1').length > 0;
      $(this).attr('data-fate-masterwork', isMasterwork);

      const serialNumber = $(this).attr('id').split("-")[0];
      $(this).attr('data-fate-serial', serialNumber);

      const light = $(this).find(POWER_LEVEL_CLASS).children('span').text();
      $(this).attr('data-fate-light', light);
    });
  });
}

function updateAttributes() {
  $('[data-fate-armor-registered]').each(function(index,element) {
    const serialNumber = $(this).attr('data-fate-serial');

    const name = $(this).attr('data-fate-armor-name')
    $(this).attr('title', name);

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
    
    const light = $(this).find(POWER_LEVEL_CLASS).children('span').text();
    $(this).attr('data-fate-light', light);

    if (!isArmorRegistered) {
      $(this).attr('title', name);
      $(this).removeAttr('data-fate-armor-junk');
      $(this).removeAttr('data-fate-armor-pve');
      $(this).removeAttr('data-fate-armor-pvp');
      return;
    }

    const a = rollDatabase.get(serialNumber);
    $(this).attr('data-fate-armor-junk', a.pveUtility === Utility.NO && a.pvpUtility === Utility.NO);
    $(this).attr('data-fate-armor-pve', a.pveUtility === Utility.YES);
    $(this).attr('data-fate-armor-pvp', a.pvpUtility === Utility.YES);
    $(this).attr('data-fate-element', a.element);

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
