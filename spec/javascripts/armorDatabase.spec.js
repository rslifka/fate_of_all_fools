describe('armorDatabase.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};
  const armorDatabase = require('armorDatabase.js').armorDB;

  beforeEach(function() {
    // The module receiving the publication is the parent class
    fateBus.unmute('itemDatabase.js');

    fateBus.registerModule(brunchModule);
    fateBus.publish(brunchModule, 'fate.armorDataFetched',
      [
        'Geomag Stabilizers',
        'Exotic',
        'Legs',
        'Check Roll',
        'Starts rapidly recharging super way before you think. Neat!'
      ].join('\t')
    );
  });

  describe('in response to fate.armorDataFetched', function() {

    describe('#contains', function() {
      describe('when the armor is in the database', function() {
        it('should be true', function() {
          expect(armorDatabase.contains('Geomag Stabilizers')).toBe(true);
        });
      });
    });

    describe('#get', function() {
      describe('when the armor is found', function() {
        it('should return the armor', function() {
          const armor = require('armor.js');
          const geomags = armorDatabase.get('Geomag Stabilizers');

          expect(geomags).toEqual(jasmine.any(armor.Armor));
          expect(geomags.name).toEqual('Geomag Stabilizers');
          expect(geomags.rarity).toEqual('exotic');
          expect(geomags.slot).toEqual('legs');
          expect(geomags.keep).toEqual(armor.Keep.UNKNOWN);
          expect(geomags.comments).toEqual('Starts rapidly recharging super way before you think. Neat!');
        });
      });
    });

  });

});
