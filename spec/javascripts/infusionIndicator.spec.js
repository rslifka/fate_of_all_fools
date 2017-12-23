describe('infusionIndicator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};
  const weaponDatabase = require('weaponDatabase.js');

  // I'm not sure why I added this to the other version. Maybe when you're
  // moused over, you don't want it to kick in?
  //
  // $('body').attr('data-foaf-infusifying', true);
  // $(weapon.domElement).children('.foaf-infuse').on('mouseenter.infuse', function() {
  //   if ($('body').attr('data-foaf-infusifying') !== undefined) {
  //       return;
  //   }

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
  });

  describe('in response to a fate.dupesCalculated event', function() {

    beforeEach(function() {
      loadFixtures(
        'infusion/kineticCuboidARu303.html',   // Auto - Rare
        'infusion/kineticOriginStory306.html', // Auto
        'infusion/energyPerseverance300.html', // Auto
        'infusion/energyPerseverance305.html', // Auto
        'infusion/energyProsecutor315.html',   // Auto
        'infusion/kineticTraxLysisII312.html', // Pulse
        'infusion/powerAloneAsAGod305.html'    // Sniper
      );
    });

    describe('when a weapon has lower light than another of the same type', function() {
      it('should get an infusion icon', function() {
        fateBus.publish(brunchModule, 'fate.dupesCalculated');
        expect($('[data-fate-weapon-name="Origin Story"] .fate-infusion.fate-positive.fate-glyph.fglyph-up')).toBeVisible();
        expect($('[data-fate-weapon-name="Perseverance"] .fate-infusion.fate-positive.fate-glyph.fglyph-up')).toBeVisible();
        expect($('[data-fate-weapon-name="Perseverance"] .fate-infusion.fate-positive.fate-glyph.fglyph-up')).toBeVisible();
      });
    });

    describe('when a weapon has equal or higher light than others of the same type', function() {
      it('should not get an infusion icon', function() {
        fateBus.publish(brunchModule, 'fate.dupesCalculated');
        expect($('[data-fate-weapon-name="Prosecutor"] .fate-infusion.fate-positive.fate-glyph.fglyph-up')).toBeHidden();
      });
    });

    describe('when a weapon is a rare', function() {
      it('should not be considered for upwards infusion', function() {
        fateBus.publish(brunchModule, 'fate.dupesCalculated');
        expect($('[data-fate-weapon-name="Cuboid ARu"] .fate-infusion.fate-positive.fate-glyph.fglyph-up')).toBeHidden();
      });
    });

    describe('when a weapon is junk', function() {
      beforeEach(function() {
        spyOn(weaponDatabase, 'contains').and.returnValue(true);
        spyOn(weaponDatabase, 'get').and.callFake(function(weaponName) {
          switch(weaponName) {
            case 'Origin Story':
              return {name: 'Alone as a god', isJunk: function(){return true}};
            default:
              return {name: 'ALL_OTHER_WEAPON_NAMES', isJunk: function(){return false}};
          }
        });
      });
      it('should not get an infusion icon', function() {
        fateBus.publish(brunchModule, 'fate.dupesCalculated');
        expect($('[data-fate-weapon-name="Origin Story"] .fate-infusion.fate-positive.fate-glyph.fglyph-up')).toBeHidden();
      });
    });

    describe('when a weapon is also a dupe', function() {
      beforeEach(function() {
        $('[data-fate-weapon-name="Origin Story"]').attr('data-fate-weapon-dupe', true);
      });
      it('should bump the infusion indicator', function() {
        fateBus.publish(brunchModule, 'fate.dupesCalculated');
        expect($('[data-fate-weapon-name="Origin Story"] .fate-infusion')).toHaveClass('fate-left-bump');
      });
    });

  });


});
