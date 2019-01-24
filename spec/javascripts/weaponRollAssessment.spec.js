describe('weaponRollAssessment.js', function() {

  const roll = require('weaponRollAssessment.js');
  const Utility = roll.Utility;
  const rollParams = ['6917529047963087340','Graviton Lance','Y','N','Best noise ever'];

  describe('initialization', function() {
    it('should create a RollAssessment', function() {
      const r = new roll.WeaponRollAssessment(...rollParams);
      expect(r instanceof roll.WeaponRollAssessment).toBeTruthy();
    });
  });

  describe('fields', function() {
    it('should assign paramters to the proper fields', function() {
      const lanceRoll = new roll.WeaponRollAssessment(...rollParams);
      expect(lanceRoll.rollID).toBe('6917529047963087340');
      expect(lanceRoll.name).toBe('Graviton Lance');
      expect(lanceRoll.pveUtility).toBe(Utility.YES);
      expect(lanceRoll.pvpUtility).toBe(Utility.NO);
    });
  });

});
