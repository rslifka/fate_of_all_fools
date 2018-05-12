describe('fodderIndicator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
  });

  describe('in response to a fate.infusionCalculated event', function() {

    describe('when this weapon is not registered', function() {
      beforeEach(function() {
        loadFixtures(
          'infusion/energyPerseverance300.html', // Auto - Legendary
          'infusion/kineticOriginStory306Unregistered.html', // Auto - Legendary
        );
      });
      it('should not get a fusion indicator', function() {
        fateBus.publish(brunchModule, 'fate.infusionCalculated');
        expect($('[data-fate-weapon-name="Origin Story"] .fate-fodder.fate-middling.fate-glyph.fglyph-up')).not.toExist();
      });
    });

    describe('when there are no other weapons of the same type', function() {
      beforeEach(function() {
        loadFixtures(
          'infusion/kineticOriginStory306.html', // Auto
          'infusion/powerAloneAsAGod305.html',   // Sniper
        );
      });
      it('should not get a fusion indicator', function() {
        fateBus.publish(brunchModule, 'fate.infusionCalculated');
        expect($('[data-fate-weapon-name="Origin Story"] .fate-fodder.fate-middling.fate-glyph.fglyph-up')).toBeHidden();
      });
    });

    describe('when I am a higher light weapon', function() {

      describe('when there are only junk, uncommon or rare weapons at lower light', function() {
        beforeEach(function() {
          loadFixtures(
            'infusion/kineticSurosThrowback200.html', // Auto - Uncommon
            'infusion/energySolemnHymn300.html',      // Auto - Junk
            'infusion/kineticCuboidARu303.html',      // Auto - Rare
            'infusion/kineticOriginStory306.html',    // Auto - Legendary
          );
        });
        it('should not get a fodder indicator', function() {
          fateBus.publish(brunchModule, 'fate.infusionCalculated');
          expect($('[data-fate-weapon-name="Origin Story"] .fate-fodder.fate-middling.fate-glyph.fglyph-up')).toBeHidden();
        });
      });

      describe('when there are legendary weapons at lower light', function() {
        beforeEach(function() {
          loadFixtures(
            'infusion/energyPerseverance300.html', // Auto - Legendary
            'infusion/kineticOriginStory306.html', // Auto - Legendary
          );
        });
        it('should get a fodder indicator', function() {
          fateBus.publish(brunchModule, 'fate.infusionCalculated');
          expect($('[data-fate-weapon-name="Origin Story"] .fate-fodder.fate-middling.fate-glyph.fglyph-up')).toBeVisible();
        });
      });

      describe('when there are exotic weapons at lower light', function() {
        beforeEach(function() {
          loadFixtures(
            'infusion/kineticSweetBusiness200.html', // Auto - Exotic
            'infusion/kineticOriginStory306.html',   // Auto - Legendary
          );
        });
        it('should get a fodder indicator', function() {
          fateBus.publish(brunchModule, 'fate.infusionCalculated');
          expect($('[data-fate-weapon-name="Origin Story"] .fate-fodder.fate-middling.fate-glyph.fglyph-up')).toBeVisible();
        });
      });
    });

    describe('mouse interaction', function() {
      xit('should do some fun stuff with the mouse');
    });

  });

});
