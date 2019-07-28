const $ = require('jquery');

fateBus.subscribe(module, 'fate.init', function() {
  GM_addStyle(GM_getResourceText('fateOfAllFoolsCSS'));
});

fateBus.subscribe(module, 'fate.refresh', function() {
  // Remove the subclass icons
  $('.bucket-3284755031').parents('.store-row').each(function(index, element) {
    if ($(this).attr('style') != 'display:none') {
      $(this).attr('style', 'display:none');
    }
  });

  // Remove the weapons bar
  $('.inventory-title:contains("Weapons")').each(function(index, element) {
    if ($(this).attr('style') != 'display:none') {
      $(this).attr('style', 'display:none');
    }
  });
});
