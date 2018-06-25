describe('commentDecorator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
  });

  describe('in response to fate.refresh', function() {

    beforeEach(function() {
      loadFixtures(
        'kineticWeapon.html',
        'energyWeapon.html',
        'powerWeapon.html'
      );
      $('[data-fate-weapon-name]').attr('data-fate-weapon-registered', true);
      $('[data-fate-weapon-name="Origin Story"]').attr('data-fate-comment', 'Rampage makes this great for lots of adds killing');
      $('[data-fate-weapon-name="Origin Story"]').attr('data-fate-weapon-type', 'Auto Rifle');
      $('[data-fate-weapon-name="Annual Skate"]').attr('data-fate-comment', 'Seems strictly worse than the Minuet?');
      $('[data-fate-weapon-name="Annual Skate"]').attr('data-fate-weapon-type', 'Hand Cannon');
      $('[data-fate-weapon-name="Alone as a god"]').attr('data-fate-comment', 'TT, fast ADS, fast reload, awesome');
      $('[data-fate-weapon-name="Alone as a god"]').attr('data-fate-weapon-type', 'Sniper Rifle');
    });

    it('should replace the DIM tooltip with our comment', function() {
      fateBus.publish(brunchModule, 'fate.refresh');
      expect($('[data-fate-weapon-name="Origin Story"]')).toHaveAttr('title', "Origin Story // Auto Rifle\nRampage makes this great for lots of adds killing");
      expect($('[data-fate-weapon-name="Annual Skate"]')).toHaveAttr('title', "Annual Skate // Hand Cannon\nSeems strictly worse than the Minuet?");
      expect($('[data-fate-weapon-name="Alone as a god"]')).toHaveAttr('title', "Alone as a god // Sniper Rifle\nTT, fast ADS, fast reload, awesome");
    });

  });
});
