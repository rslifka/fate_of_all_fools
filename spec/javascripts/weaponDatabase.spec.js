describe('weaponDatabase.js', function() {

  const weapon = require('weapon.js');
  const weaponDatabase = require('weaponDatabase.js');

  // A weapon of each type and one without a comment (only optional data)
  const TEST_TSV_WEAPON_DATA = `Sweet Business	Exotic	Kinetic	Auto Rifle	Exotic	?	?	Y	Y	Pre-fire in PvP. Pair with the Rig in PvE and wreck
Hardlight	Exotic	Energy	Auto Rifle	Exotic	N	N	?	?	`;

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
    fateBus.publish(brunchModule, 'fate.weaponDataFetched', TEST_TSV_WEAPON_DATA);
  });

  describe('in response to fate.weaponDataFetched', function() {

    describe('#contains', function() {
      it('should be true if the weapon is in the database', function() {
        expect(weaponDatabase.contains('Hardlight')).toBe(true);
      });
      it('should be false if the weapon is not in the database', function() {
        expect(weaponDatabase.contains('_')).toBe(false);
      });
      it('should not contain weapons that were changed', function() {
        fateBus.publish(brunchModule, 'fate.weaponDataFetched', TEST_TSV_WEAPON_DATA.split("\n")[0]);
        expect(weaponDatabase.contains('Hardlight')).toBe(false);
      });
    });

  });

  describe('#get', function() {

    describe('when the weapon is found', function() {
      it('should return the weapon', function() {
        const sweetBusiness = weaponDatabase.get('Sweet Business');
        const hardLight = weaponDatabase.get('Hardlight');

        expect(sweetBusiness).toEqual(jasmine.any(weapon.Weapon));
        expect(sweetBusiness.name).toEqual('Sweet Business');
        expect(sweetBusiness.rarity).toEqual('exotic');
        expect(sweetBusiness.slot).toEqual('Kinetic');
        expect(sweetBusiness.type).toEqual('Auto Rifle');
        expect(sweetBusiness.subtype).toEqual('Exotic');
        expect(sweetBusiness.favouriteUtility).toEqual(weapon.Utility.UNKNOWN);
        expect(sweetBusiness.pveUtility).toEqual(weapon.Utility.UNKNOWN);
        expect(sweetBusiness.pvpUtility).toEqual(weapon.Utility.YES);
        expect(sweetBusiness.raidUtility).toEqual(weapon.Utility.YES);
        expect(sweetBusiness.comments).toEqual('Pre-fire in PvP. Pair with the Rig in PvE and wreck');

        expect(hardLight).toEqual(jasmine.any(weapon.Weapon));
        expect(hardLight.name).toEqual('Hardlight');
        expect(hardLight.rarity).toEqual('exotic');
        expect(hardLight.slot).toEqual('Energy');
        expect(hardLight.type).toEqual('Auto Rifle');
        expect(hardLight.subtype).toEqual('Exotic');
        expect(hardLight.favouriteUtility).toEqual(weapon.Utility.NO);
        expect(hardLight.pveUtility).toEqual(weapon.Utility.NO);
        expect(hardLight.pvpUtility).toEqual(weapon.Utility.UNKNOWN);
        expect(hardLight.raidUtility).toEqual(weapon.Utility.UNKNOWN);
        expect(hardLight.comments).toEqual('');
      });
    });

    describe('when the weapon is not found', function() {
      it('should be null', function() {
        expect(weaponDatabase.get('_')).toBeUndefined();
      });
    });

  });

});
