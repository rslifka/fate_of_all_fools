describe('modIndicator.js', function() {

  const postal = require('postal');

  describe('in response to fate.refresh', function() {

    beforeEach(function() {
      loadFixtures(
        'kineticWeaponWithMod.html',
        'energyWeaponWithMod.html',
        'powerWeaponWithMod.html',
        'helmetArmorWithMod.html',
        'gauntletsArmorWithMod.html',
        'chestArmorWithMod.html',
        'legArmorWithMod.html',
        'classItemArmorWithMod.html',
        'kineticWeapon.html',
        'energyWeapon.html',
        'powerWeapon.html',
        'helmetArmor.html',
        'gauntletsArmor.html',
        'chestArmor.html',
        'legArmor.html',
        'classItemArmor.html'
      );
    });

    it('should modify them', function() {
      postal.publish({topic:'fate.refresh'});
      let $itemStats = $('[drag-channel=Kinetic],[drag-channel=Energy],[drag-channel=Power],[drag-channel=Helmet],[drag-channel=Gauntlets],[drag-channel=Chest],[drag-channel=Leg],[drag-channel=ClassItem]').children('.item-stat');
      const powerLevels = $.map($itemStats, function(element, index) {
        return $(element).text();
      });
      expect(powerLevels).toEqual([
        '305M', '305M', '305M', '314M', '304M', '305M', '314M', '316M',
        '305', '305', '305', '314', '304', '305', '314', '316'
      ]);
    });

    it('should not modify them on subsequent refreshes', function() {
      postal.publish({topic:'fate.refresh'});
      postal.publish({topic:'fate.refresh'});
      let $itemStats = $('[drag-channel=Kinetic],[drag-channel=Energy],[drag-channel=Power],[drag-channel=Helmet],[drag-channel=Gauntlets],[drag-channel=Chest],[drag-channel=Leg],[drag-channel=ClassItem]').children('.item-stat');
      const powerLevels = $.map($itemStats, function(element, index) {
        return $(element).text();
      });
      expect(powerLevels).toEqual([
        '305M', '305M', '305M', '314M', '304M', '305M', '314M', '316M',
        '305', '305', '305', '314', '304', '305', '314', '316'
      ]);
    });

  });

});
