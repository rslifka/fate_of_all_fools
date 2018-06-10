const $ = require('jquery');
const logger = require('logger.js');
const weaponDatabase = require('weaponDatabase.js');

function prepareIgnoreSpace() {
  $('[data-fate-weapon-name],[data-fate-shader-name]').each(function(index,element) {
    if ($(this).children('.fate-ignore-slot.fate-glyph').length > 0) {
      return;
    }
    $(this).append($('<div>', {'class': 'fate-ignore-slot fate-glyph', 'style':'display:none'}));
  });
}

function placeIgnoreStatusWeapons() {
  $('[data-fate-weapon-name]').each(function(index,element) {
    const weaponName = $(this).attr('data-fate-weapon-name');
    $(this).children('.fate-ignore-slot').removeClass('fate-question-mark fglyph-question-mark fate-thumbs-down fglyph-thumbs-down');
    if (!weaponDatabase.contains(weaponName)) {
      $(this).children('.fate-ignore-slot').addClass('fate-question-mark fglyph-question-mark fate-middling');
      $(this).children('.fate-ignore-slot').show();
    } else if (weaponDatabase.get(weaponName).isJunk()) {
      $(this).children('.fate-ignore-slot').addClass('fate-thumbs-down fglyph-thumbs-down fate-middling');
      $(this).children('.fate-ignore-slot').show();
    } else {
      $(this).children('.fate-ignore-slot').hide();
    }
  });
}

function placeIgnoreStatusShaders() {
  $('[data-fate-shader-name]').each(function(index,element) {
    const shaderName = $(this).attr('data-fate-shader-name');
    $(this).children('.fate-ignore-slot').removeClass('fate-question-mark fglyph-question-mark fate-thumbs-down fglyph-thumbs-down');
    if (!weaponDatabase.contains(shaderName)) {
      $(this).children('.fate-ignore-slot').addClass('fate-question-mark fglyph-question-mark fate-middling');
      $(this).children('.fate-ignore-slot').show();
    } else if (weaponDatabase.get(shaderName).isJunk()) {
      $(this).children('.fate-ignore-slot').addClass('fate-thumbs-down fglyph-thumbs-down fate-middling');
      $(this).children('.fate-ignore-slot').show();
    } else {
      $(this).children('.fate-ignore-slot').hide();
    }
  });
}

fateBus.subscribe(module, 'fate.refresh', function() {
  logger.log('ignoreStatusIndicator.js: Calculating ignore status');
  prepareIgnoreSpace();
  placeIgnoreStatusWeapons();
  placeIgnoreStatusShaders();
});
