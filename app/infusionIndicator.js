const $ = require('jquery');
const logger = require('logger.js');

fateBus.subscribe(module, 'fate.refresh', function() {
  logger.log('infusion.js: Calculating infusables');
  styleInfusionIndicators();
});

const WEAPON_BUCKETS = [
  'bucket-1498876634', // Primary
  'bucket-2465295065', // Secondary
  'bucket-953998645',  // Power
]

const ARMOR_BUCKETS = [
  'bucket-3448274439', // Helm
  'bucket-3551918588', // Gloves
  'bucket-14239492',   // Chest
  'bucket-20886954',   // Legs
  'bucket-1585787867', // Class
]

function styleInfusionIndicators() {
  
  WEAPON_BUCKETS.forEach(function(className) {
    const unregisteredItems = new Map();
    $('.'+className).find('[data-fate-weapon-registered="false"').each(function() {
      const itemName = $(this).attr('data-fate-weapon-name');
      const itemLight = parseInt($(this).attr('data-fate-light'));
      if (!unregisteredItems.has(itemName) || unregisteredItems.get(itemName) < itemLight) {
        unregisteredItems.set(itemName, itemLight);
      };
      $(this).attr('data-fate-infusable', false);
    });

    $('.'+className).find('[data-fate-weapon-registered="true"').each(function() {
      const itemName = $(this).attr('data-fate-weapon-name');
      const itemLight = parseInt($(this).attr('data-fate-light'));
      $(this).attr('data-fate-infusable', unregisteredItems.has(itemName) && unregisteredItems.get(itemName) > itemLight);
    });
  });

  ARMOR_BUCKETS.forEach(function(className) {
    const unregisteredItems = new Map();
    $('.'+className).find('[data-fate-armor-registered="false"').each(function() {
      const itemName = $(this).attr('data-fate-armor-name');
      const itemLight = parseInt($(this).attr('data-fate-light'));
      if (!unregisteredItems.has(itemName) || unregisteredItems.get(itemName) < itemLight) {
        unregisteredItems.set(itemName, itemLight);
      };
      $(this).attr('data-fate-infusable', false);
    });

    $('.'+className).find('[data-fate-armor-registered="true"').each(function() {
      const itemName = $(this).attr('data-fate-armor-name');
      const itemLight = parseInt($(this).attr('data-fate-light'));
      $(this).attr('data-fate-infusable', unregisteredItems.has(itemName) && unregisteredItems.get(itemName) > itemLight);
    });
  });
}
