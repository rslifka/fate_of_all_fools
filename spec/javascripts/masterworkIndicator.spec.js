describe('masterworkIndicator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
  });

  describe('in response to fate.refresh', function() {

    beforeEach(function() {
      loadFixtures(
        'kineticWeapon.html',
        'kineticMidnightCoup.html',
        'energyWeapon.html',
        'energyPerseverance.html',
        'powerWeapon.html',
        'powerWizenedRebuke.html',
        'armorPreDecoration/chestNobleConstantType2330.html',
        'armorPreDecoration/classShadowsMark335.html',
        'armorPreDecoration/gauntletsIronTruageGauntlets335.html',
        'armorPreDecoration/legWinterhartGreaves329.html',
        'armorPreDecoration/helmetWildwoodHelm333.html'
      );

      $('[data-fate-weapon-name="Origin Story"]').attr('data-fate-masterwork', true);
      $('[data-fate-weapon-name="Midnight Coup"]').attr('data-fate-masterwork', false);
      $('[data-fate-weapon-name="Perseverance"]').attr('data-fate-masterwork', true);
      $('[data-fate-weapon-name="Annual Skate"]').attr('data-fate-masterwork', false);
      $('[data-fate-weapon-name="Alone as a god"]').attr('data-fate-masterwork', true);
      $('[data-fate-weapon-name="The Wizened Rebuke"]').attr('data-fate-masterwork', false);
    });

    it('should reserve space for a masterwork indicator', function() {
      fateBus.publish(brunchModule, 'fate.refresh');
      expect($('[data-fate-weapon-name="Origin Story"]')).toContainElement('.fate-masterwork');
      expect($('[data-fate-weapon-name="Midnight Coup"]')).toContainElement('.fate-masterwork');
      expect($('[data-fate-weapon-name="Perseverance"]')).toContainElement('.fate-masterwork');
      expect($('[data-fate-weapon-name="Annual Skate"]')).toContainElement('.fate-masterwork');
      expect($('[data-fate-weapon-name="Alone as a god"]')).toContainElement('.fate-masterwork');
      expect($('[data-fate-weapon-name="The Wizened Rebuke"]')).toContainElement('.fate-masterwork');
    });

    describe('when an item is a masterwork', function() {
      it('should have a visible glyph', function() {
        fateBus.publish(brunchModule, 'fate.refresh');
        expect($('[data-fate-weapon-name="Origin Story"] .fate-masterwork')).toBeVisible();
        expect($('[data-fate-weapon-name="Perseverance"] .fate-masterwork')).toBeVisible();
        expect($('[data-fate-weapon-name="Alone as a god"] .fate-masterwork')).toBeVisible();
      });
    });

    describe('when an item is not a mastework', function() {
      it('should have an invisible glyph', function() {
        fateBus.publish(brunchModule, 'fate.refresh');
        expect($('[data-fate-weapon-name="Midnight Coup"] .fate-masterwork')).toBeHidden();
        expect($('[data-fate-weapon-name="The Wizened Rebuke"] .fate-masterwork')).toBeHidden();
        expect($('[data-fate-weapon-name="Annual Skate"] .fate-masterwork')).toBeHidden();
      });
    });

  });

});
