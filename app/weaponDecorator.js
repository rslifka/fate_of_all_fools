const $ = require('jquery');
const rollDatabase = require('weaponRollDatabase.js').weaponRollDB;
const Utility = require('weaponRollAssessment.js').Utility;

const WEAPON_BUCKETS = [
  'bucket-1498876634', // Kinetic
  'bucket-2465295065', // Energy
  'bucket-953998645',  // Power
]

function storeWeaponData() {
  WEAPON_BUCKETS.forEach(function(className) {
    $('.'+className).find('.item').not('[data-fate-weapon-registered]').each(function() {
      $(this).attr('data-fate-weapon-registered', false);

      const weaponName = $(this).attr('title').split("\n")[0];
      $(this).attr('data-fate-weapon-name', weaponName);
  
      // Is it an exotic or legendary masterwork?
      const isMasterwork = ($(this).has('._2kz8P').length + $(this).has('._3iMN1').length) > 0;
      $(this).attr('data-fate-masterwork', isMasterwork);
  
      const serialNumber = $(this).attr('id').split("-")[0];
      $(this).attr('data-fate-serial', serialNumber);
  
      const light = $(this).find('.AtD93').children('span').text();
      $(this).attr('data-fate-light', light);
    });
  });
}

function updateAttributes() {
  $('[data-fate-weapon-registered]').each(function(index,element) {
    const serialNumber = $(this).attr('data-fate-serial');

    const dimTags = $.map($(this).find('svg'), function(value, i) {
      return $(value).attr('data-icon');
    });

    const dimJunk = dimTags.includes('ban');
    $(this).attr('data-fate-dimtag-junk', dimJunk);

    const dimArchive = dimTags.includes('archive');
    $(this).attr('data-fate-dimtag-archive', dimArchive);

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
      $(this).removeAttr('data-fate-comment');
      $(this).removeAttr('data-fate-weapon-junk');
      $(this).removeAttr('data-fate-weapon-pve');
      $(this).removeAttr('data-fate-weapon-pvp');
      return;
    }

    const w = rollDatabase.get(serialNumber);
    $(this).attr('data-fate-comment', w.comments);
    $(this).attr('data-fate-weapon-junk', w.pveUtility === Utility.NO && w.pvpUtility === Utility.NO);
    $(this).attr('data-fate-weapon-pve', w.pveUtility === Utility.YES);
    $(this).attr('data-fate-weapon-pvp', w.pvpUtility === Utility.YES);
  });
}

fateBus.subscribe(module, 'fate.refresh', function() {
  storeWeaponData();
  updateAttributes();
});
