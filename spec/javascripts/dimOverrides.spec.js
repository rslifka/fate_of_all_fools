describe('DIM Overrides', function() {

  const dimOverrides = require('dimOverrides.js');
  const postal = require('postal');

  describe('when a refresh occurs', function() {

    beforeEach(function() {
      loadFixtures(
        'kineticWeapon.html',
        'energyWeapon.html',
        'powerWeapon.html',
        'chestArmor.html'
      );
    });

    it('should remove all weapon tags tag', function() {
      expect($('[drag-channel=Kinetic],[drag-channel=Energy],[drag-channel=Power]').children('.item-tag').length).toBe(3);
      postal.publish({topic:'fate.refresh'});
      expect($('[drag-channel=Kinetic],[drag-channel=Energy],[drag-channel=Power]').children('.item-tag').length).toBe(0);
    });

    it('should leave other tags alone', function() {
      expect($('[drag-channel=Chest]').children('.item-tag').length).toBe(1);
      postal.publish({topic:'fate.refresh'});
      expect($('[drag-channel=Chest]').children('.item-tag').length).toBe(1);
    });
  });
});
