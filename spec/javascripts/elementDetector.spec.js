describe('elementDetector.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};
  const elementDetector = require('elementDetector.js');

  const ARC_DAMAGE_ICON = 'https://www.bungie.net/common/destiny2_content/icons/DestinyDamageTypeDefinition_092d066688b879c807c3b460afdd61e6.png';
  const SOLAR_DAMAGE_ICON = 'https://www.bungie.net/common/destiny2_content/icons/DestinyDamageTypeDefinition_2a1773e10968f2d088b97c22b22bba9e.png';
  const STASIS_DAMAGE_ICON = 'https://www.bungie.net/common/destiny2_content/icons/DestinyDamageTypeDefinition_530c4c3e7981dc2aefd24fd3293482bf.png';
  const VOID_DAMAGE_ICON = 'https://www.bungie.net/common/destiny2_content/icons/DestinyDamageTypeDefinition_ceb2f6197dccf3958bb31cc783eb97a0.png';

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
    loadFixtures('baseline/elements-6.43.2.html');
  });

  describe('color calculation', function() {

    describe('when the element is known', function() {
      it('should set the colors', async function() {
        element = await elementDetector.calculateElementForImage(ARC_DAMAGE_ICON);
        expect(element).toEqual('arc');
        element = await elementDetector.calculateElementForImage(SOLAR_DAMAGE_ICON);
        expect(element).toEqual('solar');
        element = await elementDetector.calculateElementForImage(STASIS_DAMAGE_ICON);
        expect(element).toEqual('stasis');
        element = await elementDetector.calculateElementForImage(VOID_DAMAGE_ICON);
        expect(element).toEqual('void');
      });
    });

    describe('when the element is not known', function() {
      it('is undefined', async function() {
        element = await elementDetector.calculateElementForImage('https://www.bungie.net/common/destiny2_content/icons/76cf319429a1eccbecd483ac3c438bf6.jpg');
        expect(element).toEqual(undefined);
      });
    });

  });

});
