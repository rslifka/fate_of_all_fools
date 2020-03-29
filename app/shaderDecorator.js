const $ = require('jquery');
const shader = require('shader.js');
const shaderDatabase = require('shaderDatabase.js').shaderDB;

function storeShaderData() {
  $('.bucket-2973005342').find('.item').not('[data-fate-shader-registered]').each(function() {
    $(this).attr('data-fate-shader-registered', false);

    $(this).attr('data-fate-shader-name', $(this).attr('title').split("\n")[0]);
  })
}

function updateAttributes() {
  $('[data-fate-shader-registered]').each(function(index,element) {
    const name = $(this).attr('data-fate-shader-name');

    const isShaderRegistered = shaderDatabase.contains(name);
    $(this).attr('data-fate-shader-registered', isShaderRegistered);

    if (!isShaderRegistered) {
      $(this).removeAttr('data-fate-comment');
      $(this).removeAttr('data-fate-shader-keep');
      $(this).attr('title', `${name}\nShader`)
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

    const title = (name + ((s.comments === '') ? ('') : (`\n${s.comments}`)));
    $(this).attr('title', title);
  });
}

fateBus.subscribe(module, 'fate.refresh', function() {
  storeShaderData();
  updateAttributes();
});
