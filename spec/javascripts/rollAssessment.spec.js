describe('rollAssessment.js', function() {

  const roll = require('rollAssessment.js');
  const weapon = require('weapon.js');
  const rollParams = ['6917529047963087340','Graviton Lance','Y','N','Best noise ever'];

  describe('initialization', function() {
    it('should create a RollAssessment', function() {
      const r = new roll.RollAssessment(...rollParams);
      expect(r instanceof roll.RollAssessment).toBeTruthy();
    });
  });

  describe('fields', function() {
    it('should assign paramters to the proper fields', function() {
      const lanceRoll = new roll.RollAssessment(...rollParams);
      expect(lanceRoll.rollID).toBe('6917529047963087340');
      expect(lanceRoll.name).toBe('Graviton Lance');
      expect(lanceRoll.pveUtility).toBe(weapon.Utility.YES);
      expect(lanceRoll.pvpUtility).toBe(weapon.Utility.NO);
    });
  });

  describe('#isJunk', function() {

    describe('when all stats are badness', function() {
      it('should be junk', function() {
        rollParams[2] = 'N';
        rollParams[3] = 'N';
        const lance = new roll.RollAssessment(...rollParams);
        expect(lance.isJunk()).toEqual(true);
      });
    });

    describe('when one of the stats is badness', function() {
      beforeEach(function() {
        rollParams[2] = 'Y';
        rollParams[3] = 'Y';
      });

      describe('when only pve is badness', function() {
        it('should not be junk', function() {
          rollParams[2] = 'N';
          const lance = new roll.RollAssessment(...rollParams);
          expect(lance.isJunk()).toEqual(false);
        });
      });

      describe('when only pvp is badness', function() {
        it('should not be junk', function() {
          rollParams[3] = 'N';
          const lance = new roll.RollAssessment(...rollParams);
          expect(lance.isJunk()).toEqual(false);
        });
      });

    });

  });
});
