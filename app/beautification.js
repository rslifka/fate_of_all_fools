const $ = require('jquery');

fateBus.subscribe(module, 'fate.init', function() {
  GM_addStyle(GM_getResourceText('fateOfAllFoolsCSS'));
});

// Remove the subclass icons
fateBus.subscribe(module, 'fate.refresh', function() {
  // AFAIK this is a serial number that shouldn't change between versions...?
  $('.bucket-3284755031').parents('.store-row').attr('style', 'display:none');
});

// Remove the "Weapons" title bar
fateBus.subscribe(module, 'fate.refresh', function() {
  $('.inventory-title:contains("Weapons")').attr('style', 'display:none');
});
