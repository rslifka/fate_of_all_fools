const $ = require('jquery');
const weapon = require('weapon.js');
const weaponDatabase = require('weaponDatabase.js').weaponDB;
const rollDatabase = require('rollDatabase.js').rollDB;

function storeWeaponNames() {
  $('[drag-channel=Kinetic],[drag-channel=Energy],[drag-channel=Power]').not('[data-fate-weapon-name]').each(function(index,element) {
    $(this).attr('data-fate-weapon-name', $(this).attr('title').split("\n")[0]);
  });
}

function storeWeaponRarity() {
  $('[data-fate-weapon-name]').not('data-fate-weapon-rarity').each(function(index,element) {
    const weaponName = $(this).attr('data-fate-weapon-name');
    if (weaponDatabase.contains(weaponName)) {
      $(this).attr('data-fate-weapon-rarity', weaponDatabase.get(weaponName).rarity);
    }
  });
}

function storeWeaponType() {
  $('[data-fate-weapon-name]').not('data-fate-weapon-type').each(function(index,element) {
    const weaponName = $(this).attr('data-fate-weapon-name');
    if (weaponDatabase.contains(weaponName)) {
      $(this).attr('data-fate-weapon-type', weaponDatabase.get(weaponName).type);
    }
  });
}

function storeModStatus() {
  $('[drag-channel=Kinetic],[drag-channel=Energy],[drag-channel=Power]').each(function(index,element) {
    $(this).attr('data-fate-is-modded', $(this).children('.item-img.complete').length > 0);
  });
}

function storeBaseLightLevel() {
  $('[drag-channel=Kinetic],[drag-channel=Energy],[drag-channel=Power]').not('[data-fate-base-light]').each(function(index,element) {
     const itemStatValue = parseInt($(this).children('.item-stat').text().match(/(\d+)/));
     const baseLightLevel = ($(this).attr('data-fate-is-modded')==='true') ? itemStatValue-5 : itemStatValue;
     $(this).attr('data-fate-base-light', baseLightLevel);
  });
}

function storeRegistrationStatus() {
  $('[data-fate-weapon-name]').each(function(index,element) {
    const weaponName = $(this).attr('data-fate-weapon-name');
    if (weaponDatabase.contains(weaponName)) {
      $(this).attr('data-fate-weapon-registered', true);
    }
  });
}

function storeJunkStatus() {
  $('[data-fate-weapon-registered]').each(function(index,element) {
    if (rollDatabase.contains($(this).attr('data-fate-serial'))) {
      if (rollDatabase.get($(this).attr('data-fate-serial')).isJunk()) {
        $(this).attr('data-fate-weapon-junk', true);
      } else {
        $(this).removeAttr('data-fate-weapon-junk');
      }
    } else {
      if (weaponDatabase.get($(this).attr('data-fate-weapon-name')).isJunk()) {
        $(this).attr('data-fate-weapon-junk', true);
      } else {
        $(this).removeAttr('data-fate-weapon-junk');
      }
    }
  });
}

function storeJudgementStatus() {
  $('[data-fate-weapon-registered]').each(function(index,element) {
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

function storeSerialNumber() {
  $('[data-fate-weapon-registered]').not('[data-fate-serial]').each(function(index,element) {
    $(this).attr('data-fate-serial', $(this).attr('id').split("-")[0])
  });
}

function storeComments() {
  $('[data-fate-weapon-registered]').each(function(index,element) {
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
  storeWeaponNames();
  storeRegistrationStatus();
  storeSerialNumber();
  storeWeaponRarity();
  storeWeaponType();
  storeModStatus();
  storeBaseLightLevel();
  storeJudgementStatus();
  storeJunkStatus();
  storeComments();
});
