describe('itemDatabase.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};
  const i = require('itemDatabase.js');

  class TestDB extends i.ItemDatabase {
    constructor() {
      super('TEST');
    }
    createItemFromData(data) {
      this.itemMap.set(data[0], {name: data[0], rarity: data[1], slot: data[2]});
    }
  }
  const testDB = new TestDB();

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
    fateBus.publish(brunchModule, 'fate.TESTDataFetched',
'Hard Light\tExotic\tAuto Rifle\n' +
'Allegro-34\tRare\tHand Cannon');
  });

  describe('in response to fate.TESTDataFetched', function() {

    describe('#contains', function() {

      describe('when the item is in the database', function() {
        it('should be true', function() {
          expect(testDB.contains('Hard Light')).toBe(true);
          expect(testDB.contains('Allegro-34')).toBe(true);
        });
      });

      describe('when the item is not in the database', function() {
        it('should be false', function() {
          expect(testDB.contains('_')).toBe(false);
        });
      });

      describe('when an item has been removed', function() {
        it('should not be in the database', function() {
          fateBus.publish(brunchModule, 'fate.TESTDataFetched', 'Allegro-34 Rare  Hand Cannon');
          expect(testDB.contains('Hard Light')).toBe(false);
        });
      });

    });

    describe('#get', function() {

      describe('when the item is found', function() {
        it('should return the weapon', function() {
          const hardLight = testDB.get('Hard Light');
          const allegro = testDB.get('Allegro-34');

          expect(hardLight.name).toEqual('Hard Light');
          expect(hardLight.rarity).toEqual('Exotic');
          expect(hardLight.slot).toEqual('Auto Rifle');

          expect(allegro.name).toEqual('Allegro-34');
          expect(allegro.rarity).toEqual('Rare');
          expect(allegro.slot).toEqual('Hand Cannon');
        });
      });

      describe('when the item is not found', function() {
        it('should be undefined', function() {
          expect(testDB.get('_')).toBeUndefined();
        });
      });

    });

  });

});
