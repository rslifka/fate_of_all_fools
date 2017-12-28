const $ = require('jquery');
const logger = require('logger');

function removeDimTags() {
  $('[drag-channel=Kinetic],[drag-channel=Energy],[drag-channel=Power],[drag-channel=Helmet],[drag-channel=Gauntlets],[drag-channel=Chest],[drag-channel=Leg],[drag-channel=ClassItem]').children('.item-tag').remove();
}

fateBus.subscribe(module, 'fate.refresh', function() {
  logger.log('dimEraser.js: Removing DIM elements');
  removeDimTags();
});
