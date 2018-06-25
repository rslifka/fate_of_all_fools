describe('shaderDatabase.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};
  const shaderDatabase = require('shaderDatabase.js').shaderDB;

  beforeEach(function() {
    // The module receiving the publication is the parent class
    fateBus.unmute('itemDatabase.js');

    fateBus.registerModule(brunchModule);
    fateBus.publish(brunchModule, 'fate.shaderDataFetched', 'Arctic Dreamscape\tY\tAwesome Warmind Bray pattern!');
  });

  describe('in response to fate.shaderDataFetched', function() {

    describe('#contains', function() {
      describe('when the shader is in the database', function() {
        it('should be true', function() {
          expect(shaderDatabase.contains('Arctic Dreamscape')).toBe(true);
        });
      });
    });

    describe('#get', function() {
      describe('when the weapon is found', function() {
        it('should return the weapon', function() {
          const shader = require('shader.js');
          const arcticDreamscape = shaderDatabase.get('Arctic Dreamscape');

          expect(arcticDreamscape).toEqual(jasmine.any(shader.Shader));
          expect(arcticDreamscape.name).toEqual('Arctic Dreamscape');
          expect(arcticDreamscape.keep).toEqual(shader.Keep.YES);
          expect(arcticDreamscape.comments).toEqual('Awesome Warmind Bray pattern!');
        });
      });
    });

  });

});
