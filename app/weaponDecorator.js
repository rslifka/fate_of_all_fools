const $ = require('jquery');
const weapon = require('weapon.js');
const weaponDatabase = require('weaponDatabase.js').weaponDB;
const rollDatabase = require('rollDatabase.js').rollDB;

function storeWeaponData() {
  $('[drag-channel=Kinetic],[drag-channel=Energy],[drag-channel=Power]').not('[data-fate-weapon-name]').each(function(index,element) {
    const weaponName = $(this).attr('title').split("\n")[0];
    $(this).attr('data-fate-weapon-name', weaponName);

    const isModInstalled = $(this).children('.item-img.complete').length > 0;
    $(this).attr('data-fate-is-modded', isModInstalled);

    const isMasterwork = $(this).children('.item-img.masterwork').length > 0;
    $(this).attr('data-fate-masterwork', isMasterwork);

    const itemStatValue = parseInt($(this).children('.item-stat.item-equipment').text().match(/(\d+)/));
    const baseLightLevel = isModInstalled ? itemStatValue-5 : itemStatValue;
    $(this).attr('data-fate-base-light', baseLightLevel);

    if (!weaponDatabase.contains(weaponName)) {
      return;
    }
    $(this).attr('data-fate-weapon-registered', true);
    $(this).attr('data-fate-serial', $(this).attr('id').split("-")[0]);
    $(this).attr('data-fate-weapon-rarity', weaponDatabase.get(weaponName).rarity);
    $(this).attr('data-fate-weapon-type', weaponDatabase.get(weaponName).type);
  });
}

function storeRegistrationStatus() {
  $('[data-fate-weapon-name]').each(function(index,element) {
    const weaponName = $(this).attr('data-fate-weapon-name');
    $(this).attr('data-fate-weapon-registered', weaponDatabase.contains(weaponName));
  });
}

function storeRollStatus() {
  $('[data-fate-weapon-registered="true"]').each(function(index,element) {
    $(this).attr('data-fate-roll-stored', rollDatabase.contains($(this).attr('data-fate-serial')));
  });
}

function storeJunkStatus() {
  $('[data-fate-weapon-registered="true"]').each(function(index,element) {
    if (rollDatabase.contains($(this).attr('data-fate-serial'))) {
      $(this).attr('data-fate-weapon-junk', rollDatabase.get($(this).attr('data-fate-serial')).isJunk());
    } else {
      $(this).attr('data-fate-weapon-junk', weaponDatabase.get($(this).attr('data-fate-weapon-name')).isJunk());
    }
  });
}

function storeJudgementStatus() {
  $('[data-fate-weapon-registered="true"]').each(function(index,element) {
    const w = getRoleOrWeapon($(this));
    if (w.pvpUtility === weapon.Utility.YES) {
      $(this).attr('data-fate-weapon-pvp', true);
    } else {
      $(this).removeAttr('data-fate-weapon-pvp');
    }
    if (w.pveUtility === weapon.Utility.YES) {
      $(this).attr('data-fate-weapon-pve', true);
    } else {
      $(this).removeAttr('data-fate-weapon-pve');
    }
  });
}

function storeComments() {
  $('[data-fate-weapon-registered="true"]').each(function(index,element) {
    $(this).attr('data-fate-comment', getRoleOrWeapon($(this)).comments);
  });
}

function getRoleOrWeapon($element) {
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
  storeRegistrationStatus();
  storeRollStatus();
  storeJudgementStatus();
  storeJunkStatus();
  storeComments();
});
