describe('elementDetector.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};
  const elementDetector = require('elementDetector.js');

  const ARC_DAMAGE_ICON = 'https://www.bungie.net/common/destiny2_content/icons/DestinyDamageTypeDefinition_9fbcfcef99f4e8a40d8762ccb556fcd4.png';
  const SOLAR_DAMAGE_ICON = 'https://www.bungie.net/common/destiny2_content/icons/DestinyDamageTypeDefinition_2a1773e10968f2d088b97c22b22bba9e.png';
  const VOID_DAMAGE_ICON = 'https://www.bungie.net/common/destiny2_content/icons/DestinyDamageTypeDefinition_ceb2f6197dccf3958bb31cc783eb97a0.png';

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
    loadFixtures('entireDocumentRaw-6.37.2.html');
  });

  describe('color setting', function() {

    describe('when the element is known', function() {
      it('should set the colors', async function() {
        await elementDetector.updateElementIcons();
        expect(elementDetector.getElementFromURL(ARC_DAMAGE_ICON)).toEqual('arc');
        expect(elementDetector.getElementFromURL(SOLAR_DAMAGE_ICON)).toEqual('solar');
        expect(elementDetector.getElementFromURL(VOID_DAMAGE_ICON)).toEqual('void');
      });
    });

    describe('when the element is not known', function() {
      it('is kinetic', async function() {
        await elementDetector.updateElementIcons();
        expect(elementDetector.getElementFromURL('TEST_NO_ICON_VALUE')).toEqual('kinetic');
      });
    });

  });

});
