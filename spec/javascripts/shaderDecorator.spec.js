describe('shaderDecorator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};
  const shader = require('shader.js');
  const shaderDatabase = require('shaderDatabase').shaderDB;

  const KEEP_SHADER_NAME = 'New Age Black Armory';
  const NO_KEEP_SHADER_NAME = 'Vitrified Chronology';
  const NO_COMMENTS_NAME = 'Crucible Metallic';

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
  });

  beforeEach(function() {
    loadFixtures(
      'entireDocumentRaw-6.2.0.html'
    );
    spyOn(shaderDatabase, 'contains').and.callFake(function(name) {
      // "Registering" one from inventory and one the from vault
      return [KEEP_SHADER_NAME, NO_KEEP_SHADER_NAME, NO_COMMENTS_NAME].includes(name);
    });
    spyOn(shaderDatabase, 'get').and.callFake(function(name) {
      switch(name) {
        case KEEP_SHADER_NAME:
          return {name: KEEP_SHADER_NAME, keepStatus:shader.Keep.YES, comments: 'Cool winter camo!'};
        case NO_KEEP_SHADER_NAME:
          return {name: NO_KEEP_SHADER_NAME, keepStatus:shader.Keep.NO, comments: 'Titan vomitorium :('};
        case NO_COMMENTS_NAME:
          return {name: NO_KEEP_SHADER_NAME, keepStatus:shader.Keep.NO, comments: ''};
      }
    });
    fateBus.publish(brunchModule, 'fate.refresh');
  })

  describe('in response to fate.refresh', function() {

    it('should store the original shader name', function() {
      expect($('[data-fate-shader-name="'+KEEP_SHADER_NAME+'"]')).toExist();
      expect($('[data-fate-shader-name="'+NO_KEEP_SHADER_NAME+'"]')).toExist();
      expect($('[data-fate-shader-name="Crucible Vermillion"]')).toExist();
      expect($('[data-fate-shader-name="Iron Oxide"]')).toExist();
    });

    it('should store if the shader is registered', function() {
      expect($('[data-fate-shader-name="'+KEEP_SHADER_NAME+'"]')).toHaveAttr('data-fate-shader-registered', 'true');
      expect($('[data-fate-shader-name="'+NO_KEEP_SHADER_NAME+'"]')).toHaveAttr('data-fate-shader-registered', 'true');
      expect($('[data-fate-shader-name="Crucible Vermillion"]')).toHaveAttr('data-fate-shader-registered', 'false');
      expect($('[data-fate-shader-name="Iron Oxide"]')).toHaveAttr('data-fate-shader-registered', 'false');
    });

    it('should store if we should keep the shader', function() {
      expect($('[data-fate-shader-name="'+KEEP_SHADER_NAME+'"]')).toHaveAttr('data-fate-shader-keep', 'true');
      expect($('[data-fate-shader-name="'+NO_KEEP_SHADER_NAME+'"]')).toHaveAttr('data-fate-shader-keep', 'false');
    });

    it('should store the comments', function() {
      expect($('[data-fate-shader-name="'+KEEP_SHADER_NAME+'"]')).toHaveAttr('data-fate-comment', 'Cool winter camo!');
      expect($('[data-fate-shader-name="'+NO_KEEP_SHADER_NAME+'"]')).toHaveAttr('data-fate-comment', 'Titan vomitorium :(');
    });

  });

});
