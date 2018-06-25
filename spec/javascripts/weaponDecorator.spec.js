describe('weaponDecorator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};
  const weapon = require('weapon.js');
  const weaponDatabase = require('weaponDatabase').weaponDB;

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

      spyOn(weaponDatabase, 'contains').and.callFake(function(weaponName) {
        return ['Origin Story', 'Annual Skate', 'Alone as a god'].includes(weaponName);
      });
      spyOn(weaponDatabase, 'get').and.callFake(function(weaponName) {
        switch(weaponName) {
          case 'Origin Story':
            return {name: 'Origin Story', rarity: 'legendary', type: 'Auto Rifle', pveUtility: weapon.Utility.YES, pvpUtility: weapon.Utility.YES, isJunk: function(){return false}, comments: 'It\'s an auto rifle'};
          case 'Annual Skate':
            return {name: 'Annual Skate', rarity: 'legendary', type: 'Hand Cannon', pveUtility: weapon.Utility.NO, pvpUtility: weapon.Utility.NO, isJunk: function(){return true}, comments: 'This is a hankey hc'};
          case 'Alone as a god':
            return {name: 'Alone as a god', rarity: 'legendary', type: 'Sniper Rifle', pveUtility: weapon.Utility.UNKNOWN, pvpUtility: weapon.Utility.UNKNOWN, isJunk: function(){return false}, comments: 'Pretty solid sniperino'};
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
      expect($('[drag-channel=Kinetic]')).toHaveAttr('data-fate-is-modded', 'true');
      expect($('[drag-channel=Energy]')).toHaveAttr('data-fate-is-modded', 'false');
      expect($('[drag-channel=Power]')).toHaveAttr('data-fate-is-modded', 'false');
    });

    it('should store the base light level', function() {
      expect($('[drag-channel=Kinetic]')).toHaveAttr('data-fate-base-light', '301');
      expect($('[drag-channel=Energy]')).toHaveAttr('data-fate-base-light', '305');
      expect($('[drag-channel=Power]')).toHaveAttr('data-fate-base-light', '310');
    });

    it('should store if the weapon is registered', function() {
      expect($('[data-fate-weapon-name="Origin Story"]')).toHaveAttr('data-fate-weapon-registered', 'true');
      expect($('[data-fate-weapon-name="Annual Skate"]')).toHaveAttr('data-fate-weapon-registered', 'true');
      expect($('[data-fate-weapon-name="Alone as a god"]')).toHaveAttr('data-fate-weapon-registered', 'true');
      expect($('[data-fate-weapon-name="Autumn Wind"]')).not.toHaveAttr('data-fate-weapon-registered');
    });

    it('should store if the weapon is good for pve', function() {
      expect($('[data-fate-weapon-name="Origin Story"]')).toHaveAttr('data-fate-weapon-pve', 'true');
      expect($('[data-fate-weapon-name="Annual Skate"]')).not.toHaveAttr('data-fate-weapon-pve');
      expect($('[data-fate-weapon-name="Alone as a god"]')).not.toHaveAttr('data-fate-weapon-pve');
    });

    it('should store if the weapon is good for pvp', function() {
      expect($('[data-fate-weapon-name="Origin Story"]')).toHaveAttr('data-fate-weapon-pvp', 'true');
      expect($('[data-fate-weapon-name="Annual Skate"]')).not.toHaveAttr('data-fate-weapon-pvp');
      expect($('[data-fate-weapon-name="Alone as a god"]')).not.toHaveAttr('data-fate-weapon-pvp');
    });

    it('should store if the weapon is junk or not', function() {
      expect($('[data-fate-weapon-name="Origin Story"]')).not.toHaveAttr('data-fate-weapon-junk');
      expect($('[data-fate-weapon-name="Annual Skate"]')).toHaveAttr('data-fate-weapon-junk');
      expect($('[data-fate-weapon-name="Alone as a god"]')).not.toHaveAttr('data-fate-weapon-junk');
    });

    it('should store the weapon serial number', function() {
      expect($('[data-fate-weapon-name="Origin Story"]')).toHaveAttr('data-fate-serial', '6917529046110379521');
      expect($('[data-fate-weapon-name="Annual Skate"]')).toHaveAttr('data-fate-serial', '6917529045725684849');
      expect($('[data-fate-weapon-name="Alone as a god"]')).toHaveAttr('data-fate-serial', '6917529036439050577');
    });

    it('should store the comments', function() {
      expect($('[data-fate-weapon-name="Origin Story"]')).toHaveAttr('data-fate-comment', 'It\'s an auto rifle');
      expect($('[data-fate-weapon-name="Annual Skate"]')).toHaveAttr('data-fate-comment', 'This is a hankey hc');
      expect($('[data-fate-weapon-name="Alone as a god"]')).toHaveAttr('data-fate-comment', 'Pretty solid sniperino');
    });

    describe('on subsequent refreshes', function() {

      it('should not overwrite the original weapon name', function() {
        $('[drag-channel=Kinetic]').attr('title', '_');
        $('[drag-channel=Energy]').attr('title', '_');
        $('[drag-channel=Power]').attr('title', '_');
        fateBus.publish(brunchModule, 'fate.refresh');
        expect($('[drag-channel=Kinetic]')).toHaveAttr('data-fate-weapon-name', 'Origin Story');
        expect($('[drag-channel=Energy]')).toHaveAttr('data-fate-weapon-name', 'Annual Skate');
        expect($('[drag-channel=Power]')).toHaveAttr('data-fate-weapon-name', 'Alone as a god');
      });

      it('should not overwrite the base light', function() {
        $('[drag-channel=Kinetic]').children('.item-stat').text('335');
        $('[drag-channel=Energy]').children('.item-stat').text('334');
        $('[drag-channel=Power]').children('.item-stat').text('333');
        fateBus.publish(brunchModule, 'fate.refresh');
        expect($('[drag-channel=Kinetic]')).toHaveAttr('data-fate-base-light', '301');
        expect($('[drag-channel=Energy]')).toHaveAttr('data-fate-base-light', '305');
        expect($('[drag-channel=Power]')).toHaveAttr('data-fate-base-light', '310');
      });

      it('should not overwrite the serial number', function() {
        $('[drag-channel=Kinetic]').attr('id', '_');
        $('[drag-channel=Energy]').attr('id', '_');
        $('[drag-channel=Power]').attr('id', '_');
        fateBus.publish(brunchModule, 'fate.refresh');
        expect($('[data-fate-weapon-name="Origin Story"]')).toHaveAttr('data-fate-serial', '6917529046110379521');
        expect($('[data-fate-weapon-name="Annual Skate"]')).toHaveAttr('data-fate-serial', '6917529045725684849');
        expect($('[data-fate-weapon-name="Alone as a god"]')).toHaveAttr('data-fate-serial', '6917529036439050577');
      });

    });

  });

});
