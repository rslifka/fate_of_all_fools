const $ = require('jquery');
const rollDatabase = require('weaponRollDatabase.js').weaponRollDB;
const Utility = require('weaponRollAssessment.js').Utility;
const elementDetector = require('elementDetector.js');

const POWER_LEVEL_CLASS  = '._7AyRH';
const ELEMENT_ICON_CLASS = '.g7Tk_';

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

      const weaponName = $(this).attr('title').split("\n")[0];
      $(this).attr('data-fate-weapon-name', weaponName);
  
      // Is it an exotic or legendary masterwork?
      const isMasterwork = ($(this).has('._2aTlr').length + $(this).has('._3kP4m').length) > 0;
      $(this).attr('data-fate-masterwork', isMasterwork);
  
      const serialNumber = $(this).attr('id').split("-")[0];
      $(this).attr('data-fate-serial', serialNumber);
  
      const light = $(this).find(POWER_LEVEL_CLASS).children('span').text();
      $(this).attr('data-fate-light', light);

      const elementIconSrc = $(this).find(ELEMENT_ICON_CLASS).attr('src');
      $(this).attr('data-fate-element', elementDetector.getElementFromURL(elementIconSrc));
    });
  });
}

function updateAttributes() {
  $('[data-fate-weapon-registered]').each(function(index,element) {
    const serialNumber = $(this).attr('data-fate-serial');

    const name = $(this).attr('data-fate-weapon-name')
    $(this).attr('title', name);

    const light = $(this).find(POWER_LEVEL_CLASS).children('span').text();
    $(this).attr('data-fate-light', light);

    const elementIconSrc = $(this).find(ELEMENT_ICON_CLASS).attr('src');
    $(this).attr('data-fate-element', elementDetector.getElementFromURL(elementIconSrc));

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
      $(this).attr('title', name);
      $(this).removeAttr('data-fate-comment');
      $(this).removeAttr('data-fate-weapon-junk');
      $(this).removeAttr('data-fate-weapon-pve');
      $(this).removeAttr('data-fate-weapon-pvp');
      return;
    }

    const w = rollDatabase.get(serialNumber);
    $(this).attr('data-fate-weapon-junk', w.pveUtility === Utility.NO && w.pvpUtility === Utility.NO);
    $(this).attr('data-fate-weapon-pve', w.pveUtility === Utility.YES);
    $(this).attr('data-fate-weapon-pvp', w.pvpUtility === Utility.YES);

    $(this).attr('data-fate-comment', w.comments);

    if (w.comments !== '') {
      $(this).attr('title', `${name}\n${w.comments}`);
    }
  });
}

fateBus.subscribe(module, 'fate.refresh', function() {
  storeWeaponData();
  updateAttributes();
});
