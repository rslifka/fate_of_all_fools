describe('dupeIndicator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
  });

  describe('in response to a fate.refresh event', function() {

    describe('preparation', function() {
      beforeEach(function() {
        loadFixtures(
          'kineticWeapon.html',
          'energyWeapon.html',
          'powerWeapon.html'
        );
      });
      it('should ensure all weapons have a placeholder for a glyph', function() {
        fateBus.publish(brunchModule, 'fate.refresh');
        expect($('[data-fate-weapon-name]')).toContainElement('.fate-dupe.fate-glyph.fglyph-knives');
      });
    });

    describe('announcement', function() {
      it('should let the world know it is done', function() {
        spyOn(fateBus, 'publish').and.callThrough();
        fateBus.publish(brunchModule, 'fate.refresh');
        expect(fateBus.publish).toHaveBeenCalledWith(jasmine.any(Object),'fate.dupesCalculated');
      });
    });

    describe('when the dupes all have the same light level', function() {
      beforeEach(function() {
        loadFixtures(
          'kineticWeapon.html',
          'kineticWeapon.html',
          'energyWeapon.html',
          'energyWeapon.html',
          'powerWeapon.html',
          'powerWeapon.html'
        );
      });
      it('should attach the same glyph styled identically', function() {
        fateBus.publish(brunchModule, 'fate.refresh');
        expect($('[data-fate-weapon-name]')).toContainElement('.fate-dupe.fate-glyph.fglyph-knives.fate-positive');
        expect($('[data-fate-weapon-name] > .fate-dupe.fate-glyph.fglyph-knives.fate-positive')).toBeVisible();
      });
    });

    describe('when a dupe has a specific roll rated', function() {
      beforeEach(function() {
        loadFixtures(
          'kineticWeapon.html',
          'kineticWeapon.html'
        );
        $("[data-fate-weapon-name='Origin Story']:first").attr('data-fate-roll-stored', true);
      });
      it('should not be considered a dupe', function() {
        fateBus.publish(brunchModule, 'fate.refresh');
        expect($("[data-fate-weapon-name='Origin Story']")).not.toHaveAttr('data-fate-weapon-dupe');
        expect($("[data-fate-weapon-name='Origin Story']").children('.fate-dupe')).toBeHidden();
      });
    });

    describe('when not all the weapons are dupes', function() {
      beforeEach(function() {
        loadFixtures(
          'energyWeapon.html',
          'energyWeapon.html',
          'energyPerseverance.html'
        );
        fateBus.publish(brunchModule, 'fate.refresh');
      });
      it('should style the ones that are', function() {
        expect($("[data-fate-weapon-name='Annual Skate']")).toContainElement('.fate-dupe.fate-glyph.fglyph-knives.fate-positive');
        expect($('[data-fate-weapon-name=Perseverance]').children('.fate-dupe')).toBeHidden();
      });
      it('should mark the ones that are', function() {
        expect($("[data-fate-weapon-name='Annual Skate']")).toHaveAttr('data-fate-weapon-dupe','true');
        expect($("[data-fate-weapon-name='Perseverance']")).not.toHaveAttr('data-fate-weapon-dupe');
        expect($("[data-fate-weapon-name='Perseverance']")).not.toHaveAttr('data-fate-weapon-dupe');
      });
    });

    describe('when a weapon that was a dupe becomes lonely', function() {
      beforeEach(function() {
        loadFixtures(
          'energyWeapon.html',
          'energyWeapon.html'
        );
      });
      it('should no longer have a dupe indicator', function() {
        fateBus.publish(brunchModule, 'fate.refresh');
        $("[data-fate-weapon-name='Annual Skate']:first").remove();
        fateBus.publish(brunchModule, 'fate.refresh');
        expect($("[data-fate-weapon-name='Annual Skate']").children('.fate-dupe')).toBeHidden();
      });
      it('should no longer be marked as being a dupe', function() {
        expect($("[data-fate-weapon-name='Annual Skate']")).not.toHaveAttr('data-fate-weapon-dupe');
      });
    });

    describe('when the dupes have different light levels', function() {
      beforeEach(function() {
        loadFixtures(
          'energyWeapon.html',
          'energyWeapon.html'
        );
        $("[data-fate-weapon-name='Annual Skate']:first").attr('data-fate-base-light', 200);
        $(".item-stat:first").text(200);
      });
      it('should attach the same glyph, styled differently', function() {
        fateBus.publish(brunchModule, 'fate.refresh');
        expect($('.fate-dupe')).toBeVisible();
        expect($('.item-stat:contains(200)').parent().parent()).toContainElement('.fate-dupe.fate-glyph.fglyph-knives.fate-negative');
        expect($('.item-stat:contains(305)').parent().parent()).toContainElement('.fate-dupe.fate-glyph.fglyph-knives.fate-positive');
      });
    });

    describe('when a dupe is junk', function() {
      beforeEach(function() {
        loadFixtures(
          'energyWeapon.html',
          'energyWeapon.html'
        );
        $('[data-fate-weapon-name="Annual Skate"]').attr('data-fate-weapon-junk', 'true')
      });
      it('should not get a dupe indicator', function() {
        fateBus.publish(brunchModule, 'fate.refresh');
        expect($('.fate-dupe')).toBeHidden();
      });
    });

    describe('when a dupe is useful in PvP', function() {
      beforeEach(function() {
        loadFixtures(
          'energyWeapon.html',
          'energyWeapon.html'
        );
        $('[data-fate-weapon-name="Annual Skate"]').attr('data-fate-weapon-pvp', 'true');
      });
      it('should have its dupe indicator bumped down so it does not overlap', function() {
        fateBus.publish(brunchModule, 'fate.refresh');
        expect($('.fate-dupe')).toHaveClass('fate-top-bump');
      });
    });

    describe('when a dupe is useful in PvE', function() {
      beforeEach(function() {
        loadFixtures(
          'energyWeapon.html',
          'energyWeapon.html'
        );
        $('[data-fate-weapon-name="Annual Skate"]').attr('data-fate-weapon-pve', 'true');
      });
      it('should have its dupe indicator bumped down so it does not overlap', function() {
        fateBus.publish(brunchModule, 'fate.refresh');
        expect($('.fate-dupe')).toHaveClass('fate-top-bump');
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
    });
    it('should highlight duplicates of this weapon', function() {
      fateBus.publish(brunchModule, 'fate.refresh');

      fateBus.publish(brunchModule, 'fate.test.mouseenter.dupe');
      expect($('[drag-channel=Kinetic]')).toHaveClass('fate-search-hidden');
      expect($('[data-fate-weapon-name=Perseverance]')).toHaveClass('fate-search-hidden');
      expect($('[drag-channel=Power]')).toHaveClass('fate-search-hidden');
      expect($('[data-fate-weapon-name="Annual Skate"]')).not.toHaveClass('fate-search-hidden');

      fateBus.publish(brunchModule, 'fate.test.mouseleave.dupe');
      expect($('[data-fate-weapon-name]')).not.toHaveClass('fate-search-hidden');
    });
  });

});
