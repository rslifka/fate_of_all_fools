describe('dimEraser.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};

  describe('when a refresh occurs', function() {

    beforeEach(function() {
      fateBus.registerModule(brunchModule);
      loadFixtures(
        'weaponTitleBlock.html',
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
      fateBus.publish(brunchModule, 'fate.refresh');
      expect($('[drag-channel=Kinetic],[drag-channel=Energy],[drag-channel=Power],[drag-channel=Helmet],[drag-channel=Gauntlets],[drag-channel=Chest],[drag-channel=Leg],[drag-channel=ClassItem]').children('.item-tag').length).toBe(0);
    });

    it('should leave other tags alone', function() {
      expect($('[drag-channel=Ghost]').children('.item-tag').length).toBe(1);
      fateBus.publish(brunchModule, 'fate.refresh');
      expect($('[drag-channel=Ghost]').children('.item-tag').length).toBe(1);
    });

  });
});
