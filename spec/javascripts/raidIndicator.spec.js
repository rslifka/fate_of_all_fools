describe('raidIndicator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
  });

  describe('in response to fate.pvesCalculated', function() {

    beforeEach(function() {
      loadFixtures(
        'kineticWeapon.html',
        'kineticMidnightCoup.html',
        'energyWeapon.html',
        'energyPerseverance.html',
        'powerWeapon.html',
        'powerWizenedRebuke.html'
      );

      $('[data-fate-weapon-name="Midnight Coup"]').attr('data-fate-weapon-raid', true);
      $('[data-fate-weapon-name="Perseverance"]').attr('data-fate-weapon-raid', true);
      $('[data-fate-weapon-name="The Wizened Rebuke"]').attr('data-fate-weapon-raid', true);
    });

    describe('preparation', function() {
      it('should reserve space for a favourite', function() {
        fateBus.publish(brunchModule, 'fate.pvesCalculated');
        expect($('[data-fate-weapon-registered]')).toContainElement('.fate-raid.fate-glyph.fglyph-skull');
      });
    });

    describe('announcement', function() {
      it('should let the world know it is done', function() {
        spyOn(fateBus, 'publish').and.callThrough();
        fateBus.publish(brunchModule, 'fate.pvesCalculated');
        expect(fateBus.publish).toHaveBeenCalledWith(jasmine.any(Object),'fate.raidsCalculated');
      });
    });

    describe('when a weapon is a raider', function() {

      it('should have a visible glyph', function() {
        fateBus.publish(brunchModule, 'fate.pvesCalculated');
        expect($('[data-fate-weapon-name="Midnight Coup"] .fate-raid.fate-glyph.fglyph-skull')).toBeVisible();
        expect($('[data-fate-weapon-name="Perseverance"] .fate-raid.fate-glyph.fglyph-skull')).toBeVisible();
        expect($('[data-fate-weapon-name="The Wizened Rebuke"] .fate-raid.fate-glyph.fglyph-skull')).toBeVisible();
        expect($('[data-fate-weapon-name="Annual Skate"] .fate-raid.fate-glyph.fglyph-skull')).toBeHidden();
        expect($('[data-fate-weapon-name="Alone as a god"] .fate-raid.fate-glyph.fglyph-skull')).toBeHidden();
      });

      it('should be marked as a favourite', function() {
        fateBus.publish(brunchModule, 'fate.pvesCalculated');
        expect($('[data-fate-weapon-name="Midnight Coup"]')).toHaveAttr('data-fate-weapon-raid');
        expect($('[data-fate-weapon-name="Perseverance"]')).toHaveAttr('data-fate-weapon-raid');
        expect($('[data-fate-weapon-name="The Wizened Rebuke"]')).toHaveAttr('data-fate-weapon-raid');
        expect($('[data-fate-weapon-name="Annual Skate"]')).not.toHaveAttr('data-fate-weapon-raid');
        expect($('[data-fate-weapon-name="Alone as a god"]')).not.toHaveAttr('data-fate-weapon-raid');
      });

      describe('when it is also a pvper', function() {

        beforeEach(function() {
          $('[data-fate-weapon-name="Midnight Coup"]').attr('data-fate-weapon-pvp', true);
        });

        it('should get a little bumparino', function() {
          fateBus.publish(brunchModule, 'fate.pvesCalculated');
          expect($('[data-fate-weapon-name="Midnight Coup"] .fate-raid.fate-glyph.fate-right-bump.fglyph-skull')).toBeVisible();
        });

        describe('when it is also a pveer', function() {
          it('should get a double bumperino', function() {
            $('[data-fate-weapon-name="Midnight Coup"]').attr('data-fate-weapon-pve', true);
            fateBus.publish(brunchModule, 'fate.pvesCalculated');
            expect($('[data-fate-weapon-name="Midnight Coup"] .fate-raid.fate-glyph.fate-right-double-bump.fglyph-skull')).toBeVisible();
          });
        });

      });

    });

  });

});
