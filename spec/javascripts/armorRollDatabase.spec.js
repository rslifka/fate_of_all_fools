describe('armorRollDatabase.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};
  const rollDatabase = require('armorRollDatabase.js').armorRollDB;
  const Utility = require('armorRoll.js').Utility;

  beforeEach(function() {
    // The module receiving the publication is the parent class
    fateBus.unmute('itemDatabase.js');

    fateBus.registerModule(brunchModule);
    fateBus.publish(brunchModule, 'fate.armorRollDataFetched',
      [
        '6917529047963087340',
        'Geomag Stabilizers',
        '23',
        'Y',
        'N',
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
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
          expect(piece.season).toEqual('23');
          expect(piece.mob).toEqual(1);
          expect(piece.res).toEqual(2);
          expect(piece.rec).toEqual(3);
          expect(piece.dis).toEqual(4);
          expect(piece.int).toEqual(5);
          expect(piece.str).toEqual(6);
          expect(piece.name).toEqual('Geomag Stabilizers');
          expect(piece.comments).toEqual('This is for a specific roll!');
          expect(piece.pveUtility).toEqual(Utility.YES);
          expect(piece.pvpUtility).toEqual(Utility.NO);
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
