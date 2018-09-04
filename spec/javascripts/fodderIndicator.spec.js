describe('fodderIndicator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};
  const indicators = require('indicators.js');

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
  });

  describe('in response to a fate.infusionCalculated event', function() {

    describe('when I am unregistered, uncommon, or not junk', function() {
      beforeEach(function() {
        loadFixtures(
          'infusion/kineticOriginStory306Unregistered.html', // Auto - Legendary
          'infusion/kineticSurosThrowback380.html',          // Auto - Uncommon
          'infusion/kineticSurosRegime280.html',             // Auto - Exotic
        );
      });
      it('should not get a fusion indicator', function() {
        fateBus.publish(brunchModule, 'fate.infusionCalculated');
        expect($('[data-fate-weapon-name="Origin Story"]')).toHaveAttr('data-fate-fodder', 'false');
        expect($('[data-fate-weapon-name="Suros Throwback"]')).toHaveAttr('data-fate-fodder', 'false');
        expect($('[data-fate-weapon-name="SUROS Regime"]')).toHaveAttr('data-fate-fodder', 'false');
      });
    });

    describe('when I am a higher light weapon', function() {

      describe('when there are only junk, uncommon or rare weapons at lower light', function() {
        beforeEach(function() {
          loadFixtures(
            'infusion/kineticSurosThrowback200.html',  // Auto - Uncommon
            'infusion/kineticMidnightCoup300.html',    // HC   - Junk
            'infusion/kineticCuboidARu303.html',       // Auto - Rare
            'infusion/kineticOriginStory306Dupe.html', // Auto - Legendary
            'infusion/kineticOriginStory306Dupe.html', // Auto - Legendary
          );
          $('[data-fate-weapon-name="Midnight Coup"]').attr('data-fate-weapon-junk', true);
        });
        it('should not get a fodder indicator', function() {
          fateBus.publish(brunchModule, 'fate.infusionCalculated');
          expect($('[data-fate-weapon-name="Origin Story"]:eq(0)')).toHaveAttr('data-fate-fodder', 'false');
          expect($('[data-fate-weapon-name="Origin Story"]:eq(1)')).toHaveAttr('data-fate-fodder', 'false');
        });
      });

      describe('when there are legendary weapons at lower light', function() {
        beforeEach(function() {
          loadFixtures(
            'infusion/kineticTheConqueror2280.html',   // SMG  - Legendary
            'infusion/kineticOriginStory306Junk.html', // Auto - Legendary
            'infusion/kineticOriginStory306Junk.html', // Auto - Legendary
          );
        });
        it('should get a fodder indicator', function() {
          fateBus.publish(brunchModule, 'fate.infusionCalculated');
          expect($('[data-fate-weapon-name="Origin Story"]:eq(0)')).toHaveAttr('data-fate-fodder', 'true');
          expect($('[data-fate-weapon-name="Origin Story"]:eq(1)')).toHaveAttr('data-fate-fodder', 'true');
        });
      });

      describe('when there are exotic weapons at lower light', function() {
        beforeEach(function() {
          loadFixtures(
            'infusion/kineticSweetBusiness200.html',   // Auto - Exotic
            'infusion/kineticOriginStory306Dupe.html', // Auto - Legendary
            'infusion/kineticOriginStory306Dupe.html', // Auto - Legendary
          );
        });
        it('should get a fodder indicator', function() {
          fateBus.publish(brunchModule, 'fate.infusionCalculated');
          expect($('[data-fate-weapon-name="Origin Story"]:eq(0)')).toHaveAttr('data-fate-fodder', 'true');
          expect($('[data-fate-weapon-name="Origin Story"]:eq(0)')).toHaveAttr('data-fate-fodder', 'true');
        });
      });

      describe('when i am higher light, not junk and not a dupe', function() {
        beforeEach(function() {
          loadFixtures(
            'infusion/energyPerseverance300.html', // Auto - Legendary
            'infusion/kineticOriginStory306.html', // Auto - Legendary
          );
        });
        it('should not get a fodder icon because i am the last of my kind', function() {
          fateBus.publish(brunchModule, 'fate.infusionCalculated');
          expect($('[data-fate-weapon-name="Origin Story"]:eq(0)')).toHaveAttr('data-fate-fodder', 'false');
        });
      });

      xdescribe('mouse interaction', function() {

        beforeEach(function() {
          loadFixtures(
            'infusion/kineticSurosThrowback200.html', // Auto - Uncommon
            'infusion/kineticSweetBusiness200.html',  // Auto - Exotic
            'infusion/energyPerseverance300.html',    // Auto - Legendary
            'infusion/energySolemnHymn300.html',      // Auto - Junk
            'infusion/kineticCuboidARu303.html',      // Auto - Rare
            'infusion/kineticOriginStory306.html',    // Auto - Legendary
          );
        });

        it('should show other items of the same type with lower light', function() {
          fateBus.publish(brunchModule, 'fate.infusionCalculated');

          fateBus.publish(brunchModule, 'fate.test.mouseenter.fodder', '[data-fate-weapon-name="Origin Story"] .fate-fodder');

          expect($('[data-fate-weapon-name="Suros Throwback"]')).toHaveClass('fate-search-hidden');
          expect($('[data-fate-weapon-name="Sweet Business"]')).not.toHaveClass('fate-search-hidden');
          expect($('[data-fate-weapon-name="Perseverance"]')).not.toHaveClass('fate-search-hidden');
          expect($('[data-fate-weapon-name="Solemn Hymn"]')).toHaveClass('fate-search-hidden');
          expect($('[data-fate-weapon-name="Cuboid ARu"]')).toHaveClass('fate-search-hidden');
          expect($('[data-fate-weapon-name="Origin Story"]')).not.toHaveClass('fate-search-hidden');

          fateBus.publish(brunchModule, 'fate.test.mouseleave.fodder', '[data-fate-weapon-name="Origin Story"] .fate-fodder');

          expect($('[data-fate-weapon-name]')).not.toHaveClass('fate-search-hidden');
        });

      });

    });

  });

});
