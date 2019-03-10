describe('armorRoll.js', function() {

  const armorRoll = require('armorRoll.js');
  const rollParams = [
    '6917529074542621459',
    'Geomag Stabilizers',
    'Mob',
    'Res',
    'Rec',
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
      expect(a.comments).toBe('[Mob - Res/Rec] Charge up that Chaos Reach!');
    });
  });

});
