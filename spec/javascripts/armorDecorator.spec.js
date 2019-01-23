describe('armorDecorator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};
  const armorRollDatabase = require('armorRollDatabase.js').armorRollDB;
  const ArmorRollAssessment = require('armorRollAssessment.js').ArmorRollAssessment;
  const armorKeepStatus = require('armorRollAssessment.js').Keep;

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
    spyOn(armorRollDatabase, 'contains').and.callFake(function(rollID) {
      return ['6917529055948440512'].includes(rollID);
    });
    spyOn(armorRollDatabase, 'get').and.callFake(function(rollID) {
      if ('6917529055948440512' === rollID) {
        return new ArmorRollAssessment(
          '6917529055948440512',
          'Vesper of Radius',
          armorKeepStatus.NO,
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

    it('shoud record the comments', function() {
      expect('[data-fate-armor-name="Vesper of Radius"]').toHaveAttr('data-fate-comment', 'Roll-specific comments');
    });

    it('should record the registration status', function() {
      expect('[data-fate-armor-name="Eimin-Tin Ritual Mask"]').toHaveAttr('data-fate-armor-registered', 'false');
      expect('[data-fate-armor-name="Vesper of Radius"]').toHaveAttr('data-fate-armor-registered', 'true');
    });

    describe('keep status', function() {

      describe('when the armor is not registered', function() {
        it('should not have a keep status', function() {
          expect('[title*="Crown of Tempests"]').not.toHaveAttr('data-fate-armor-keep');
        });
      });

      describe('when the keep is specific per-roll', function() {
        it('shoud record the keep', function() {
          expect('[data-fate-armor-name="Vesper of Radius"]').toHaveAttr('data-fate-armor-keep', 'false');
        });
      });
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
