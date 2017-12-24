describe('pvpIndicator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};
  const weapon = require('weapon.js');
  const weaponDatabase = require('weaponDatabase.js');

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
  });

  describe('in response to fate.refresh', function() {

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
          'Midnight Coup': {pvpUtility: weapon.Utility.YES},
          'Annual Skate': {pvpUtility: weapon.Utility.NO},
          'Perseverance': {pvpUtility: weapon.Utility.YES},
          'Alone as a god': {pvpUtility: weapon.Utility.NO},
          'The Wizened Rebuke': {pvpUtility: weapon.Utility.YES}
        };
        return database[weaponName];
      });
    });

    describe('preparation', function() {
      it('should reserve space for a pvp useful weapon', function() {
        fateBus.publish(brunchModule, 'fate.refresh');
        expect($('[data-fate-weapon-registered]')).toContainElement('.fate-pvp.fate-glyph.fglyph-pvp');
      });
    });

    describe('announcement', function() {
      it('should let the world know it is done', function() {
        spyOn(fateBus, 'publish').and.callThrough();
        fateBus.publish(brunchModule, 'fate.refresh');
        expect(fateBus.publish).toHaveBeenCalledWith(jasmine.any(Object),'fate.pvpsCalculated');
      });
    });

    describe('when a weapon is a pvper', function() {

      it('should have a visible glyph', function() {
        fateBus.publish(brunchModule, 'fate.refresh');
        expect($('[data-fate-weapon-name="Midnight Coup"] .fate-pvp.fate-glyph.fglyph-pvp')).toBeVisible();
        expect($('[data-fate-weapon-name="Perseverance"] .fate-pvp.fate-glyph.fglyph-pvp')).toBeVisible();
        expect($('[data-fate-weapon-name="The Wizened Rebuke"] .fate-pvp.fate-glyph.fglyph-pvp')).toBeVisible();
        expect($('[data-fate-weapon-name="Annual Skate"] .fate-pvp.fate-glyph.fglyph-pvp')).toBeHidden();
        expect($('[data-fate-weapon-name="Alone as a god"] .fate-pvp.fate-glyph.fglyph-pvp')).toBeHidden();
      });

      it('should be marked as a favourite', function() {
        fateBus.publish(brunchModule, 'fate.refresh');
        expect($('[data-fate-weapon-name="Midnight Coup"]')).toHaveAttr('data-fate-weapon-pvp');
        expect($('[data-fate-weapon-name="Perseverance"]')).toHaveAttr('data-fate-weapon-pvp');
        expect($('[data-fate-weapon-name="The Wizened Rebuke"]')).toHaveAttr('data-fate-weapon-pvp');
        expect($('[data-fate-weapon-name="Annual Skate"]')).not.toHaveAttr('data-fate-weapon-pvp');
        expect($('[data-fate-weapon-name="Alone as a god"]')).not.toHaveAttr('data-fate-weapon-pvp');
      });

      describe('when mousing over the pvp indicator', function() {

        it('should highlight all pvp useful weapons', function() {
          fateBus.publish(brunchModule, 'fate.refresh');

          fateBus.publish(brunchModule, 'fate.test.mouseenter.pvp');
          expect($('[data-fate-weapon-name="Midnight Coup"]')).not.toHaveClass('fate-search-hidden');
          expect($('[data-fate-weapon-name="Perseverance"]')).not.toHaveClass('fate-search-hidden');
          expect($('[data-fate-weapon-name="The Wizened Rebuke"]')).not.toHaveClass('fate-search-hidden');
          expect($('[data-fate-weapon-name="Annual Skate"]')).toHaveClass('fate-search-hidden');
          expect($('[data-fate-weapon-name="Alone as a god"]')).toHaveClass('fate-search-hidden');

          fateBus.publish(brunchModule, 'fate.test.mouseleave.pvp');
          expect($('[data-fate-weapon-name]')).not.toHaveClass('fate-search-hidden');
        });
      });

    });

  });

});
