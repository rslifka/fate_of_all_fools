describe('dupeIndicator.js', function() {

  const postal = require('postal');

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
        postal.publish({topic:'fate.refresh'});
        expect($('[drag-channel=Kinetic],[drag-channel=Energy],[drag-channel=Power]')).toContainElement('.fate-dupe.fate-glyph.fglyph-knives');
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
        postal.publish({topic:'fate.refresh'});
        expect($('[drag-channel=Kinetic],[drag-channel=Energy],[drag-channel=Power]')).toContainElement('.fate-dupe.fate-glyph.fglyph-knives.fate-positive');
        expect($('[drag-channel=Kinetic],[drag-channel=Energy],[drag-channel=Power] > .fate-dupe.fate-glyph.fglyph-knives.fate-positive')).toBeVisible();
      });
    });

    describe('when not all the weapons are dupes', function() {
      beforeEach(function() {
        loadFixtures(
          'energyWeapon.html',
          'energyWeapon.html',
          'energyPerseverance.html'
        );
      });
      it('style the ones that are', function() {
        postal.publish({topic:'fate.refresh'});
        expect($("[title='Annual Skate']")).toContainElement('.fate-dupe.fate-glyph.fglyph-knives.fate-positive');
        expect($('[title=Perseverance] > .fate-dupe')).toBeHidden();
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
        postal.publish({topic:'fate.refresh'});
        $("[title='Annual Skate']:first").remove();
        postal.publish({topic:'fate.refresh'});
        expect($("[title='Annual Skate']").children('.fate-dupe')).toBeHidden();
      });
    });

    describe('when the dupes have different light levels', function() {
      beforeEach(function() {
        loadFixtures(
          'energyWeapon.html',
          'energyWeapon.html'
        );
        $("[title='Annual Skate']:first").children('.item-stat').text(200);
      });
      it('should attach the same glyph, styled differently', function() {
        postal.publish({topic:'fate.refresh'});
        expect($('.item-stat:contains(200)').parent()).toContainElement('.fate-dupe.fate-glyph.fglyph-knives.fate-negative');
        expect($('.item-stat:contains(305)').parent()).toContainElement('.fate-dupe.fate-glyph.fglyph-knives.fate-positive');
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
      postal.publish({topic:'fate.refresh'});

      postal.publish({topic:'fate.test.mouseenter.dupe'});
      expect($('[drag-channel=Kinetic]')).toHaveClass('fate-search-hidden');
      expect($('[title=Perseverance]')).toHaveClass('fate-search-hidden');
      expect($('[drag-channel=Power]')).toHaveClass('fate-search-hidden');
      expect($('[title="Annual Skate"]')).not.toHaveClass('fate-search-hidden');

      postal.publish({topic:'fate.test.mouseleave.dupe'});
      expect($('[drag-channel=Kinetic],[drag-channel=Energy],[drag-channel=Power]')).not.toHaveClass('fate-search-hidden');
    });
  });

});
