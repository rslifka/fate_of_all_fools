describe('shaderStatusIndicator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
  });

  describe('in response to fate.refresh', function() {

    beforeEach(function() {
      loadFixtures(
        'shaders/arcticDreamscapeShader.html',
        'shaders/atlantisWashShader.html'
      );
    });

    describe('initialization', function() {
      it('should create placeholders for various indicators', function() {
        fateBus.publish(brunchModule, 'fate.refresh');
        expect($('[data-fate-shader-name]')).toContainElement('.fate-question-mark.fglyph-question-mark.fate-ignore-slot.fate-glyph');
        expect($('[data-fate-shader-name]')).toContainElement('.fate-fave.fglyph-fave.fate-ignore-slot.fate-glyph');
        expect($('[data-fate-shader-name]')).toContainElement('.fate-thumbs-down.fglyph-thumbs-down.fate-ignore-slot.fate-glyph');
      });
    });

  });

});
