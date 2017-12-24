describe('weapon.js', function() {

  const weapon = require('weapon.js');

  let coldheart;

  beforeEach(function() {
    coldheart = new weapon.Weapon('Coldheart','Exotic','Energy','Auto Rifle','Exotic','N','Y','N','?',
      'Solid for bullet sponge DPS (whenever you have time to ramp up on a single target)');
  });

  describe('initialization', function() {
    it('should create a Weapon', function() {
      expect(coldheart instanceof weapon.Weapon).toBeTruthy();
    });
  });

  describe('fields', function() {
    it('should assign paramters to the proper fields', function() {
      expect(coldheart.name).toBe('Coldheart');
      expect(coldheart.rarity).toBe('exotic');
      expect(coldheart.slot).toBe('Energy');
      expect(coldheart.type).toBe('Auto Rifle');
      expect(coldheart.subtype).toBe('Exotic');
      expect(coldheart.isFavourite).toBe(false);
      expect(coldheart.pveUseful).toBe(true);
      expect(coldheart.pvpUseful).toBe(false);
      expect(coldheart.raidUseful).toBe(false);
      expect(coldheart.favouriteUtility).toBe(weapon.Utility.NO);
      expect(coldheart.pveUtility).toBe(weapon.Utility.YES);
      expect(coldheart.pvpUtility).toBe(weapon.Utility.NO);
      expect(coldheart.raidUtility).toBe(weapon.Utility.UNKNOWN);
      expect(coldheart.comments).toBe('Solid for bullet sponge DPS (whenever you have time to ramp up on a single target)');
    });
  });

  describe('#isJunk', function() {
    beforeEach(function() {
      coldheart.pveUseful = false;
      coldheart.pvpUseful = false;
    });
    it('should be junk if no good in PvE or PvP', function() {
      expect(coldheart.isJunk()).toBeTruthy();
    });
    it('should not be junk if good in PvE', function() {
      coldheart.pveUseful = true;
      expect(coldheart.isJunk()).not.toBeTruthy();
    });
    it('should not be junk if good in PvP', function() {
      coldheart.pvpUseful = true;
      expect(coldheart.isJunk()).not.toBeTruthy();
    });
  });
});
