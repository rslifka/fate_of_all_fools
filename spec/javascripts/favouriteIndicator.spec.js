describe('favouriteIndicator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};
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
          'Midnight Coup': {isFavourite: true},
          'Annual Skate': {isFavourite: false},
          'Perseverance': {isFavourite: true},
          'Alone as a god': {isFavourite: false},
          'The Wizened Rebuke': {isFavourite: true}
        };
        return database[weaponName];
      });
    });

    describe('preparation', function() {
      it('should reserve space for a favourite', function() {
        fateBus.publish(brunchModule, 'fate.refresh');
        expect($('[data-fate-weapon-registered]')).toContainElement('.fate-fave.fate-glyph.fglyph-fave');
      });
    });

    describe('announcement', function() {
      it('should let the world know it is done', function() {
        spyOn(fateBus, 'publish').and.callThrough();
        fateBus.publish(brunchModule, 'fate.refresh');
        expect(fateBus.publish).toHaveBeenCalledWith(jasmine.any(Object),'fate.favesCalculated');
      });
    });

    describe('when a weapon is a favourite', function() {
      it('should have a visible glyph', function() {
        fateBus.publish(brunchModule, 'fate.refresh');
        expect($('[data-fate-weapon-name="Midnight Coup"] .fate-fave.fate-glyph.fglyph-fave')).toBeVisible();
        expect($('[data-fate-weapon-name="Perseverance"] .fate-fave.fate-glyph.fglyph-fave')).toBeVisible();
        expect($('[data-fate-weapon-name="The Wizened Rebuke"] .fate-fave.fate-glyph.fglyph-fave')).toBeVisible();
        expect($('[data-fate-weapon-name="Annual Skate"] .fate-fave.fate-glyph.fglyph-fave')).toBeHidden();
        expect($('[data-fate-weapon-name="Alone as a god"] .fate-fave.fate-glyph.fglyph-fave')).toBeHidden();
      });
    });

  });

});
