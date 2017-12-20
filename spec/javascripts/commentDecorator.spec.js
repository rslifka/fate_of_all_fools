describe('commentDecorator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};

  const weaponDatabase = require('weaponDatabase');

  describe('in response to fate.refresh', function() {

    it('should replace the DIM tooltip with our comment', function() {
      loadFixtures(
        'kineticWeapon.html',
        'energyWeapon.html',
        'powerWeapon.html'
      );

      spyOn(weaponDatabase, 'contains').and.returnValue(true);
      spyOn(weaponDatabase, 'get').and.callFake(function(weaponName) {
        switch(weaponName) {
          case 'Origin Story':
            return {name: 'Origin Story', type: 'Auto Rifle', subtype: 'Precision', comments: 'Rampage makes this great for lots of adds killing'};
          case 'Annual Skate':
            return {name: 'Annual Skate', type: 'Hand Cannon', subtype: 'Adaptive', comments: 'Seems strictly worse than the Minuet?'};
          case 'Alone as a god':
            return {name: 'Alone as a god', type: 'Sniper Rifle', subtype: 'Rapid-Fire', comments: 'TT, fast ADS, fast reload, awesome'};
        }
      });

      fateBus.registerModule(brunchModule);
      fateBus.publish(brunchModule, 'fate.refresh');

      expect($('[data-fate-weapon-name="Origin Story"]')).toHaveAttr('title', "Origin Story // Auto Rifle - Precision\nRampage makes this great for lots of adds killing");
      expect($('[data-fate-weapon-name="Annual Skate"]')).toHaveAttr('title', "Annual Skate // Hand Cannon - Adaptive\nSeems strictly worse than the Minuet?");
      expect($('[data-fate-weapon-name="Alone as a god"]')).toHaveAttr('title', "Alone as a god // Sniper Rifle - Rapid-Fire\nTT, fast ADS, fast reload, awesome");
    });

  });
});
