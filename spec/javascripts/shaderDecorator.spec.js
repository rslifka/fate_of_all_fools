describe('shaderDecorator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};
  const shader = require('shader.js');
  const shaderDatabase = require('shaderDatabase').shaderDB;

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
  });

  beforeEach(function() {
    loadFixtures(
      'shaders/arcticDreamscapeShaderRaw.html',
      'shaders/atlantisWashShaderRaw.html',
      'shaders/metallicSunriseShaderRaw.html'
    );
    spyOn(shaderDatabase, 'contains').and.callFake(function(name) {
      return ['Arctic Dreamscape','Atlantis Wash'].includes(name);
    });
    spyOn(shaderDatabase, 'get').and.callFake(function(name) {
      switch(name) {
        case 'Arctic Dreamscape':
          return {name: 'Arctic Dreamscape', keepStatus:shader.Keep.YES, comments: 'Cool winter camo!'};
        case 'Atlantis Wash':
          return {name: 'Atlantis Wash', keepStatus:shader.Keep.NO, comments: 'Titan vomitorium :('};
      }
    });
    fateBus.publish(brunchModule, 'fate.refresh');
  })

  describe('in response to fate.refresh', function() {
    it('should store the original shader name', function() {
      expect($('[data-fate-shader-name="Arctic Dreamscape"]')).toExist();
      expect($('[data-fate-shader-name="Atlantis Wash"]')).toExist();
      expect($('[data-fate-shader-name="Metallic Sunrise"]')).toExist();
    });
    it('should store if the shader is registered', function() {
      expect($('[data-fate-shader-name="Arctic Dreamscape"]')).toHaveAttr('data-fate-shader-registered', 'true');
      expect($('[data-fate-shader-name="Atlantis Wash"]')).toHaveAttr('data-fate-shader-registered', 'true');
      expect($('[data-fate-shader-name="Metallic Sunrise"]')).not.toHaveAttr('data-fate-shader-registered');
    });
    it('should store if we should keep the shader', function() {
      expect($('[data-fate-shader-name="Arctic Dreamscape"]')).toHaveAttr('data-fate-shader-keep', 'true');
      expect($('[data-fate-shader-name="Atlantis Wash"]')).toHaveAttr('data-fate-shader-keep', 'false');
      expect($('[data-fate-shader-name="Metallic Sunrise"]')).not.toHaveAttr('data-fate-shader-keep');
    });
    it('should store the comments', function() {
      expect($('[data-fate-shader-name="Arctic Dreamscape"]')).toHaveAttr('data-fate-comment', 'Cool winter camo!');
      expect($('[data-fate-shader-name="Atlantis Wash"]')).toHaveAttr('data-fate-comment', 'Titan vomitorium :(');
      expect($('[data-fate-shader-name="Metallic Sunrise"]')).not.toHaveAttr('data-fate-comment');
    });
  });

  describe('on subsequent refreshes', function() {
    it('should not overwrite the original shader name' , function() {
      $('[drag-channel=Shaders]').attr('title', '_');
      fateBus.publish(brunchModule, 'fate.refresh');
      expect($('[drag-channel=Shaders]')).toHaveAttr('data-fate-shader-name', 'Arctic Dreamscape');
    });
  });

});
