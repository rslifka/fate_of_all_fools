const $ = require('jquery');
const shader = require('shader.js');
const shaderDatabase = require('shaderDatabase.js').shaderDB;

function storeShaderNames() {
  $('[drag-channel=Shaders]').not('[data-fate-shader-name]').each(function(index,element) {
    $(this).attr('data-fate-shader-name', $(this).attr('title').split("\n")[0]);
  });
}

function storeRegistrationStatus() {
  $('[data-fate-shader-name]').each(function(index,element) {
    const name = $(this).attr('data-fate-shader-name');
    if (shaderDatabase.contains(name)) {
      $(this).attr('data-fate-shader-registered', true);
    }
  });
}

function storeKeepStatus() {
  $('[data-fate-shader-registered]').each(function(index,element) {
    const s = shaderDatabase.get($(this).attr('data-fate-shader-name'));
    if (s.keepStatus === shader.Keep.YES) {
      $(this).attr('data-fate-shader-keep', true);
    } else {
      $(this).removeAttr('data-fate-shader-keep');
    }
  });
}

function storeComments() {
  $('[data-fate-shader-registered]').each(function(index,element) {
    const s = shaderDatabase.get($(this).attr('data-fate-shader-name'));
    $(this).attr('data-fate-comment', s.comments);
  });
}

fateBus.subscribe(module, 'fate.refresh', function() {
  storeShaderNames();
  storeRegistrationStatus();
  storeKeepStatus();
  storeComments();
});
