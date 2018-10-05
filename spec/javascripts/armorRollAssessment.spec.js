describe('armorRollAssessment.js', function() {

  const armorRollAssessment = require('armorRollAssessment.js');
  const armor = require('armor.js');
  const rollParams = ['6917529074542621459','Geomag Stabilizers','Y','Charge up that Chaos Reach!'];

  describe('initialization', function() {
    it('should create an ArmorRollAssessment', function() {
      const r = new armorRollAssessment.ArmorRollAssessment(...rollParams);
      expect(r instanceof armorRollAssessment.ArmorRollAssessment).toBeTruthy();
    });
  });

  describe('fields', function() {
    it('should assign paramters to the proper fields', function() {
      const armorRoll = new armorRollAssessment.ArmorRollAssessment(...rollParams);
      expect(armorRoll.rollID).toBe('6917529074542621459');
      expect(armorRoll.name).toBe('Geomag Stabilizers');
      expect(armorRoll.keep).toBe(armor.Keep.YES);
      expect(armorRoll.comments).toBe('Charge up that Chaos Reach!');
    });
  });

});
