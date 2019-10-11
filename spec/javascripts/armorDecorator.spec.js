describe('armorDecorator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};
  const armorRollDatabase = require('armorRollDatabase.js').armorRollDB;
  const ArmorRoll = require('armorRoll.js').ArmorRoll;

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
    spyOn(armorRollDatabase, 'contains').and.callFake(function(rollID) {
      return ['6917529055948440512'].includes(rollID);
    });
    spyOn(armorRollDatabase, 'get').and.callFake(function(rollID) {
      if ('6917529055948440512' === rollID) {
        return new ArmorRoll(
          '6917529055948440512',
          'Vesper of Radius',
          '1',
          '2',
          '3',
          '4',
          '5',
          '6',
          'Roll-specific comments'
        );
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
      expect('[title*="Vesper of Radius"]').toHaveAttr('data-fate-armor-name', 'Vesper of Radius');
    });

    it('should store the masterwork status', function() {
      expect('[data-fate-armor-name="Eimin-Tin Ritual Mask"]').toHaveAttr('data-fate-masterwork', 'false');
      expect('[data-fate-armor-name="Vesper of Radius"]').toHaveAttr('data-fate-masterwork', 'false');
    });

    it('shoud record the serial number', function() {
      expect('[data-fate-armor-name="Eimin-Tin Ritual Mask"]').toHaveAttr('data-fate-serial', '6917529073016457020');
      expect('[data-fate-armor-name="Vesper of Radius"]').toHaveAttr('data-fate-serial', '6917529055948440512');
    });

    it('should store the stats', function() {
      expect('[data-fate-armor-name="Vesper of Radius"]').toHaveAttr('data-fate-mob', '1');
      expect('[data-fate-armor-name="Vesper of Radius"]').toHaveAttr('data-fate-res', '2');
      expect('[data-fate-armor-name="Vesper of Radius"]').toHaveAttr('data-fate-rec', '3');
      expect('[data-fate-armor-name="Vesper of Radius"]').toHaveAttr('data-fate-int', '4');
      expect('[data-fate-armor-name="Vesper of Radius"]').toHaveAttr('data-fate-dis', '5');
      expect('[data-fate-armor-name="Vesper of Radius"]').toHaveAttr('data-fate-str', '6');
    });

    it('should store the stats total', function() {
      expect('[data-fate-armor-name="Vesper of Radius"]').toHaveAttr('data-fate-stats-total', '21');
    });

    it('shoud record the comments', function() {
      expect('[data-fate-armor-name="Vesper of Radius"]').toHaveAttr('data-fate-comment', 'Roll-specific comments');
    });

    it('should record the registration status', function() {
      expect('[data-fate-armor-name="Eimin-Tin Ritual Mask"]').toHaveAttr('data-fate-armor-registered', 'false');
      expect('[data-fate-armor-name="Vesper of Radius"]').toHaveAttr('data-fate-armor-registered', 'true');
    });

    it('should record the DIM tags as their own attributions', function() {
      expect('[id="6917529056139488819-ps600"]').toHaveAttr('data-fate-dim-tags', 'lock');
    });

    describe('on subsequent refreshes', function() {

      it('should not overwrite the original name', function() {
        $('[data-fate-armor-name="Eimin-Tin Ritual Mask"]').attr('title', '_');
        $('[data-fate-armor-name="Vesper of Radius"]').attr('title', '_');
        fateBus.publish(brunchModule, 'fate.refresh');
        expect('[data-fate-armor-name="Eimin-Tin Ritual Mask"]').toExist();
        expect('[data-fate-armor-name="Vesper of Radius"]').toExist();
      });

      it('should not overwrite the serial number', function() {
        $('[data-fate-armor-name="Eimin-Tin Ritual Mask"]').attr('id', '_');
        $('[data-fate-armor-name="Vesper of Radius"]').attr('id', '_');
        fateBus.publish(brunchModule, 'fate.refresh');
        expect('[data-fate-armor-name="Eimin-Tin Ritual Mask"]').toHaveAttr('data-fate-serial', '6917529073016457020');
        expect('[data-fate-armor-name="Vesper of Radius"]').toHaveAttr('data-fate-serial', '6917529055948440512');
      });

    });

  });

});
