const postal = require('postal');

postal.subscribe({
	topic: 'fate.init',
	callback: function() {
    GM_addStyle(GM_getResourceText('fateOfAllFoolsCSS'));
  }
});
