describe('infusionIndicator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
  });

  describe('in response to a fate.dupesCalculated event', function() {

    beforeEach(function() {
      loadFixtures(
        'infusion/kineticSurosThrowback200.html',  // Auto - Uncommon
        'infusion/kineticCuboidARu303.html',       // Auto - Rare
        'infusion/energyPerseverance300.html',     // Auto - Dupe
        'infusion/energyPerseverance305.html',     // Auto - Dupe
        'infusion/kineticOriginStory306.html',     // Auto
        'infusion/energySolemnHymn310.html',       // Auto - Junk
        'infusion/energyProsecutor315.html',       // Auto - Dupe
        'infusion/energyProsecutor315.html',       // Auto - Dupe
        'infusion/kineticTraxLysisII312.html',     // Pulse
        'infusion/powerAloneAsAGod305.html',       // Sniper
        'infusion/powerDoubleEdgedAnswer330.html', // Sword - Unregistered
      );
      $('[data-fate-weapon-name="Prosecutor"]').attr('data-fate-weapon-dupe', true);
    });

    describe('when a weapon has lower light than another of the same type', function() {
      it('should get an infusion icon', function() {
        fateBus.publish(brunchModule, 'fate.dupesCalculated');
        expect($('[data-fate-weapon-name="Origin Story"] .fate-infusion.fate-positive.fate-glyph.fglyph-up')).toBeVisible();
        expect($('[data-fate-weapon-name="Perseverance"] .fate-infusion.fate-positive.fate-glyph.fglyph-up')).toBeVisible();
      });
    });

    describe('when a weapon has equal or higher light than others of the same type', function() {
      it('should not get an infusion icon', function() {
        fateBus.publish(brunchModule, 'fate.dupesCalculated');
        expect($('[data-fate-weapon-name="Prosecutor"] .fate-infusion.fate-positive.fate-glyph.fglyph-up')).toBeHidden();
      });
    });

    describe('when a weapon is not a legendary or exotic', function() {
      it('should not be considered for upwards infusion', function() {
        fateBus.publish(brunchModule, 'fate.dupesCalculated');
        expect($('[data-fate-weapon-name="Cuboid ARu"]')).not.toContainElement('.fate-infusion.fate-positive.fate-glyph.fglyph-up');
        expect($('[data-fate-weapon-name="Suros Throwback"]')).not.toContainElement('.fate-infusion.fate-positive.fate-glyph.fglyph-up');
      });
    });

    describe('when a weapon is junk', function() {
      it('should not get an infusion icon', function() {
        fateBus.publish(brunchModule, 'fate.dupesCalculated');
        expect($('[data-fate-weapon-name="Solemn Hymn"]')).not.toContainElement('.fate-infusion.fate-positive.fate-glyph.fglyph-up');
      });
    });

    describe('when a weapon is not registered', function() {
      it('should not get an infusion icon', function() {
        fateBus.publish(brunchModule, 'fate.dupesCalculated');
        expect($('[title*="Double-Edged Answer"]')).not.toContainElement('.fate-infusion.fate-positive.fate-glyph.fglyph-up');
      });
    });

    describe('mouse interaction', function() {

      it('should show other items of the same type with higher light', function() {
        fateBus.publish(brunchModule, 'fate.dupesCalculated');

        fateBus.publish(brunchModule, 'fate.test.mouseenter.infuse', '[data-fate-weapon-name="Perseverance"]:has(.item-stat:contains(305)) .fate-infusion.fate-positive.fate-glyph.fglyph-up');
        expect($('[data-fate-weapon-name="Suros Throwback"]')).toHaveClass('fate-search-hidden');
        expect($('[data-fate-weapon-name="Cuboid ARu"]')).toHaveClass('fate-search-hidden');
        expect($('[data-fate-weapon-name="Perseverance"]:has(.item-stat:contains(300))')).toHaveClass('fate-search-hidden');
        expect($('[data-fate-weapon-name="Perseverance"]:has(.item-stat:contains(305))')).not.toHaveClass('fate-search-hidden');
        expect($('[data-fate-weapon-name="Origin Story"]')).toHaveClass('fate-search-hidden');
        expect($('[data-fate-weapon-name="Solemn Hymn"]')).not.toHaveClass('fate-search-hidden');
        expect($('[data-fate-weapon-name="Prosecutor"]')).not.toHaveClass('fate-search-hidden');
        expect($('[data-fate-weapon-name="Trax Lysis II"]')).toHaveClass('fate-search-hidden');
        expect($('[data-fate-weapon-name="Alone as a god"]')).toHaveClass('fate-search-hidden');
        expect($('[title*="Double-Edged Answer"]')).toHaveClass('fate-search-hidden');

        fateBus.publish(brunchModule, 'fate.test.mouseleave.infuse', '[data-fate-weapon-name="Perseverance"]:has(.item-stat:contains(305)) .fate-infusion.fate-positive.fate-glyph.fglyph-up');
        expect($('[data-fate-weapon-name]')).not.toHaveClass('fate-search-hidden');
      });

      it('should display the new light level over infuse targets, taking mods in to account', function() {
        $('[data-fate-weapon-name="Prosecutor"]').attr('data-fate-is-modded', true);
        $('[data-fate-weapon-name="Prosecutor"]').attr('data-fate-base-light', 310);
        fateBus.publish(brunchModule, 'fate.dupesCalculated');

        fateBus.publish(brunchModule, 'fate.test.mouseenter.infuse', '[data-fate-weapon-name="Perseverance"]:has(.item-stat:contains(300)) .fate-infusion.fate-positive.fate-glyph.fglyph-up');
        expect($('[data-fate-weapon-name="Perseverance"]')).toContainElement('div.fate-infuse-new-light:contains(305)');

        fateBus.publish(brunchModule, 'fate.test.mouseleave.infuse', '[data-fate-weapon-name="Perseverance"]:has(.item-stat:contains(300)) .fate-infusion.fate-positive.fate-glyph.fglyph-up');
        expect($('[data-fate-weapon-name]')).not.toContainElement('div.fate-infuse-new-light');
      });

    });
  });

  describe('when some or all infusion sources are precious', function() {

    describe('when all higher light items are precious', function() {
      beforeEach(function() {
        loadFixtures(
          'infusion/trickySituation/powerCrownSplitter324.html', // Sword - Precious
          'infusion/trickySituation/powerZephyr329.html',        // Sword - Unknown (i.e. not junk)
          'infusion/trickySituation/powerItStaredBack330.html',  // Sword - Precious
        );
      });
      it('should not show infusion icons on any of the weapons', function() {
        fateBus.publish(brunchModule, 'fate.dupesCalculated');
        expect($('[data-fate-weapon-name="Crown-Splitter"] .fate-infusion.fate-positive.fate-glyph.fglyph-up')).toBeHidden();
        expect($('[data-fate-weapon-name="Zephyr"] .fate-infusion.fate-positive.fate-glyph.fglyph-up')).toBeHidden();
        expect($('[data-fate-weapon-name="It Stared Back"] .fate-infusion.fate-positive.fate-glyph.fglyph-up')).toBeHidden();
      });
    });

    describe('when some higher light items are precious', function() {

      beforeEach(function() {
        loadFixtures(
          'infusion/trickySituation/powerCrownSplitter324.html', // Sword - Precious
          'infusion/trickySituation/powerZephyr329.html',        // Sword - Unknown (precious)
          'infusion/trickySituation/powerItStaredBack330.html',  // Sword - Precious, Dupe
          'infusion/trickySituation/powerItStaredBack330.html',  // Sword - Precious, Dupe
        );
        $('[data-fate-weapon-name="It Stared Back"]').attr('data-fate-weapon-dupe', true);
        fateBus.publish(brunchModule, 'fate.dupesCalculated');
      });

      it('should show infusion icons on some of the weapons', function() {
        expect($('[data-fate-weapon-name="Crown-Splitter"] .fate-infusion.fate-positive.fate-glyph.fglyph-up')).toBeVisible();
        expect($('[data-fate-weapon-name="Zephyr"] .fate-infusion.fate-positive.fate-glyph.fglyph-up')).toBeVisible();
        expect($('[data-fate-weapon-name="It Stared Back"] .fate-infusion.fate-positive.fate-glyph.fglyph-up')).toBeHidden();
      });

      describe('mouse interaction', function() {

        it('should show other items of the same type with higher light', function() {
          fateBus.publish(brunchModule, 'fate.test.mouseenter.infuse', '[data-fate-weapon-name="Crown-Splitter"] .fate-infusion.fate-positive.fate-glyph.fglyph-up');
          expect($('[data-fate-weapon-name="Crown-Splitter"]')).not.toHaveClass('fate-search-hidden');
          expect($('[data-fate-weapon-name="Zephyr"]')).toHaveClass('fate-search-hidden');
          expect($('[data-fate-weapon-name="It Stared Back"]')).not.toHaveClass('fate-search-hidden');

          fateBus.publish(brunchModule, 'fate.test.mouseleave.infuse', '[data-fate-weapon-name="Crown-Splitter"] .fate-infusion.fate-positive.fate-glyph.fglyph-up');
          expect($('[data-fate-weapon-name]')).not.toHaveClass('fate-search-hidden');
        });

        it('should display the new light level over infuse targets, taking mods in to account', function() {
          fateBus.publish(brunchModule, 'fate.test.mouseenter.infuse', '[data-fate-weapon-name="Crown-Splitter"] .fate-infusion.fate-positive.fate-glyph.fglyph-up');
          expect($('[data-fate-weapon-name="Crown-Splitter"]')).not.toContainElement('div.fate-infuse-new-light');
          expect($('[data-fate-weapon-name="Zephyr"]')).not.toContainElement('div.fate-infuse-new-light');
          expect($('[data-fate-weapon-name="It Stared Back"]')).toContainElement('div.fate-infuse-new-light:contains(330)');

          fateBus.publish(brunchModule, 'fate.test.mouseleave.infuse', '[data-fate-weapon-name="Crown-Splitter"] .fate-infusion.fate-positive.fate-glyph.fglyph-up');
          expect($('[data-fate-weapon-name]')).not.toContainElement('div.fate-infuse-new-light');
        });
      });
    });

  });

});
