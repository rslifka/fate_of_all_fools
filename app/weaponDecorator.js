const $ = require('jquery');
const weapon = require('weapon.js');
const weaponDatabase = require('weaponDatabase.js').weaponDB;
const rollDatabase = require('weaponRollDatabase.js').weaponRollDB;

const WEAPON_TYPES = [
  "Rifle",          // Scout, Pulse, Auto, Sniper
  "Cannon",         // Hand Cannon
  "Sidearm",
  "Bow",
  "Shotgun",
  "Launcher",       // Rocket, Grenade
  "Submachine Gun",
  "Sword"
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

    const isMasterwork = $(this).find('.item-img.masterwork').length > 0;
    $(this).attr('data-fate-masterwork', isMasterwork);

    const itemStatValue = $(this).find('.item-stat.item-equipment').text().match(/(\d+)/)[0];
    $(this).attr('data-fate-base-light', itemStatValue);

    $(this).attr('data-fate-serial', $(this).attr('id').split("-")[0]);

    if (!weaponDatabase.contains(weaponName)) {
      return;
    }

    $(this).attr('data-fate-weapon-rarity', weaponDatabase.get(weaponName).rarity);
    $(this).attr('data-fate-weapon-type', weaponDatabase.get(weaponName).type);
  });
}

function updateAttributes() {
  $('[data-fate-weapon-name]').each(function(index,element) {
    const weaponName = $(this).attr('data-fate-weapon-name');
    $(this).attr('data-fate-weapon-registered', weaponDatabase.contains(weaponName));
    $(this).attr('data-fate-roll-stored', rollDatabase.contains($(this).attr('data-fate-serial')));

    if (!$(this).is('[data-fate-weapon-registered="true"]')) {
      $(this).attr('data-fate-weapon-junk', false);
      $(this).attr('data-fate-weapon-pve', false);
      $(this).attr('data-fate-weapon-pvp', false);
      return;
    }

    const w = getRollOrWeapon($(this));
    $(this).attr('data-fate-comment', w.comments);
    $(this).attr('data-fate-weapon-junk', w.isJunk());
    $(this).attr('data-fate-weapon-pve', w.pveUtility === weapon.Utility.YES);
    $(this).attr('data-fate-weapon-pvp', w.pvpUtility === weapon.Utility.YES);
  });
}

function getRollOrWeapon($element) {
  if (rollDatabase.contains($element.attr('data-fate-serial'))) {
    return rollDatabase.get($element.attr('data-fate-serial'));
  }
  if (weaponDatabase.contains($element.attr('data-fate-weapon-name'))) {
    return weaponDatabase.get($element.attr('data-fate-weapon-name'));
  }
  return undefined;
};

fateBus.subscribe(module, 'fate.refresh', function() {
  storeWeaponData();
  updateAttributes();
});
