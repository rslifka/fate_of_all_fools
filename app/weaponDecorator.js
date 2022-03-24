const $ = require('jquery');
const rollDatabase = require('weaponRollDatabase.js').weaponRollDB;
const Utility = require('weaponRollAssessment.js').Utility;
const elementDetector = require('elementDetector.js');
const volatiles = require('dimVolatileClasses.js').VOLATILE_CLASSES;

const WEAPON_BUCKETS = [
  'bucket-1498876634', // Kinetic
  'bucket-2465295065', // Energy
  'bucket-953998645',  // Power
  'bucket-215593132',  // Postmaster
]

function storeWeaponData() {
  WEAPON_BUCKETS.forEach(function(className) {
    $('.'+className).find('.item').not('[data-fate-weapon-registered]').each(function() {
      $(this).attr('data-fate-weapon-registered', false);

      const serialNumber = $(this).attr('id').split("-")[0];
      $(this).attr('data-fate-serial', serialNumber);

      // Infusion indicator is based off the name of the item
      const infusionName = $(this).attr('title').split("\n")[0];
      $(this).attr('data-fate-infusion-name', infusionName);
    });
  });
}

function updateAttributes() {
  $('[data-fate-weapon-registered]').each(function(index,element) {
    const serialNumber = $(this).attr('data-fate-serial');

    const light = $(this).find(volatiles.POWER_LEVEL_CLASS).children('span').text();
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

    const isMasterwork = $(this).has(volatiles.MASTERWORK_CLASS).length > 0;
    $(this).attr('data-fate-masterwork', isMasterwork);

    const isDeepsight = $(this).has(volatiles.DEEPSIGHT_BORDER_CLASS).length > 0;
    $(this).attr('data-fate-deepsight', isDeepsight);

    const isAttuned = $(this).has(volatiles.ATTTUNEMENT_COMPLETE_CLASS).length > 0;
    $(this).attr('data-fate-attuned', isAttuned);

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

    const dimInfuse = dimTags.includes('bolt');
    $(this).attr('data-fate-dimtag-infuse', dimInfuse);

    let wishlistStatus = 'not-registered';
    if (dimTags.includes('thumbs-up')) {
      wishlistStatus = 'accepted';
    } else if (dimTags.includes('thumbs-down')) {
      wishlistStatus = 'rejected';
    }
    $(this).attr('data-fate-wishlist-status', wishlistStatus);

    const isWeaponRegistered = rollDatabase.contains(serialNumber);
    $(this).attr('data-fate-weapon-registered', isWeaponRegistered);

    if (!isWeaponRegistered) {
      $(this).removeAttr('data-fate-weapon-junk');
      $(this).removeAttr('data-fate-weapon-pve');
      $(this).removeAttr('data-fate-weapon-pvp');
      return;
    }

    const w = rollDatabase.get(serialNumber);
    $(this).attr('data-fate-weapon-junk', w.pveUtility === Utility.NO && w.pvpUtility === Utility.NO);
    $(this).attr('data-fate-weapon-pve', w.pveUtility === Utility.YES);
    $(this).attr('data-fate-weapon-pvp', w.pvpUtility === Utility.YES);
  });
}

fateBus.subscribe(module, 'fate.refresh', function() {
  storeWeaponData();
  updateAttributes();
});
