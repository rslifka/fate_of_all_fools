describe('elementDetector.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};
  const elementDetector = require('elementDetector.js');

  const ARC_DAMAGE_ICON = 'https://www.bungie.net/common/destiny2_content/icons/DestinyDamageTypeDefinition_2a1773e10968f2d088b97c22b22bba9e.png';
  const SOLAR_DAMAGE_ICON = 'https://www.bungie.net/common/destiny2_content/icons/DestinyDamageTypeDefinition_2a1773e10968f2d088b97c22b22bba9e.png';
  const VOID_DAMAGE_ICON = 'https://www.bungie.net/common/destiny2_content/icons/DestinyDamageTypeDefinition_ceb2f6197dccf3958bb31cc783eb97a0.png';

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
  });

  describe('in response to fate.refresh', function() {

    beforeEach(function() {
      loadFixtures(
        'entireDocumentRaw-6.37.2.html',
      );
      fateBus.publish(brunchModule, 'fate.refresh');
    });

    describe('color setting', function() {
      it('should set the colors', function() {
        // TODO Goodness is this hacky; tighten it up
        setTimeout(function() {
          expect(elementDetector.getElementFromURL(ARC_DAMAGE_ICON)).toEqual('arc');
          expect(elementDetector.getElementFromURL(SOLAR_DAMAGE_ICON)).toEqual('solar');
          expect(elementDetector.getElementFromURL(VOID_DAMAGE_ICON)).toEqual('void');
          done();
        }, 2000);
      });
    });

  });

});
