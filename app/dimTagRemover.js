const $ = require('jquery');
const logger = require('logger');
const postal = require('postal');

postal.subscribe({
	topic: 'fate.refresh',
	callback: function() {
    logger.log('dimOverrides.js (fate.refresh): Removing DIM tagging elements');
    $('[drag-channel=Kinetic],[drag-channel=Energy],[drag-channel=Power],[drag-channel=Helmet],[drag-channel=Gauntlets],[drag-channel=Chest],[drag-channel=Leg],[drag-channel=ClassItem]').children('.item-tag').remove();
  }
});
