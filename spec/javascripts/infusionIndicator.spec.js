describe('infusionIndicator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
  });

  describe('in response to a fate.dupesCalculated event', function() {

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
    });

    describe('messaging', function() {
      it('should announce that infusion calculation is complete', function() {
        spyOn(fateBus, 'publish').and.callThrough();
        fateBus.publish(brunchModule, 'fate.dupesCalculated');
        expect(fateBus.publish).toHaveBeenCalledWith(jasmine.any(Object),'fate.infusionCalculated');
      });
    });

    describe('when a weapon is junk', function() {
      it('should not be infusable', function() {
        $('[data-fate-weapon-name="Solemn Hymn"]').attr('data-fate-weapon-junk', true);
        fateBus.publish(brunchModule, 'fate.dupesCalculated');
        expect($('[data-fate-weapon-name="Solemn Hymn"]')).toHaveAttr('data-fate-infusable', 'false');
      });
    });

    describe('when a weapon is not a legendary or exotic', function() {
      it('should not be infusable', function() {
        fateBus.publish(brunchModule, 'fate.dupesCalculated');
        expect($('[data-fate-weapon-name="Cuboid ARu"]')).toHaveAttr('data-fate-infusable', 'false');
        expect($('[data-fate-weapon-name="Suros Throwback"][data-fate-base-light=200]')).toHaveAttr('data-fate-infusable', 'false');
        expect($('[data-fate-weapon-name="Suros Throwback"][data-fate-base-light=380]')).toHaveAttr('data-fate-infusable', 'false');
        expect($('[data-fate-weapon-name="Trax Lysis II"]')).toHaveAttr('data-fate-infusable', 'false');
      });
    });

    describe('when a weapon is not registered', function() {
      it('should not be infusable', function() {
        $('[title*="Double-Edged Answer"]').attr('data-fate-weapon-registered', 'false');
        fateBus.publish(brunchModule, 'fate.dupesCalculated');
        expect($('[title*="Double-Edged Answer"]')).toHaveAttr('data-fate-infusable', 'false');
      });
    });

    describe('when a weapon has lower light than another in the same slot', function() {
      it('should get an infusion icon', function() {
        fateBus.publish(brunchModule, 'fate.dupesCalculated');
        expect($('[data-fate-weapon-name="SUROS Regime"]')).toHaveAttr('data-fate-infusable', 'true');
        expect($('[data-fate-weapon-name="The Conqueror 2"]')).toHaveAttr('data-fate-infusable', 'true');
        expect($('[data-fate-weapon-name="Last Perdition"]')).toHaveAttr('data-fate-infusable', 'true');
        expect($('[data-fate-weapon-name="Curtain Call"]')).toHaveAttr('data-fate-infusable', 'true');
      });
    });

    describe('when a weapon has equal or higher light than others in the same slot', function() {
      it('should not get an infusion icon', function() {
        fateBus.publish(brunchModule, 'fate.dupesCalculated');
        expect($('[data-fate-weapon-name="Midnight Coup"]')).toHaveAttr('data-fate-infusable', 'false');
        expect($('[data-fate-weapon-name="Prosecutor"]')).toHaveAttr('data-fate-infusable', 'false');
        expect($('[data-fate-weapon-name="Sins of the Past"]')).toHaveAttr('data-fate-infusable', 'false');
      });
    });

    xdescribe('mouse interaction', function() {

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

  xdescribe('when some or all infusion sources are precious', function() {

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
