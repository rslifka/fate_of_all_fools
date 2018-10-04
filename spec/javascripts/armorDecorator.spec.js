describe('armorDecorator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
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

    describe('on subsequent refreshes', function() {

      const CHANNELS = ['Helmet','Gauntlets','Chest','Leg','ClassItem'];

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
