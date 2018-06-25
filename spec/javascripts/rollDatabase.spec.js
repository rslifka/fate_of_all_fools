describe('rollDatabase.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};
  const rollDatabase = require('rollDatabase.js').rollDB;

  beforeEach(function() {
    // The module receiving the publication is the parent class
    fateBus.unmute('itemDatabase.js');

    fateBus.registerModule(brunchModule);
    fateBus.publish(brunchModule, 'fate.rollDataFetched',
      '6917529047963087340\tPositive Outlook\tY\tN\tReload masterwork + Kill Clip = so good!');
  });

  describe('in response to fate.rollDataFetched', function() {

    describe('#contains', function() {
      describe('when the roll is in the database', function() {
        it('should be true', function() {
          expect(rollDatabase.contains('6917529047963087340')).toBe(true);
        });
      });
    });

    describe('#get', function() {
      describe('when the roll is found', function() {
        it('should return the roll', function() {
          const roll = require('rollAssessment.js');
          const weapon = require('weapon.js');
          const po = rollDatabase.get('6917529047963087340');

          expect(po).toEqual(jasmine.any(roll.RollAssessment));
          expect(po.rollID).toEqual('6917529047963087340');
          expect(po.name).toEqual('Positive Outlook');
          expect(po.pveUtility).toEqual(weapon.Utility.YES);
          expect(po.pvpUtility).toEqual(weapon.Utility.NO);
          expect(po.comments).toEqual('Reload masterwork + Kill Clip = so good!');
        });
      });
    });

  });

});
