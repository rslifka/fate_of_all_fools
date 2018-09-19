const $ = require('jquery');

fateBus.subscribe(module, 'fate.init', function() {
  GM_addStyle(GM_getResourceText('fateOfAllFoolsCSS'));
});

fateBus.subscribe(module, 'fate.refresh', function() {
  $('.item-img.diamond').parents('.store-row').attr('style', 'display:none');
});
