const $ = require('jquery');
const rollDatabase = require('weaponRollDatabase.js').weaponRollDB;
const Utility = require('weaponRollAssessment.js').Utility;

const WEAPON_TYPES = [
  "Auto Rifle",
  "Combat Bow",
  "Fusion Rifle",
  "Grenade Launcher",
  "Hand Cannon",       
  "Machine Gun",
  "Pulse Rifle",
  "Rocket Launcher",
  "Scout Rifle",
  "Shotgun",
  "Sidearm",
  "Sniper Rifle",
  "Submachine Gun",
  "Sword",
  "Trace Rifle"
]
const SEARCH_STRING = WEAPON_TYPES.map(type => "[title$=\'"+type+"\']").join(',');

function storeWeaponData() {
  $(SEARCH_STRING).not('[data-fate-weapon-name]').each(function(index,element) {

    // We need to exclude trying to treat the weapon detail popup as something to be decorated
    if (!$(this).attr('title').includes("\n")) {
      return;
    }

    const weaponName = $(this).attr('title').split("\n")[0];
    $(this).attr('data-fate-weapon-name', weaponName);

    const isMasterwork = $(this).is('.masterwork');
    $(this).attr('data-fate-masterwork', isMasterwork);

    const serialNumber = $(this).attr('id').split("-")[0];
    $(this).attr('data-fate-serial', serialNumber);
  });
}

function updateAttributes() {
  $('[data-fate-weapon-name]').each(function(index,element) {
    const serialNumber = $(this).attr('data-fate-serial');

    const dimTags = $.map($(this).find('svg'), function(value, i) {
      return $(value).attr('data-icon');
    });
    $(this).attr('data-fate-dim-tags', dimTags.join(','));

    const isWeaponRegistered = rollDatabase.contains(serialNumber);
    $(this).attr('data-fate-weapon-registered', isWeaponRegistered);

    if (!isWeaponRegistered) {
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
