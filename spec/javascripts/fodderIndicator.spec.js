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

      describe('mouse interaction', function() {

        beforeEach(function() {
          loadFixtures(
            'infusion/kineticSurosThrowback200.html',  // Auto    - Uncommon
            'infusion/kineticSurosThrowback380.html',  // Auto    - Uncommon
            'infusion/kineticCuboidARu303.html',       // Auto    - Rare
            'infusion/kineticMidnightCoup370.html',    // Hand    - Junk
            'infusion/kineticOriginStory306.html',     // Auto    - Legendary
            'infusion/kineticSurosRegime280.html',     // Auto    - Exotic
            'infusion/kineticTheConqueror2280.html',   // SMG     - Legendary
            'infusion/kineticTraxLysisII303.html',     // Pulse   - Rare

            'infusion/energyLastPerdition290.html',    // Pulse   - Legendary
            'infusion/energyPerseverance300.html',     // Auto    - Dupe
            'infusion/energyPerseverance305.html',     // Auto    - Dupe
            'infusion/energyProsecutor315.html',       // Auto    - Legendary
            'infusion/energySolemnHymn310.html',       // Auto    - Junk

            'infusion/powerAloneAsAGod305.html',       // Sniper  - Dupe
            'infusion/powerAloneAsAGod310.html',       // Sniper  - Dupe
            'infusion/powerCurtainCall290.html',       // Rocket  - Legendary
            'infusion/powerDoubleEdgedAnswer330.html', // Sword   - Unregistered
            'infusion/powerSinsOfThePast380.html'      // Rocket  - Legendary
          );
          $('[data-fate-weapon-name]').append($('<div>', {'class': indicators.FODDER_INDICATOR_CLASS}));
        });

        it('should show other items of the same type with lower light', function() {
          fateBus.publish(brunchModule, 'fate.infusionCalculated');

          fateBus.publish(brunchModule, 'fate.test.mouseenter.fodder', '[data-fate-weapon-name="Midnight Coup"] > .'+indicators.FODDER_INDICATOR_CLASS);
          expect($('[data-fate-weapon-name="Suros Throwback"]:eq(0)')).toHaveClass('fate-search-hidden');
          expect($('[data-fate-weapon-name="Suros Throwback"]:eq(1)')).toHaveClass('fate-search-hidden');
          expect($('[data-fate-weapon-name="Cuboid ARu"]')).toHaveClass('fate-search-hidden');
          expect($('[data-fate-weapon-name="Midnight Coup"]')).not.toHaveClass('fate-search-hidden');
          expect($('[data-fate-weapon-name="Origin Story"]')).not.toHaveClass('fate-search-hidden');
          expect($('[data-fate-weapon-name="SUROS Regime"]')).not.toHaveClass('fate-search-hidden');
          expect($('[data-fate-weapon-name="The Conqueror 2"]')).not.toHaveClass('fate-search-hidden');
          expect($('[data-fate-weapon-name="Trax Lysis II"]')).toHaveClass('fate-search-hidden');
          fateBus.publish(brunchModule, 'fate.test.mouseleave.fodder', '[data-fate-weapon-name="Midnight Coup"] > .'+indicators.FODDER_INDICATOR_CLASS);

          fateBus.publish(brunchModule, 'fate.test.mouseenter.fodder', '[data-fate-weapon-name="Solemn Hymn"] > .'+indicators.FODDER_INDICATOR_CLASS);
          expect($('[data-fate-weapon-name="Last Perdition"]')).not.toHaveClass('fate-search-hidden');
          expect($('[data-fate-weapon-name="Perseverance"]:eq(0)')).not.toHaveClass('fate-search-hidden');
          expect($('[data-fate-weapon-name="Perseverance"]:eq(1)')).not.toHaveClass('fate-search-hidden');
          expect($('[data-fate-weapon-name="Prosecutor"]')).toHaveClass('fate-search-hidden');
          expect($('[data-fate-weapon-name="Solemn Hymn"]')).not.toHaveClass('fate-search-hidden');
          fateBus.publish(brunchModule, 'fate.test.mouseleave.fodder', '[data-fate-weapon-name="Solemn Hymn"] > .'+indicators.FODDER_INDICATOR_CLASS);

          fateBus.publish(brunchModule, 'fate.test.mouseenter.fodder', '[data-fate-weapon-name="Alone as a god"]:eq(1) > .'+indicators.FODDER_INDICATOR_CLASS);
          expect($('[data-fate-weapon-name="Alone as a god"]:eq(0)')).not.toHaveClass('fate-search-hidden');
          expect($('[data-fate-weapon-name="Alone as a god"]:eq(0)')).not.toHaveClass('fate-search-hidden');
          expect($('[data-fate-weapon-name="Curtain Call"]')).not.toHaveClass('fate-search-hidden');
          expect($('[data-fate-weapon-name="Double-Edged Answer"]')).toHaveClass('fate-search-hidden');
          expect($('[data-fate-weapon-name="Sins of the Past"]')).toHaveClass('fate-search-hidden');
          fateBus.publish(brunchModule, 'fate.test.mouseleave.fodder', '[data-fate-weapon-name="Alone as a god"]:eq(1) > .'+indicators.FODDER_INDICATOR_CLASS);
        });

      });

    });

  });

});
