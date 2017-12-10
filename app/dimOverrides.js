const $ = require('jquery');
const postal = require('postal');

postal.subscribe({
	topic: 'fate.refresh',
	callback: function() {
    $('[drag-channel=Kinetic],[drag-channel=Energy],[drag-channel=Power]').children('.item-tag').remove();
  }
});
