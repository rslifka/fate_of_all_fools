describe('dupeIndicator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};
  const indicators = require('indicators.js');

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
  });

  describe('in response to a fate.refresh event', function() {

    describe('completion', function() {
      it('should let the world know it is done', function() {
        spyOn(fateBus, 'publish').and.callThrough();
        fateBus.publish(brunchModule, 'fate.refresh');
        expect(fateBus.publish).toHaveBeenCalledWith(jasmine.any(Object),'fate.dupesCalculated');
      });
    });

    describe('when no weapons have specific rolls', function() {

      beforeEach(function() {
        loadFixtures(
          'kineticWeapon.html',
          'kineticWeapon.html',
          'energyWeapon.html',
          'energyWeapon.html',
          'energyPerseverance.html',
          'powerWeapon.html',
          'powerWeapon.html'
        );

        $('[data-fate-weapon-name="Origin Story"]').attr('data-fate-roll-stored', 'false');
        $('[data-fate-weapon-name="Annual Skate"]').attr('data-fate-roll-stored', 'false');
        $('[data-fate-weapon-name="Alone as a god"]').attr('data-fate-roll-stored', 'false');
        $('[data-fate-weapon-name="Perseverance"]').attr('data-fate-roll-stored', 'false');

        fateBus.publish(brunchModule, 'fate.refresh');
      });

      it('should mark all dupes as dupes', function() {
        expect($('[data-fate-weapon-name="Origin Story"]:eq(0)')).toHaveAttr('data-fate-weapon-dupe','true');
        expect($('[data-fate-weapon-name="Origin Story"]:eq(1)')).toHaveAttr('data-fate-weapon-dupe','true');
        expect($('[data-fate-weapon-name="Annual Skate"]:eq(0)')).toHaveAttr('data-fate-weapon-dupe','true');
        expect($('[data-fate-weapon-name="Annual Skate"]:eq(1)')).toHaveAttr('data-fate-weapon-dupe','true');
        expect($('[data-fate-weapon-name="Alone as a god"]:eq(0)')).toHaveAttr('data-fate-weapon-dupe','true');
        expect($('[data-fate-weapon-name="Alone as a god"]:eq(1)')).toHaveAttr('data-fate-weapon-dupe','true');
      });

      it('should not mark lonely weapons', function() {
        expect($('[data-fate-weapon-name="Perseverance"]:eq(0)')).toHaveAttr('data-fate-weapon-dupe','false');
      })
    });

    describe('when some weapons have specific rolls', function() {

      beforeEach(function() {
        loadFixtures(
          'kineticWeapon.html',
          'kineticWeapon.html',
          'energyWeapon.html',
          'energyWeapon.html',
          'powerWeapon.html',
          'powerWeapon.html'
        );

        $('[data-fate-weapon-name="Origin Story"]:eq(0)').attr('data-fate-roll-stored', 'true');
        $('[data-fate-weapon-name="Annual Skate"]:eq(0)').attr('data-fate-roll-stored', 'true');
        $('[data-fate-weapon-name="Alone as a god"]:eq(0)').attr('data-fate-roll-stored', 'true');
        $('[data-fate-weapon-name="Origin Story"]:eq(1)').attr('data-fate-roll-stored', 'false');
        $('[data-fate-weapon-name="Annual Skate"]:eq(1)').attr('data-fate-roll-stored', 'false');
        $('[data-fate-weapon-name="Alone as a god"]:eq(1)').attr('data-fate-roll-stored', 'false');
        fateBus.publish(brunchModule, 'fate.refresh');
      });

      it('should only mark the extras as dupes', function() {
        expect($('[data-fate-weapon-name="Origin Story"]:eq(0)')).toHaveAttr('data-fate-weapon-dupe','false');
        expect($('[data-fate-weapon-name="Origin Story"]:eq(1)')).toHaveAttr('data-fate-weapon-dupe','true');
        expect($('[data-fate-weapon-name="Annual Skate"]:eq(0)')).toHaveAttr('data-fate-weapon-dupe','false');
        expect($('[data-fate-weapon-name="Annual Skate"]:eq(1)')).toHaveAttr('data-fate-weapon-dupe','true');
        expect($('[data-fate-weapon-name="Alone as a god"]:eq(0)')).toHaveAttr('data-fate-weapon-dupe','false');
        expect($('[data-fate-weapon-name="Alone as a god"]:eq(1)')).toHaveAttr('data-fate-weapon-dupe','true');
      });
    });

    describe('when a weapon that was a dupe becomes lonely', function() {
      beforeEach(function() {
        loadFixtures(
          'energyWeapon.html',
          'energyWeapon.html'
        );
      });
      it('should no longer be a dupe', function() {
        fateBus.publish(brunchModule, 'fate.refresh');
        $("[data-fate-weapon-name='Annual Skate']").eq(0).remove();
        fateBus.publish(brunchModule, 'fate.refresh');
        expect($("[data-fate-weapon-name='Annual Skate']").eq(0)).toHaveAttr('data-fate-weapon-dupe', 'false');
      });
    });
  });

  describe('when mousing over the dupe indicator', function() {

    beforeEach(function() {
      loadFixtures(
        'kineticWeapon.html',
        'energyWeapon.html',
        'energyWeapon.html',
        'energyPerseverance.html',
        'powerWeapon.html'
      );

      $('[data-fate-weapon-name="Origin Story"]').attr('data-fate-roll-stored', 'false');
      $('[data-fate-weapon-name="Annual Skate"]:eq(0)').attr('data-fate-roll-stored', 'true');
      $('[data-fate-weapon-name="Annual Skate"]:eq(1)').attr('data-fate-roll-stored', 'false');
      $('[data-fate-weapon-name="Alone as a god"]').attr('data-fate-roll-stored', 'false');
      $('[data-fate-weapon-name="Perseverance"]').attr('data-fate-roll-stored', 'false');

      // This element is what we mouse over
      ['Origin Story', 'Annual Skate', 'Alone as a god', 'Perseverance'].forEach(function(weaponName) {
        $('[data-fate-weapon-name="'+weaponName+'"]').append($('<div>', {'class': indicators.DUPLICATE_INDICATOR_CLASS}));
      });

      fateBus.publish(brunchModule, 'fate.refresh');
    });

    it('should highlight duplicates of this weapon', function() {

      fateBus.publish(
        brunchModule,
        'fate.test.mouseenter.dupe',
        '[data-fate-weapon-name="Annual Skate"]:eq(1) > .' + indicators.DUPLICATE_INDICATOR_CLASS
      );
      expect($('[data-fate-weapon-name="Origin Story"]')).toHaveClass('fate-search-hidden');
      expect($('[data-fate-weapon-name="Annual Skate"]:eq(0)')).not.toHaveClass('fate-search-hidden');
      expect($('[data-fate-weapon-name="Annual Skate"]:eq(1)')).not.toHaveClass('fate-search-hidden');
      expect($('[data-fate-weapon-name="Perseverance"]')).toHaveClass('fate-search-hidden');
      expect($('[data-fate-weapon-name="Alone as a god"]')).toHaveClass('fate-search-hidden');

      fateBus.publish(
        brunchModule,
        'fate.test.mouseleave.dupe',
        '[data-fate-weapon-name="Annual Skate"]:eq(0) > .' + indicators.DUPLICATE_INDICATOR_CLASS
      );
      expect($('[data-fate-weapon-name]')).not.toHaveClass('fate-search-hidden');
    });
  });

});
