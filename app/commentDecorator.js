const $ = require('jquery');
const logger = require('logger');

function updateTitles() {
  logger.log('commentDecorator.js: Updating tooltips');

  $('[data-fate-weapon-registered=true]').each(function(index,element) {
    const name = $(this).attr('data-fate-weapon-name');
    const type = $(this).attr('data-fate-weapon-type');
    const comments = $(this).attr('data-fate-comment');
    $(this).attr('title',name + ' // ' + type + '\n' + comments);
  });

  $('[data-fate-shader-registered=true]').each(function(index,element) {
    const name = $(this).attr('data-fate-shader-name');
    const comments = $(this).attr('data-fate-comment');
    $(this).attr('title',name + '\n' + comments);
  });

}

fateBus.subscribe(module, 'fate.refresh', updateTitles);
