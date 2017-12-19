fateBus.subscribe(module, {
	topic: 'fate.init',
	callback: function() {
    GM_addStyle(GM_getResourceText('fateOfAllFoolsCSS'));
  }
});
