describe('weaponDecorator.js', function() {

  const postal = require('postal');

  describe('in response to fate.refresh', function() {

    beforeEach(function() {
      loadFixtures(
        'kineticWeapon.html',
        'energyWeapon.html',
        'powerWeapon.html'
      );
      postal.publish({topic:'fate.refresh'});
    });

    it('should store the original weapon name', function() {
      expect($('[drag-channel=Kinetic]')).toHaveAttr('data-fate-weapon-name', 'Origin Story');
      expect($('[drag-channel=Energy]')).toHaveAttr('data-fate-weapon-name', 'Annual Skate');
      expect($('[drag-channel=Power]')).toHaveAttr('data-fate-weapon-name', 'Alone as a god');
    });

    it('should not overwrite the original weapon name on further refreshes', function() {
      $('[drag-channel=Kinetic]').attr('title', '_');
      $('[drag-channel=Energy]').attr('title', '_');
      $('[drag-channel=Power]').attr('title', '_');
      postal.publish({topic:'fate.refresh'});
      expect($('[drag-channel=Kinetic]')).toHaveAttr('data-fate-weapon-name', 'Origin Story');
      expect($('[drag-channel=Energy]')).toHaveAttr('data-fate-weapon-name', 'Annual Skate');
      expect($('[drag-channel=Power]')).toHaveAttr('data-fate-weapon-name', 'Alone as a god');
    });

  });

});
