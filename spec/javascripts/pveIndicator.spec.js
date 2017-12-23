describe('pveIndicator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};
  const weaponDatabase = require('weaponDatabase.js');

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

      spyOn(weaponDatabase, 'get').and.callFake(function(weaponName) {
        const database = {
          'Midnight Coup': {pveUseful: true},
          'Annual Skate': {pveUseful: false},
          'Perseverance': {pveUseful: true},
          'Alone as a god': {pveUseful: false},
          'The Wizened Rebuke': {pveUseful: true}
        };
        return database[weaponName];
      });
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

      describe('when mousing over the pve indicator', function() {

        it('should highlight all pve useful weapons', function() {
          fateBus.publish(brunchModule, 'fate.pvpsCalculated');

          fateBus.publish(brunchModule, 'fate.test.mouseenter.pve');
          expect($('[data-fate-weapon-name="Midnight Coup"]')).not.toHaveClass('fate-search-hidden');
          expect($('[data-fate-weapon-name="Perseverance"]')).not.toHaveClass('fate-search-hidden');
          expect($('[data-fate-weapon-name="The Wizened Rebuke"]')).not.toHaveClass('fate-search-hidden');
          expect($('[data-fate-weapon-name="Annual Skate"]')).toHaveClass('fate-search-hidden');
          expect($('[data-fate-weapon-name="Alone as a god"]')).toHaveClass('fate-search-hidden');

          fateBus.publish(brunchModule, 'fate.test.mouseleave.pve');
          expect($('[data-fate-weapon-name]')).not.toHaveClass('fate-search-hidden');
        });
      });

    });

  });

});
