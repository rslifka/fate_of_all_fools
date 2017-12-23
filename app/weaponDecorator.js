const $ = require('jquery');
const weaponDatabase = require('weaponDatabase.js');

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
  $('[drag-channel=Kinetic],[drag-channel=Energy],[drag-channel=Power]').each(function(index,element) {
     const itemStatValue = parseInt($(this).children('.item-stat').text().match(/(\d+)/));
     const baseLightLevel = ($(this).children('.item-img.complete').length > 0) ? itemStatValue-5 : itemStatValue;
     $(this).attr('data-fate-base-light', baseLightLevel);
  });
}

function storeRegistrationStatus() {
  $('[data-fate-weapon-name]').each(function(index,element) {
    const weaponName = $(this).attr('data-fate-weapon-name');
    if (weaponDatabase.contains(weaponName)) {
      $(this).attr('data-fate-weapon-registered', true);
    } else {
    }
  });
}

fateBus.subscribe(module, 'fate.refresh', function() {
  storeWeaponNames();
  storeWeaponRarity();
  storeWeaponType();
  storeModStatus();
  storeBaseLightLevel();
  storeRegistrationStatus();
});
