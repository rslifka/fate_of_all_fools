const $ = require('jquery');
const shader = require('shader.js');
const shaderDatabase = require('shaderDatabase.js').shaderDB;

function storeShaderNames() {
  $('[title~=Shader]').not('[data-fate-shader-name]').each(function(index,element) {
    $(this).attr('data-fate-shader-name', $(this).attr('title').split("\n")[0]);
  });
}

function storeRegistrationStatus() {
  $('[data-fate-shader-name]').each(function(index,element) {
    const name = $(this).attr('data-fate-shader-name');
    $(this).attr('data-fate-shader-registered', shaderDatabase.contains(name));
  });
}

function storeKeepStatus() {
  $('[data-fate-shader-registered="true"]').each(function(index,element) {
    const s = shaderDatabase.get($(this).attr('data-fate-shader-name'));
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
  });
}

function storeComments() {
  $('[data-fate-shader-registered="true"]').each(function(index,element) {
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
