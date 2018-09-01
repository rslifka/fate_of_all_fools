describe('weaponDatabase.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};
  const weaponDatabase = require('weaponDatabase.js').weaponDB;

  beforeEach(function() {
    // The module receiving the publication is the parent class
    fateBus.unmute('itemDatabase.js');

    fateBus.registerModule(brunchModule);
    fateBus.publish(brunchModule, 'fate.weaponDataFetched', 'Sweet Business\tExotic\tAuto Rifle\tCheck Roll\tPvE virtuoso');
  });

  describe('in response to fate.weaponDataFetched', function() {

    describe('#contains', function() {
      describe('when the weapon is in the database', function() {
        it('should be true', function() {
          expect(weaponDatabase.contains('Sweet Business')).toBe(true);
        });
      });
    });

    describe('#get', function() {
      describe('when the weapon is found', function() {
        it('should return the weapon', function() {
          const weapon = require('weapon.js');
          const sweetBusiness = weaponDatabase.get('Sweet Business');

          expect(sweetBusiness).toEqual(jasmine.any(weapon.Weapon));
          expect(sweetBusiness.name).toEqual('Sweet Business');
          expect(sweetBusiness.rarity).toEqual('exotic');
          expect(sweetBusiness.type).toEqual('Auto Rifle');
          expect(sweetBusiness.pveUtility).toEqual(weapon.Utility.UNKNOWN);
          expect(sweetBusiness.pvpUtility).toEqual(weapon.Utility.UNKNOWN);
          expect(sweetBusiness.comments).toEqual('PvE virtuoso');
        });
      });
    });

  });

});
