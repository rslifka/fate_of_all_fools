describe('weapon.js', function() {

  const weapon = require('weapon.js');

  const coldheartParams = ['Coldheart','Exotic','Auto Rifle','Y','N',
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
      expect(coldheart.type).toBe('Auto Rifle');
      expect(coldheart.pveUtility).toBe(weapon.Utility.YES);
      expect(coldheart.pvpUtility).toBe(weapon.Utility.NO);
      expect(coldheart.comments).toBe('Solid for bullet sponge DPS (whenever you have time to ramp up on a single target)');
    });
  });

  describe('#isJunk', function() {

    describe('when all stats are badness', function() {
      it('should be junk', function() {
        coldheartParams[3] = 'N';
        coldheartParams[4] = 'N';
        const coldheart = new weapon.Weapon(...coldheartParams);
        expect(coldheart.isJunk()).toEqual(true);
      });
    });

    describe('when one of the stats is badness', function() {
      beforeEach(function() {
        coldheartParams[3] = 'Y';
        coldheartParams[4] = 'Y';
      });

      describe('when only pve is badness', function() {
        it('should not be junk', function() {
          coldheartParams[3] = 'N';
          const coldheart = new weapon.Weapon(...coldheartParams);
          expect(coldheart.isJunk()).toEqual(false);
        });
      });

      describe('when only pvp is badness', function() {
        it('should not be junk', function() {
          coldheartParams[4] = 'N';
          const coldheart = new weapon.Weapon(...coldheartParams);
          expect(coldheart.isJunk()).toEqual(false);
        });
      });

    });

  });
});
