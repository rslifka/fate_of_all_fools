describe('DIM Overrides', function() {

  const dimOverrides = require('dimOverrides.js');
  const postal = require('postal');

  describe('when a refresh occurs', function() {

    beforeEach(function() {
      loadFixtures(
        'kineticWeapon.html',
        'energyWeapon.html',
        'powerWeapon.html',
        'helmetArmor.html',
        'gauntletsArmor.html',
        'chestArmor.html',
        'legArmor.html',
        'classItemArmor.html',
        'ghost.html'
      );
    });

    it('should remove all weapon and armor tags', function() {
      expect($('[drag-channel=Kinetic],[drag-channel=Energy],[drag-channel=Power],[drag-channel=Helmet],[drag-channel=Gauntlets],[drag-channel=Chest],[drag-channel=Leg],[drag-channel=ClassItem]').children('.item-tag').length).toBe(8);
      postal.publish({topic:'fate.refresh'});
      expect($('[drag-channel=Kinetic],[drag-channel=Energy],[drag-channel=Power],[drag-channel=Helmet],[drag-channel=Gauntlets],[drag-channel=Chest],[drag-channel=Leg],[drag-channel=ClassItem]').children('.item-tag').length).toBe(0);
    });

    it('should leave other tags alone', function() {
      expect($('[drag-channel=Ghost]').children('.item-tag').length).toBe(1);
      postal.publish({topic:'fate.refresh'});
      expect($('[drag-channel=Ghost]').children('.item-tag').length).toBe(1);
    });
  });
});
