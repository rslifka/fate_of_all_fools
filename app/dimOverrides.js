const $ = require('jquery');
const logger = require('logger');
const postal = require('postal');

postal.subscribe({
	topic: 'fate.refresh',
	callback: function() {
    logger.log('dimOverrides.js (fate.refresh): Removing DIM tagging elements');
    $('[drag-channel=Kinetic],[drag-channel=Energy],[drag-channel=Power]').children('.item-tag').remove();
  }
});
