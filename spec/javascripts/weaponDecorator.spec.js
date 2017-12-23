describe('weaponDecorator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};
  const weaponDatabase = require('weaponDatabase');

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
  });

  describe('in response to fate.refresh', function() {

    beforeEach(function() {
      loadFixtures(
        'kineticWeaponRaw.html',
        'energyWeaponRaw.html',
        'powerWeaponRaw.html'
      );

      spyOn(weaponDatabase, 'contains').and.returnValue(true);
      spyOn(weaponDatabase, 'get').and.callFake(function(weaponName) {
        switch(weaponName) {
          case 'Origin Story':
            return {name: 'Origin Story', rarity: 'legendary', type: 'Auto Rifle'};
          case 'Annual Skate':
            return {name: 'Annual Skate', rarity: 'legendary', type: 'Hand Cannon'};
          case 'Alone as a god':
            return {name: 'Alone as a god', rarity: 'legendary', type: 'Sniper Rifle'};
        }
      });

      fateBus.publish(brunchModule, 'fate.refresh');
    });

    it('should store the original weapon name', function() {
      expect($('[drag-channel=Kinetic]')).toHaveAttr('data-fate-weapon-name', 'Origin Story');
      expect($('[drag-channel=Energy]')).toHaveAttr('data-fate-weapon-name', 'Annual Skate');
      expect($('[drag-channel=Power]')).toHaveAttr('data-fate-weapon-name', 'Alone as a god');
    });

    it('should store the type of the weapon', function() {
      expect($('[drag-channel=Kinetic]')).toHaveAttr('data-fate-weapon-type', 'Auto Rifle');
      expect($('[drag-channel=Energy]')).toHaveAttr('data-fate-weapon-type', 'Hand Cannon');
      expect($('[drag-channel=Power]')).toHaveAttr('data-fate-weapon-type', 'Sniper Rifle');
    });

    it('should store the rarity of the weapon', function() {
      expect($('[drag-channel=Kinetic]')).toHaveAttr('data-fate-weapon-rarity', 'legendary');
      expect($('[drag-channel=Energy]')).toHaveAttr('data-fate-weapon-rarity', 'legendary');
      expect($('[drag-channel=Power]')).toHaveAttr('data-fate-weapon-rarity', 'legendary');
    });

    it('should store whether or not it has a legendary mod', function() {
      expect($('[drag-channel=Kinetic]')).toHaveAttr('data-fate-legmodded', 'true');
      expect($('[drag-channel=Energy]')).toHaveAttr('data-fate-legmodded', 'false');
      expect($('[drag-channel=Power]')).toHaveAttr('data-fate-legmodded', 'false');
    });

    it('should store the base light level', function() {
      expect($('[drag-channel=Kinetic]')).toHaveAttr('data-fate-base-light', '301');
      expect($('[drag-channel=Energy]')).toHaveAttr('data-fate-base-light', '305');
      expect($('[drag-channel=Power]')).toHaveAttr('data-fate-base-light', '310');
    });

    it('should not overwrite the original weapon name on further refreshes', function() {
      $('[drag-channel=Kinetic]').attr('title', '_');
      $('[drag-channel=Energy]').attr('title', '_');
      $('[drag-channel=Power]').attr('title', '_');
      fateBus.publish(brunchModule, 'fate.refresh');
      expect($('[drag-channel=Kinetic]')).toHaveAttr('data-fate-weapon-name', 'Origin Story');
      expect($('[drag-channel=Energy]')).toHaveAttr('data-fate-weapon-name', 'Annual Skate');
      expect($('[drag-channel=Power]')).toHaveAttr('data-fate-weapon-name', 'Alone as a god');
    });

  });

});
