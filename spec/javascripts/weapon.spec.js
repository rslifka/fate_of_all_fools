describe('weapon.js', function() {

  const weapon = require('weapon.js');

  const coldheartParams = ['Coldheart','Exotic','Energy','Auto Rifle','Exotic','N','Y','N','?',
    'Solid for bullet sponge DPS (whenever you have time to ramp up on a single target)'];

  let coldheart;

  describe('initialization', function() {
    it('should create a Weapon', function() {
      const coldheart = new weapon.Weapon(...coldheartParams);
      expect(coldheart instanceof weapon.Weapon).toBeTruthy();
    });
  });

  describe('fields', function() {
    it('should assign paramters to the proper fields', function() {
      const coldheart = new weapon.Weapon(...coldheartParams);
      expect(coldheart.name).toBe('Coldheart');
      expect(coldheart.rarity).toBe('exotic');
      expect(coldheart.slot).toBe('Energy');
      expect(coldheart.type).toBe('Auto Rifle');
      expect(coldheart.subtype).toBe('Exotic');
      expect(coldheart.favouriteUtility).toBe(weapon.Utility.NO);
      expect(coldheart.pveUtility).toBe(weapon.Utility.YES);
      expect(coldheart.pvpUtility).toBe(weapon.Utility.NO);
      expect(coldheart.raidUtility).toBe(weapon.Utility.UNKNOWN);
      expect(coldheart.comments).toBe('Solid for bullet sponge DPS (whenever you have time to ramp up on a single target)');
    });
  });

  describe('#isJunk', function() {

    describe('when pve and pvp utility is badness', function() {
      it('should be junk', function() {
        coldheartParams[6] = 'N';
        coldheartParams[7] = 'N';
        const coldheart = new weapon.Weapon(...coldheartParams);
        expect(coldheart.isJunk()).toEqual(true);
      });
    });

    describe('when only pvp is badness', function() {
      it('should not be junk', function() {
        coldheartParams[6] = '?';
        coldheartParams[7] = 'N';
        const coldheart = new weapon.Weapon(...coldheartParams);
        expect(coldheart.isJunk()).toEqual(false);
      });
    });

    describe('when only pve is badness', function() {
      it('should not be junk', function() {
        coldheartParams[6] = 'N';
        coldheartParams[7] = '?';
        const coldheart = new weapon.Weapon(...coldheartParams);
        expect(coldheart.isJunk()).toEqual(false);
      });
    });

  });
});
