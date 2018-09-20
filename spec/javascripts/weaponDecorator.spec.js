describe('weaponDecorator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};
  const weapon = require('weapon.js');
  const weaponDatabase = require('weaponDatabase.js').weaponDB;
  const rollDatabase = require('rollDatabase.js').rollDB;

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
  });

  describe('in response to fate.refresh', function() {

    beforeEach(function() {
      loadFixtures(
        'weaponDecoratorInventoryRaw.html'
      );
      spyOn(weaponDatabase, 'contains').and.callFake(function(weaponName) {
        return ['Ace of Spades', 'Go Figure', 'Subtle Calamity', 'Edge Transit'].includes(weaponName);
      });
      spyOn(weaponDatabase, 'get').and.callFake(function(weaponName) {
        switch(weaponName) {
          // One Primary (which is overriden by a custom roll rating)
          case 'Ace of Spades':
            return {name: 'Ace of Spades', rarity: 'exotic', type: 'Hand Cannon', pveUtility: weapon.Utility.UNKNOWN, pvpUtility: weapon.Utility.UNKNOWN, isJunk: function(){return false}, comments: 'RIP CAYDE'};
          // One Primary
          case 'Go Figure':
            return {name: 'Go Figure', rarity: 'legendary', type: 'Pulse Rifle', pveUtility: weapon.Utility.UNKNOWN, pvpUtility: weapon.Utility.UNKNOWN, isJunk: function(){return false}, comments: 'Can be good'};
          // One Secondary
          case 'Subtle Calamity':
            return {name: 'Subtle Calamity', rarity: 'legendary', type: 'Combat Bow', pveUtility: weapon.Utility.NO, pvpUtility: weapon.Utility.NO, isJunk: function(){return true}, comments: 'Arrows r great'};
          // One Heavy
          case 'Edge Transit':
            return {name: 'Edge Transit', rarity: 'legendary', type: 'Grenade Launcher', pveUtility: weapon.Utility.YES, pvpUtility: weapon.Utility.YES, isJunk: function(){return false}, comments: 'I wish more of these would drop'};
        }
      });

      spyOn(rollDatabase, 'contains').and.callFake(function(rollID) {
        return ['6917529071788725024'].includes(rollID);
      });
      spyOn(rollDatabase, 'get').and.callFake(function(weaponName) {
        switch(weaponName) {
          case '6917529071788725024':
            return {rollID: '6917529071788725024', name: 'Ace of Spades', pveUtility: weapon.Utility.NO, pvpUtility: weapon.Utility.NO, isJunk: function(){return true}, comments: 'Not a fan of this roll'};
        }
      });

      fateBus.publish(brunchModule, 'fate.refresh');
    });

    it('should store the original weapon name', function() {
      expect($('[title*=Ace]')).toHaveAttr('data-fate-weapon-name', 'Ace of Spades');
      expect($('[title*=Figure]')).toHaveAttr('data-fate-weapon-name', 'Go Figure');
      expect($('[title*=Calamity]')).toHaveAttr('data-fate-weapon-name', 'Subtle Calamity');
      expect($('[title*=Transit]')).toHaveAttr('data-fate-weapon-name', 'Edge Transit');
    });

    it('should store the type of the weapon', function() {
      expect($('[title*=Ace]')).toHaveAttr('data-fate-weapon-type', 'Hand Cannon');
      expect($('[title*=Figure]')).toHaveAttr('data-fate-weapon-type', 'Pulse Rifle');
      expect($('[title*=Calamity]')).toHaveAttr('data-fate-weapon-type', 'Combat Bow');
      expect($('[title*=Transit]')).toHaveAttr('data-fate-weapon-type', 'Grenade Launcher');
    });

    it('should store the rarity of the weapon', function() {
      expect($('[title*=Ace]')).toHaveAttr('data-fate-weapon-rarity', 'exotic');
      expect($('[title*=Figure]')).toHaveAttr('data-fate-weapon-rarity', 'legendary');
      expect($('[title*=Calamity]')).toHaveAttr('data-fate-weapon-rarity', 'legendary');
      expect($('[title*=Transit]')).toHaveAttr('data-fate-weapon-rarity', 'legendary');
    });

    it('should store whether or not it is a masterwork', function() {
      expect($('[title*=Ace]')).toHaveAttr('data-fate-masterwork', 'false');
      expect($('[title*=Figure]')).toHaveAttr('data-fate-masterwork', 'false');
      expect($('[title*=Calamity]')).toHaveAttr('data-fate-masterwork', 'false');
      expect($('[title*=Transit]')).toHaveAttr('data-fate-masterwork', 'false');
    });

    it('should store the base light level', function() {
      expect($('[title*=Ace]')).toHaveAttr('data-fate-base-light', '545');
      expect($('[title*=Figure]')).toHaveAttr('data-fate-base-light', '523');
      expect($('[title*=Calamity]')).toHaveAttr('data-fate-base-light', '527');
      expect($('[title*=Transit]')).toHaveAttr('data-fate-base-light', '545');
    });

    it('should store if the weapon is registered', function() {
      expect($('[title*=Ace]')).toHaveAttr('data-fate-weapon-registered', 'true');
      expect($('[title*=Figure]')).toHaveAttr('data-fate-weapon-registered', 'true');
      expect($('[title*=Calamity]')).toHaveAttr('data-fate-weapon-registered', 'true');
      expect($('[title*=Transit]')).toHaveAttr('data-fate-weapon-registered', 'true');
      expect($('[title*=Crimson]')).toHaveAttr('data-fate-weapon-registered', 'false');
    });

    it('should store if the weapon is good for pve', function() {
      expect($('[title*=Ace]')).toHaveAttr('data-fate-weapon-pve', 'false');
      expect($('[title*=Figure]')).toHaveAttr('data-fate-weapon-pve', 'false');
      expect($('[title*=Calamity]')).toHaveAttr('data-fate-weapon-pve', 'false');
      expect($('[title*=Transit]')).toHaveAttr('data-fate-weapon-pve', 'true');
    });

    it('should store if the weapon is good for pvp', function() {
      expect($('[title*=Ace]')).toHaveAttr('data-fate-weapon-pvp', 'false');
      expect($('[title*=Figure]')).toHaveAttr('data-fate-weapon-pvp', 'false');
      expect($('[title*=Calamity]')).toHaveAttr('data-fate-weapon-pvp', 'false');
      expect($('[title*=Transit]')).toHaveAttr('data-fate-weapon-pvp', 'true');
    });

    it('should store if the weapon is junk or not', function() {
      expect($('[title*=Ace]')).toHaveAttr('data-fate-weapon-junk', 'true');
      expect($('[title*=Figure]')).toHaveAttr('data-fate-weapon-junk', 'false');
      expect($('[title*=Calamity]')).toHaveAttr('data-fate-weapon-junk', 'true');
      expect($('[title*=Transit]')).toHaveAttr('data-fate-weapon-junk', 'false');
    });

    it('should store the weapon serial number', function() {
      expect($('[title*=Ace]')).toHaveAttr('data-fate-serial', '6917529071788725024');
      expect($('[title*=Calamity]')).toHaveAttr('data-fate-serial', '6917529071785738876');
      expect($('[title*=Figure]')).toHaveAttr('data-fate-serial', '6917529071761031585');
      expect($('[title*=Transit]')).toHaveAttr('data-fate-serial', '6917529070743721064');
    });

    it('should store if the weapon has a specific roll rated', function() {
      expect($('[title*=Ace]')).toHaveAttr('data-fate-roll-stored', 'true');
      expect($('[title*=Calamity]')).toHaveAttr('data-fate-roll-stored', 'false');
      expect($('[title*=Figure]')).toHaveAttr('data-fate-roll-stored', 'false');
      expect($('[title*=Transit]')).toHaveAttr('data-fate-roll-stored', 'false');
    });

    it('should store the comments', function() {
      expect($('[title*=Ace]')).toHaveAttr('data-fate-comment', 'Not a fan of this roll');
      expect($('[title*=Figure]')).toHaveAttr('data-fate-comment', 'Can be good');
      expect($('[title*=Calamity]')).toHaveAttr('data-fate-comment', 'Arrows r great');
      expect($('[title*=Transit]')).toHaveAttr('data-fate-comment', 'I wish more of these would drop');
    });

    describe('on subsequent refreshes', function() {

      it('should not overwrite the original weapon name', function() {
        $('[title*=Ace]').attr('title', '_');
        $('[title*=Calamity]').attr('title', '_');
        $('[title*=Transit]').attr('title', '_');
        fateBus.publish(brunchModule, 'fate.refresh');
        expect($('[id=6917529071788725024-ps545]')).toHaveAttr('data-fate-weapon-name', 'Ace of Spades');
        expect($('[id=6917529071785738876-ps527]')).toHaveAttr('data-fate-weapon-name', 'Subtle Calamity');
        expect($('[id=6917529070743721064-ps545]')).toHaveAttr('data-fate-weapon-name', 'Edge Transit');
      });

      it('should not overwrite the base light', function() {
        $('[title*=Ace]').children('.item-stat').text('335');
        $('[title*=Calamity]').children('.item-stat').text('334');
        $('[title*=Transit]').children('.item-stat').text('333');
        fateBus.publish(brunchModule, 'fate.refresh');
        expect($('[id=6917529071788725024-ps545]')).toHaveAttr('data-fate-base-light', '545');
        expect($('[id=6917529071785738876-ps527]')).toHaveAttr('data-fate-base-light', '527');
        expect($('[id=6917529070743721064-ps545]')).toHaveAttr('data-fate-base-light', '545');
      });

      it('should not overwrite the serial number', function() {
        $('[id=6917529071788725024-ps545]').attr('id', '_');
        $('[id=6917529071785738876-ps527]').attr('id', '_');
        $('[id=6917529070743721064-ps545]').attr('id', '_');
        fateBus.publish(brunchModule, 'fate.refresh');
        expect($('[title*=Ace]')).toHaveAttr('data-fate-serial', '6917529071788725024');
        expect($('[title*=Calamity]')).toHaveAttr('data-fate-serial', '6917529071785738876');
        expect($('[title*=Transit]')).toHaveAttr('data-fate-serial', '6917529070743721064');
      });

      it('should overwrite the roll stored status', function() {
        $('[title*=Ace]').attr('data-fate-serial', '6917529071788725024');
        fateBus.publish(brunchModule, 'fate.refresh');
        expect($('[title*=Ace]')).toHaveAttr('data-fate-roll-stored', 'true');
      });

    });

  });

  describe('when a weapon is no longer in the database', function() {

    let weaponRegistered = true;

    beforeEach(function() {
      loadFixtures(
        'weaponDecoratorInventoryRaw.html',
      );
      spyOn(weaponDatabase, 'contains').and.callFake(function(weaponName) {
        return weaponRegistered;
      });
      spyOn(weaponDatabase, 'get').and.callFake(function(weaponName) {
        return {name: 'Ace of Spades', rarity: 'legendary', type: 'Auto Rifle', pveUtility: weapon.Utility.YES, pvpUtility: weapon.Utility.YES, isJunk: function(){return false}, comments: 'It\'s an auto rifle'};
      });
    });

    it('should clear the registration status', function() {
      fateBus.publish(brunchModule, 'fate.refresh');
      expect($('[title*=Ace]')).toHaveAttr('data-fate-weapon-registered', 'true');
      weaponRegistered = false;
      fateBus.publish(brunchModule, 'fate.refresh');
      expect($('[title*=Ace]')).toHaveAttr('data-fate-weapon-registered', 'false');
    });
  });

});
