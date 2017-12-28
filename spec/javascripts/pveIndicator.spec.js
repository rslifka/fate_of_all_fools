describe('pveIndicator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
  });

  describe('in response to fate.pvpsCalculated', function() {

    beforeEach(function() {
      loadFixtures(
        'kineticWeapon.html',
        'kineticMidnightCoup.html',
        'energyWeapon.html',
        'energyPerseverance.html',
        'powerWeapon.html',
        'powerWizenedRebuke.html'
      );

      $('[data-fate-weapon-name="Midnight Coup"]').attr('data-fate-weapon-pve', true);
      $('[data-fate-weapon-name="Perseverance"]').attr('data-fate-weapon-pve', true);
      $('[data-fate-weapon-name="The Wizened Rebuke"]').attr('data-fate-weapon-pve', true);
    });

    describe('preparation', function() {
      it('should reserve space for a pve useful weapon', function() {
        fateBus.publish(brunchModule, 'fate.pvpsCalculated');
        expect($('[data-fate-weapon-registered]')).toContainElement('.fate-pve.fate-glyph.fglyph-pve');
      });
    });

    describe('announcement', function() {
      it('should let the world know it is done', function() {
        spyOn(fateBus, 'publish').and.callThrough();
        fateBus.publish(brunchModule, 'fate.pvpsCalculated');
        expect(fateBus.publish).toHaveBeenCalledWith(jasmine.any(Object),'fate.pvesCalculated');
      });
    });

    describe('when a weapon is a pveer', function() {

      it('should have a visible glyph', function() {
        fateBus.publish(brunchModule, 'fate.pvpsCalculated');
        expect($('[data-fate-weapon-name="Midnight Coup"] .fate-pve.fate-glyph.fglyph-pve')).toBeVisible();
        expect($('[data-fate-weapon-name="Perseverance"] .fate-pve.fate-glyph.fglyph-pve')).toBeVisible();
        expect($('[data-fate-weapon-name="The Wizened Rebuke"] .fate-pve.fate-glyph.fglyph-pve')).toBeVisible();
        expect($('[data-fate-weapon-name="Annual Skate"] .fate-pve.fate-glyph.fglyph-pve')).toBeHidden();
        expect($('[data-fate-weapon-name="Alone as a god"] .fate-pve.fate-glyph.fglyph-pve')).toBeHidden();
      });

      it('should be marked as a favourite', function() {
        fateBus.publish(brunchModule, 'fate.pvpsCalculated');
        expect($('[data-fate-weapon-name="Midnight Coup"]')).toHaveAttr('data-fate-weapon-pve');
        expect($('[data-fate-weapon-name="Perseverance"]')).toHaveAttr('data-fate-weapon-pve');
        expect($('[data-fate-weapon-name="The Wizened Rebuke"]')).toHaveAttr('data-fate-weapon-pve');
        expect($('[data-fate-weapon-name="Annual Skate"]')).not.toHaveAttr('data-fate-weapon-pve');
        expect($('[data-fate-weapon-name="Alone as a god"]')).not.toHaveAttr('data-fate-weapon-pve');
      });

      describe('when it is also a pvper', function() {
        it('should get a little bumparino from the right', function() {
          $('[data-fate-weapon-name="Midnight Coup"]').attr('data-fate-weapon-pvp', true);
          fateBus.publish(brunchModule, 'fate.pvpsCalculated');
          expect($('[data-fate-weapon-name="Midnight Coup"] .fate-pve.fate-glyph.fate-right-bump.fglyph-pve')).toBeVisible();
        });
      });

    });

  });

});
