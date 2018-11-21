const $ = require('jquery');

fateBus.subscribe(module, 'fate.init', function() {
  GM_addStyle(GM_getResourceText('fateOfAllFoolsCSS'));
});

fateBus.subscribe(module, 'fate.refresh', function() {
  $('[title~="Subclass"]').parents('.store-row').siblings('.title:contains(Weapons)').siblings('.store-row:eq(0)').attr('style', 'display:none');
});
