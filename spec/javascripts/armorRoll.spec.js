describe('armorRoll.js', function() {

  const armorRoll = require('armorRoll.js');
  const Utility = armorRoll.Utility;
  const rollParams = [
    '6917529074542621459',
    'Geomag Stabilizers',
    'Arc',
    '23',
    'Y',
    'N',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    'Charge up that Chaos Reach!'
  ];

  describe('initialization', function() {
    it('should create an ArmorRoll', function() {
      const r = new armorRoll.ArmorRoll(...rollParams);
      expect(r instanceof armorRoll.ArmorRoll).toBeTruthy();
    });
  });

  describe('fields', function() {
    it('should assign paramters to the proper fields', function() {
      const a = new armorRoll.ArmorRoll(...rollParams);
      expect(a.rollID).toBe('6917529074542621459');
      expect(a.name).toBe('Geomag Stabilizers');
      expect(a.element).toBe('arc');
      expect(a.season).toBe('23');
      expect(a.pveUtility).toBe(Utility.YES);
      expect(a.pvpUtility).toBe(Utility.NO);
      expect(a.mob).toBe(1);
      expect(a.res).toBe(2);
      expect(a.rec).toBe(3);
      expect(a.dis).toBe(4);
      expect(a.int).toBe(5);
      expect(a.str).toBe(6);
      expect(a.total).toBe(21);
      expect(a.comments).toBe('Charge up that Chaos Reach!');
    });
  });

});
