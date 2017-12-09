const $ = require('jquery');
const postal = require('postal');

postal.subscribe({
	topic: 'foaf.refresh',
	callback: function() {
    $('[drag-channel=Kinetic],[drag-channel=Energy],[drag-channel=Power]').children('.item-tag').remove();
  }
});
