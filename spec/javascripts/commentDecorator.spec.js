describe('commentDecorator.js', function() {

  const postal = require('postal');
  const weaponDatabase = require('weaponDatabase');

  beforeEach(function() {
    loadFixtures(
      'kineticWeapon.html',
      'energyWeapon.html',
      'powerWeapon.html'
    );
  });

  describe('in response to fate.refresh', function() {
    it('should replace the DIM tooltip with our comment', function() {
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

      postal.publish({topic:'fate.refresh'});

      expect($('[drag-channel=Kinetic]')).toHaveAttr('title', `Origin Story // Auto Rifle - Precision
Rampage makes this great for lots of adds killing`);
      expect($('[drag-channel=Energy]')).toHaveAttr('title', `Annual Skate // Hand Cannon - Adaptive
Seems strictly worse than the Minuet?`);
      expect($('[drag-channel=Power]')).toHaveAttr('title', `Alone as a god // Sniper Rifle - Rapid-Fire
TT, fast ADS, fast reload, awesome`);
    });

    it('should ignore weapons it does not know about', function() {
      postal.publish({topic:'fate.refresh'});
      expect($('[drag-channel=Kinetic]')).toHaveAttr('title', 'Origin Story');
      expect($('[drag-channel=Energy]')).toHaveAttr('title', 'Annual Skate');
      expect($('[drag-channel=Power]')).toHaveAttr('title', 'Alone as a god');
    })

  });

});
