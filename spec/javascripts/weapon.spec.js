describe('weapon.js', function() {

  const weapon = require('weapon.js');

  const coldheartParams = [
    'Coldheart',
    'Exotic',
    'Auto Rifle',
    'Check Roll',
    'Solid for bullet sponge DPS (whenever you have time to ramp up on a single target)'
  ];

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
      expect(coldheart.pveUtility).toBe(weapon.Utility.UNKNOWN);
      expect(coldheart.pvpUtility).toBe(weapon.Utility.UNKNOWN);
      expect(coldheart.comments).toBe('Solid for bullet sponge DPS (whenever you have time to ramp up on a single target)');
    });
  });

  describe('#isJunk', function() {

    describe('when all stats are badness', function() {
      it('should be junk', function() {
        coldheartParams[3] = 'Always Junk';
        const coldheart = new weapon.Weapon(...coldheartParams);
        expect(coldheart.isJunk()).toEqual(true);
      });
    });

    describe('when not all stats are badness', function() {
      it('should reserve judgement', function() {
        coldheartParams[3] = 'Check Roll';
        const coldheart = new weapon.Weapon(...coldheartParams);
        expect(coldheart.isJunk()).toEqual(false);
      });
    });

  });
});
