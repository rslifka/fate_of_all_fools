describe('infusionIndicator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};
  const indicators = require('indicators.js');

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

      $('[data-fate-weapon-name]').append($('<div>', {'class': indicators.INFUSION_INDICATOR_CLASS}));
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

    describe('mouse interaction', function() {

      it('should show other infusable items in the same slot with higher light', function() {
        fateBus.publish(brunchModule, 'fate.dupesCalculated');

        fateBus.publish(brunchModule, 'fate.test.mouseenter.infuse', '[data-fate-weapon-name="Origin Story"] > .' + indicators.INFUSION_INDICATOR_CLASS);
        expect($('[data-fate-weapon-name="Suros Throwback"]:eq(0)')).toHaveClass('fate-search-hidden');
        expect($('[data-fate-weapon-name="Suros Throwback"]:eq(1)')).toHaveClass('fate-search-hidden');
        expect($('[data-fate-weapon-name="Cuboid ARu"]')).toHaveClass('fate-search-hidden');
        expect($('[data-fate-weapon-name="Midnight Coup"]')).not.toHaveClass('fate-search-hidden');
        expect($('[data-fate-weapon-name="Origin Story"]')).not.toHaveClass('fate-search-hidden');
        expect($('[data-fate-weapon-name="SUROS Regime"]')).toHaveClass('fate-search-hidden');
        expect($('[data-fate-weapon-name="The Conqueror 2"]')).toHaveClass('fate-search-hidden');
        expect($('[data-fate-weapon-name="Trax Lysis II"]')).toHaveClass('fate-search-hidden');
        fateBus.publish(brunchModule, 'fate.test.mouseleave.infuse', '[data-fate-weapon-name="Origin Story"] > .' + indicators.INFUSION_INDICATOR_CLASS);

        fateBus.publish(brunchModule, 'fate.test.mouseenter.infuse', '[data-fate-weapon-name="SUROS Regime"] .' + indicators.INFUSION_INDICATOR_CLASS);
        expect($('[data-fate-weapon-name="Suros Throwback"]:eq(0)')).toHaveClass('fate-search-hidden');
        expect($('[data-fate-weapon-name="Suros Throwback"]:eq(1)')).toHaveClass('fate-search-hidden');
        expect($('[data-fate-weapon-name="Cuboid ARu"]')).not.toHaveClass('fate-search-hidden');
        expect($('[data-fate-weapon-name="Midnight Coup"]')).not.toHaveClass('fate-search-hidden');
        expect($('[data-fate-weapon-name="Origin Story"]')).toHaveClass('fate-search-hidden');
        expect($('[data-fate-weapon-name="SUROS Regime"]')).not.toHaveClass('fate-search-hidden');
        expect($('[data-fate-weapon-name="The Conqueror 2"]')).toHaveClass('fate-search-hidden');
        expect($('[data-fate-weapon-name="Trax Lysis II"]')).not.toHaveClass('fate-search-hidden');
        fateBus.publish(brunchModule, 'fate.test.mouseleave.infuse', '[data-fate-weapon-name="SUROS Regime"] .' + indicators.INFUSION_INDICATOR_CLASS);
      });
    });
  });

});
