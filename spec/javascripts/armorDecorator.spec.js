describe('armorDecorator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};

  const armor = require('armor.js');
  const armorDatabase = require('armorDatabase.js').armorDB;
  const armorRollDatabase = require('armorRollDatabase.js').armorRollDB;

  beforeEach(function() {
    fateBus.registerModule(brunchModule);

    spyOn(armorDatabase, 'contains').and.callFake(function(armorName) {
      return [
        'Eimin-Tin Ritual Mask',
        'Wraps of the Emperor\'s Minister',
        'Vesper of Radius',
        'Boots of the Great Hunt',
        'Dragonfly Regalia Bond'
      ].includes(armorName);
    });
    spyOn(armorDatabase, 'get').and.callFake(function(armorName) {
      switch(armorName) {
        // Helm
        case 'Eimin-Tin Ritual Mask':
          return {name: 'Eimin-Tin Ritual Mask', rarity: 'legendary', keepStatus: armor.Keep.YES, comments: 'Spooky'};
        // Gauntlets
        case 'Wraps of the Emperor\'s Minister':
          return {name: 'Wraps of the Emperor\'s Minister', rarity: 'legendary', keepStatus: armor.Keep.YES, comments: 'Calus'};
        // Chest
        case 'Vesper of Radius':
          return {name: 'Vesper of Radius', rarity: 'exotic', keepStatus: armor.Keep.YES, comments: 'Leave the dahgs alone'};
        // Legs
        case 'Boots of the Great Hunt':
          return {name: 'Boots of the Great Hunt', rarity: 'legendary', keepStatus: armor.Keep.UNKNOWN, comments: 'Last wish'};
        // Class
        case 'Dragonfly Regalia Bond':
          return {name: 'Dragonfly Regalia Bond', rarity: 'legendary', keepStatus: armor.Keep.NO, comments: 'Fly like a dragon'};
      }
    });
    spyOn(armorRollDatabase, 'contains').and.callFake(function(rollID) {
      return ['6917529055948440512'].includes(rollID);
    });
    spyOn(armorRollDatabase, 'get').and.callFake(function(armorName) {
      switch(armorName) {
        case '6917529055948440512':
          return {rollID: '6917529055948440512', name: 'Vesper of Radius', keepStatus: armor.Keep.NO, comments: 'Roll-specific comments'};
      }
    });
  });

  describe('in response to fate.refresh', function() {

    beforeEach(function() {
      loadFixtures(
        'armorDecoratorInventoryRaw.html',
      );
      fateBus.publish(brunchModule, 'fate.refresh');
    });

    it('should store the original armor name', function() {
      expect('[title*="Eimin-Tin Ritual Mask"]').toHaveAttr('data-fate-armor-name', 'Eimin-Tin Ritual Mask');
      expect('[title*="Wraps of the Emperor\'s Minister"]').toHaveAttr('data-fate-armor-name', 'Wraps of the Emperor\'s Minister');
      expect('[title*="Vesper of Radius"]').toHaveAttr('data-fate-armor-name', 'Vesper of Radius');
      expect('[title*="Boots of the Great Hunt"]').toHaveAttr('data-fate-armor-name', 'Boots of the Great Hunt');
      expect('[title*="Dragonfly Regalia Bond"]').toHaveAttr('data-fate-armor-name', 'Dragonfly Regalia Bond');
    });

    it('should store the masterwork status', function() {
      expect('[data-fate-armor-name="Eimin-Tin Ritual Mask"]').toHaveAttr('data-fate-masterwork', 'false');
      expect('[data-fate-armor-name="Wraps of the Emperor\'s Minister"]').toHaveAttr('data-fate-masterwork', 'true');
      expect('[data-fate-armor-name="Vesper of Radius"]').toHaveAttr('data-fate-masterwork', 'false');
      expect('[data-fate-armor-name="Boots of the Great Hunt"]').toHaveAttr('data-fate-masterwork', 'false');
      expect('[data-fate-armor-name="Dragonfly Regalia Bond"]').toHaveAttr('data-fate-masterwork', 'false');
    });

    it('should record its base light', function() {
      expect('[data-fate-armor-name="Eimin-Tin Ritual Mask"]').toHaveAttr('data-fate-base-light', '532');
      expect('[data-fate-armor-name="Wraps of the Emperor\'s Minister"]').toHaveAttr('data-fate-base-light', '380');
      expect('[data-fate-armor-name="Vesper of Radius"]').toHaveAttr('data-fate-base-light', '380');
      expect('[data-fate-armor-name="Boots of the Great Hunt"]').toHaveAttr('data-fate-base-light', '576');
      expect('[data-fate-armor-name="Dragonfly Regalia Bond"]').toHaveAttr('data-fate-base-light', '10');
    });

    it('shoud record the serial number', function() {
      expect('[data-fate-armor-name="Eimin-Tin Ritual Mask"]').toHaveAttr('data-fate-serial', '6917529073016457020');
      expect('[data-fate-armor-name="Wraps of the Emperor\'s Minister"]').toHaveAttr('data-fate-serial', '6917529056139488819');
      expect('[data-fate-armor-name="Vesper of Radius"]').toHaveAttr('data-fate-serial', '6917529055948440512');
      expect('[data-fate-armor-name="Boots of the Great Hunt"]').toHaveAttr('data-fate-serial', '6917529075519868698');
      expect('[data-fate-armor-name="Dragonfly Regalia Bond"]').toHaveAttr('data-fate-serial', '6917529074109499245');
    });

    it('shoud record the rarity', function() {
      expect('[data-fate-armor-name="Eimin-Tin Ritual Mask"]').toHaveAttr('data-fate-armor-rarity', 'legendary');
      expect('[data-fate-armor-name="Wraps of the Emperor\'s Minister"]').toHaveAttr('data-fate-armor-rarity', 'legendary');
      expect('[data-fate-armor-name="Vesper of Radius"]').toHaveAttr('data-fate-armor-rarity', 'exotic');
      expect('[data-fate-armor-name="Boots of the Great Hunt"]').toHaveAttr('data-fate-armor-rarity', 'legendary');
      expect('[data-fate-armor-name="Dragonfly Regalia Bond"]').toHaveAttr('data-fate-armor-rarity', 'legendary');
    });

    it('shoud record the comments', function() {
      expect('[data-fate-armor-name="Eimin-Tin Ritual Mask"]').toHaveAttr('data-fate-comment', 'Spooky');
      expect('[data-fate-armor-name="Wraps of the Emperor\'s Minister"]').toHaveAttr('data-fate-comment', 'Calus');
      expect('[data-fate-armor-name="Vesper of Radius"]').toHaveAttr('data-fate-comment', 'Roll-specific comments');
      expect('[data-fate-armor-name="Boots of the Great Hunt"]').toHaveAttr('data-fate-comment', 'Last wish');
      expect('[data-fate-armor-name="Dragonfly Regalia Bond"]').toHaveAttr('data-fate-comment', 'Fly like a dragon');
    });

    it('should record the registration status', function() {
      expect('[data-fate-armor-name="Eimin-Tin Ritual Mask"]').toHaveAttr('data-fate-armor-registered', 'true');
      expect('[title*="Crown of Tempests"]').toHaveAttr('data-fate-armor-registered', 'false');
      expect('[data-fate-armor-name="Wraps of the Emperor\'s Minister"]').toHaveAttr('data-fate-armor-registered', 'true');
      expect('[data-fate-armor-name="Vesper of Radius"]').toHaveAttr('data-fate-armor-registered', 'true');
      expect('[data-fate-armor-name="Boots of the Great Hunt"]').toHaveAttr('data-fate-armor-registered', 'true');
      expect('[data-fate-armor-name="Dragonfly Regalia Bond"]').toHaveAttr('data-fate-armor-registered', 'true');
    });

    describe('keep status', function() {

      describe('when the armor is not registered', function() {
        it('should not have a keep status', function() {
          expect('[title*="Crown of Tempests"]').not.toHaveAttr('data-fate-armor-keep');
        });
      });

      describe('when the armor is registered', function() {

        describe('when there is not a per-roll override', function() {
          it('shoud record the keep from the general inventory sheet', function() {
            expect('[data-fate-armor-name="Eimin-Tin Ritual Mask"]').toHaveAttr('data-fate-armor-keep', 'true');
            expect('[data-fate-armor-name="Wraps of the Emperor\'s Minister"]').toHaveAttr('data-fate-armor-keep', 'true');
            expect('[data-fate-armor-name="Boots of the Great Hunt"]').not.toHaveAttr('data-fate-armor-keep');
            expect('[data-fate-armor-name="Dragonfly Regalia Bond"]').toHaveAttr('data-fate-armor-keep', 'false');
          });
        });

        describe('when the keep is specific per-roll', function() {
          it('shoud record the keep', function() {
            expect('[data-fate-armor-name="Vesper of Radius"]').toHaveAttr('data-fate-armor-keep', 'false');
          });
        });
      });
    });

    describe('on subsequent refreshes', function() {

      it('should not overwrite the original name', function() {
        $('[data-fate-armor-name="Eimin-Tin Ritual Mask"]').attr('title', '_');
        $('[data-fate-armor-name="Wraps of the Emperor\'s Minister"]').attr('title', '_');
        $('[data-fate-armor-name="Vesper of Radius"]').attr('title', '_');
        $('[data-fate-armor-name="Boots of the Great Hunt"]').attr('title', '_');
        $('[data-fate-armor-name="Dragonfly Regalia Bond"]').attr('title', '_');
        fateBus.publish(brunchModule, 'fate.refresh');
        expect('[data-fate-armor-name="Eimin-Tin Ritual Mask"]').toExist();
        expect('[data-fate-armor-name="Wraps of the Emperor\'s Minister"]').toExist();
        expect('[data-fate-armor-name="Vesper of Radius"]').toExist();
        expect('[data-fate-armor-name="Boots of the Great Hunt"]').toExist();
        expect('[data-fate-armor-name="Dragonfly Regalia Bond"]').toExist();
      });

      it('should not overwrite the base light', function() {
        $('[data-fate-armor-name="Eimin-Tin Ritual Mask"]').children('.item-stat').text('400');
        $('[data-fate-armor-name="Wraps of the Emperor\'s Minister"]').children('.item-stat').text('400');
        $('[data-fate-armor-name="Vesper of Radius"]').children('.item-stat').text('400');
        $('[data-fate-armor-name="Boots of the Great Hunt"]').children('.item-stat').text('400');
        $('[data-fate-armor-name="Dragonfly Regalia Bond"]').children('.item-stat').text('400');
        fateBus.publish(brunchModule, 'fate.refresh');
        expect('[data-fate-armor-name="Eimin-Tin Ritual Mask"]').toHaveAttr('data-fate-base-light', '532');
        expect('[data-fate-armor-name="Wraps of the Emperor\'s Minister"]').toHaveAttr('data-fate-base-light', '380');
        expect('[data-fate-armor-name="Vesper of Radius"]').toHaveAttr('data-fate-base-light', '380');
        expect('[data-fate-armor-name="Boots of the Great Hunt"]').toHaveAttr('data-fate-base-light', '576');
        expect('[data-fate-armor-name="Dragonfly Regalia Bond"]').toHaveAttr('data-fate-base-light', '10');
      });

      it('should not overwrite the serial number', function() {
        $('[data-fate-armor-name="Eimin-Tin Ritual Mask"]').attr('id', '_');
        $('[data-fate-armor-name="Wraps of the Emperor\'s Minister"]').attr('id', '_');
        $('[data-fate-armor-name="Vesper of Radius"]').attr('id', '_');
        $('[data-fate-armor-name="Boots of the Great Hunt"]').attr('id', '_');
        $('[data-fate-armor-name="Dragonfly Regalia Bond"]').attr('id', '_');
        fateBus.publish(brunchModule, 'fate.refresh');
        expect('[data-fate-armor-name="Eimin-Tin Ritual Mask"]').toHaveAttr('data-fate-serial', '6917529073016457020');
        expect('[data-fate-armor-name="Wraps of the Emperor\'s Minister"]').toHaveAttr('data-fate-serial', '6917529056139488819');
        expect('[data-fate-armor-name="Vesper of Radius"]').toHaveAttr('data-fate-serial', '6917529055948440512');
        expect('[data-fate-armor-name="Boots of the Great Hunt"]').toHaveAttr('data-fate-serial', '6917529075519868698');
        expect('[data-fate-armor-name="Dragonfly Regalia Bond"]').toHaveAttr('data-fate-serial', '6917529074109499245');
      });

    });

  });

});
