describe('armor.js', function() {

  const armor = require('armor.js');

  const armorParams = [
    'Geomag Stabilizers',
    'Exotic',
    'Legs',
    'Check Roll',
    'Starts rapidly recharging super way before you think. Neat!'
  ];

  let armorPiece;

  describe('initialization', function() {
    it('should create a Weapon', function() {
      const armorPiece = new armor.Armor(...armorParams);
      expect(armorPiece instanceof armor.Armor).toBeTruthy();
    });
  });

  describe('fields', function() {
    it('should assign paramters to the proper fields', function() {
      const armorPiece = new armor.Armor(...armorParams);
      expect(armorPiece.name).toBe('Geomag Stabilizers');
      expect(armorPiece.rarity).toBe('exotic');
      expect(armorPiece.slot).toBe('legs');
      expect(armorPiece.keep).toBe(armor.Keep.UNKNOWN);
      expect(armorPiece.comments).toBe('Starts rapidly recharging super way before you think. Neat!');
    });
  });

});
