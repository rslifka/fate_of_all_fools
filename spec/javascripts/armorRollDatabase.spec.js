describe('armorRollDatabase.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};
  const rollDatabase = require('armorRollDatabase.js').armorRollDB;

  beforeEach(function() {
    // The module receiving the publication is the parent class
    fateBus.unmute('itemDatabase.js');

    fateBus.registerModule(brunchModule);
    fateBus.publish(brunchModule, 'fate.armorRollDataFetched',
      [
        '6917529047963087340',
        'Geomag Stabilizers',
        'Rec',
        'Mob',
        'Res',
        'This is for a specific roll!'
      ].join('\t')
    );
  });

  describe('in response to fate.armorRollDataFetched', function() {

    describe('#contains', function() {
      describe('when the roll is in the database', function() {
        it('should be true', function() {
          expect(rollDatabase.contains('6917529047963087340')).toBe(true);
        });
      });
      describe('when the roll is not in the database', function() {
        it('should be false', function() {
          expect(rollDatabase.contains('_')).toBe(false);
        });
      });
    });

    describe('#get', function() {
      describe('when the roll is found', function() {
        it('should return the roll', function() {
          const roll = require('armorRoll.js');
          const piece = rollDatabase.get('6917529047963087340');

          expect(piece).toEqual(jasmine.any(roll.ArmorRoll));
          expect(piece.rollID).toEqual('6917529047963087340');
          expect(piece.name).toEqual('Geomag Stabilizers');
          expect(piece.comments).toEqual('[Rec - Mob/Res] This is for a specific roll!');
        });
      });
      describe('when the roll is not found', function() {
        it('should not be returned', function() {
          expect(rollDatabase.get('_')).toBeUndefined();
        });
      });
    });

  });

});
