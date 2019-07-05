describe('weaponDecorator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};
  const WeaponRollAssessment = require('weaponRollAssessment.js').WeaponRollAssessment;
  const rollDatabase = require('weaponRollDatabase.js').weaponRollDB;

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
  });

  describe('in response to fate.refresh', function() {

    beforeEach(function() {
      loadFixtures(
        'weaponDecoratorInventoryRaw.html'
      );
      spyOn(rollDatabase, 'contains').and.callFake(function(rollID) {
        return ['6917529071788725024','6917529071785738876','6917529071761031585','6917529070743721064'].includes(rollID);
      });
      spyOn(rollDatabase, 'get').and.callFake(function(rollID) {
        switch(rollID) {
          case '6917529071788725024':
            return new WeaponRollAssessment('6917529071788725024', 'Ace of Spades', 'N', 'N', 'Not a fan of this roll')
            break;
          case '6917529071761031585':
            return new WeaponRollAssessment('6917529071761031585', 'Go Figure', '?', '?', 'Can be good');
            break;
          case '6917529071785738876':
            return new WeaponRollAssessment('6917529071785738876', 'Subtle Calamity', 'N', 'N', 'Arrows r great');
            break;
          case '6917529070743721064':
            return new WeaponRollAssessment('6917529070743721064', 'Edge Transit', 'Y', 'Y', 'I wish more of these would drop');
            break;
          default:
            return null;
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

    it('should store whether or not it is a masterwork', function() {
      expect($('[title*=Ace]')).toHaveAttr('data-fate-masterwork', 'false');
      expect($('[title*=Figure]')).toHaveAttr('data-fate-masterwork', 'false');
      expect($('[title*=Calamity]')).toHaveAttr('data-fate-masterwork', 'false');
      expect($('[title*=Transit]')).toHaveAttr('data-fate-masterwork', 'false');
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
      expect($('[title*=Figure]')).toHaveAttr('data-fate-serial', '6917529071761031585');
      expect($('[title*=Calamity]')).toHaveAttr('data-fate-serial', '6917529071785738876');
      expect($('[title*=Transit]')).toHaveAttr('data-fate-serial', '6917529070743721064');
    });

    it('should store the comments', function() {
      expect($('[title*=Ace]')).toHaveAttr('data-fate-comment', 'Not a fan of this roll');
      expect($('[title*=Figure]')).toHaveAttr('data-fate-comment', 'Can be good');
      expect($('[title*=Calamity]')).toHaveAttr('data-fate-comment', 'Arrows r great');
      expect($('[title*=Transit]')).toHaveAttr('data-fate-comment', 'I wish more of these would drop');
    });

    it('should record the DIM tags as their own attributions', function() {
      expect('[id="6917529071788725024-ps545"]').toHaveAttr('data-fate-dim-tags', 'lock');
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

      it('should not overwrite the serial number', function() {
        $('[id=6917529071788725024-ps545]').attr('id', '_');
        $('[id=6917529071785738876-ps527]').attr('id', '_');
        $('[id=6917529070743721064-ps545]').attr('id', '_');
        fateBus.publish(brunchModule, 'fate.refresh');
        expect($('[title*=Ace]')).toHaveAttr('data-fate-serial', '6917529071788725024');
        expect($('[title*=Calamity]')).toHaveAttr('data-fate-serial', '6917529071785738876');
        expect($('[title*=Transit]')).toHaveAttr('data-fate-serial', '6917529070743721064');
      });

      it('should overwrite the registration status', function() {
        $('[title*=Ace]').attr('data-fate-serial', '6917529071788725024');
        fateBus.publish(brunchModule, 'fate.refresh');
        expect($('[title*=Ace]')).toHaveAttr('data-fate-weapon-registered', 'true');
      });

    });

  });

  describe('when the per-item popup is present', function() {
    it('should not mistake the popup for a weapon', function() {
      loadFixtures(
        'weaponDecoratorInventoryRaw.html',
        'weaponPopup.html'
      );
      fateBus.publish(brunchModule, 'fate.refresh');
      expect($('[title="Unlock Hand Cannon"]')).toExist();
    });
  });

});
