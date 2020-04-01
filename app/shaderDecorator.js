const $ = require('jquery');
const shader = require('shader.js');
const shaderDatabase = require('shaderDatabase.js').shaderDB;

function updateAttributes() {
  $('.bucket-2973005342').find('.item').each(function() {
    const name = $(this).attr('title').split("\n")[0];
    $(this).attr('data-fate-shader-name', name);

    const isShaderRegistered = shaderDatabase.contains(name);
    $(this).attr('data-fate-shader-registered', isShaderRegistered);

    if (!isShaderRegistered) {
      $(this).removeAttr('data-fate-comment');
      $(this).removeAttr('data-fate-shader-keep');
      return
    }

    const s = shaderDatabase.get(name);
    switch(s.keepStatus) {
      case shader.Keep.YES:
        $(this).attr('data-fate-shader-keep', true);
        break;
      case shader.Keep.NO:
        $(this).attr('data-fate-shader-keep', false);
        break;
      case shader.Keep.UNKNOWN:
        $(this).attr('data-fate-shader-keep', 'unknown');
        break;
    }

    $(this).attr('data-fate-comment', s.comments);
  });
}

fateBus.subscribe(module, 'fate.refresh', function() {
  updateAttributes();
});
