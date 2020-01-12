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
        'entireDocumentRaw-5.62.0.html'
      );
      spyOn(rollDatabase, 'contains').and.callFake(function(rollID) {
        return [
          '6917529136835103644',
          '6917529087330069226',
          '6917529139710693769'
        ].includes(rollID);
      });
      spyOn(rollDatabase, 'get').and.callFake(function(rollID) {
        switch(rollID) {
          case '6917529136835103644':
            return new WeaponRollAssessment('6917529136835103644', 'Not Forgotten', 'N', 'Y', 'Longer range Lunas Howl')
          case '6917529087330069226':
            return new WeaponRollAssessment('6917529087330069226', "Izanagi's Burden", 'Y', 'N', 'Great for boss DPS');
          case '6917529139710693769':
            return new WeaponRollAssessment('6917529139710693769', 'Python', 'N', 'N', 'Gambit shotty; just OK');
          default:
            return null;
        }
      });

      fateBus.publish(brunchModule, 'fate.refresh');
    });

    /*
      We're using this first spec to ensure that we "visit" weapons in each of
      the three locations in each row. Subsequent tests won't be this thorough
      under the assumption that we will use the same visitation logic to decide
      which weapons to treat.
    */
    it('should store the original weapon name', function() {
      // Equipped weapons
      expect($('[id=6917529132328468093]')).toHaveAttr('data-fate-weapon-name', 'Monte Carlo');
      expect($('[id=6917529136835103644]')).toHaveAttr('data-fate-weapon-name', 'Not Forgotten');
      expect($('[id=6917529144055150384]')).toHaveAttr('data-fate-weapon-name', 'Shining Sphere');
      // Inventory weapons
      expect($('[id=6917529135296833296]')).toHaveAttr('data-fate-weapon-name', 'MIDA Multi-Tool');
      expect($('[id=6917529139710693769]')).toHaveAttr('data-fate-weapon-name', 'Python');
      expect($('[id=6917529073791516079]')).toHaveAttr('data-fate-weapon-name', 'The Wardcliff Coil');
      // Vaulted weapons
      expect($('[id=6917529087330069226]')).toHaveAttr('data-fate-weapon-name', "Izanagi's Burden");
      expect($('[id=6917529140859736767]')).toHaveAttr('data-fate-weapon-name', 'Symmetry');
      expect($('[id=6917529112718125981]')).toHaveAttr('data-fate-weapon-name', 'One Thousand Voices');
    });

    it('should store whether or not it is a masterwork', function() {
      expect($('[id=6917529136835103644]')).toHaveAttr('data-fate-masterwork', 'true');
      expect($('[id=6917529132328468093]')).toHaveAttr('data-fate-masterwork', 'false');
    });

    it('should store if the weapon is registered', function() {
      expect($('[id=6917529136835103644]')).toHaveAttr('data-fate-weapon-registered', 'true');
      expect($('[id=6917529132328468093]')).toHaveAttr('data-fate-weapon-registered', 'false');
    });

    it('should store if the weapon is good for pve', function() {
      expect($('[id=6917529087330069226]')).toHaveAttr('data-fate-weapon-pve', 'true');
      expect($('[id=6917529136835103644]')).toHaveAttr('data-fate-weapon-pve', 'false');
    });

    it('should store if the weapon is good for pvp', function() {
      expect($('[id=6917529136835103644]')).toHaveAttr('data-fate-weapon-pvp', 'true');
      expect($('[id=6917529087330069226]')).toHaveAttr('data-fate-weapon-pvp', 'false');
    });

    it('should store if the weapon is junk or not', function() {
      expect($('[id=6917529139710693769]')).toHaveAttr('data-fate-weapon-junk', 'true');
      expect($('[id=6917529136835103644]')).toHaveAttr('data-fate-weapon-junk', 'false');
    });

    it('should store the weapon serial number', function() {
      expect($('[id=6917529136835103644]')).toHaveAttr('data-fate-serial', '6917529136835103644');
    });

    it('should store the comments', function() {
      expect($('[id=6917529136835103644]')).toHaveAttr('data-fate-comment', 'Longer range Lunas Howl');
    });

    it('should record the light', function() {
      expect('[id="6917529136835103644"]').toHaveAttr('data-fate-light', '956');
    });

    describe('supported DIM tags', function() {

      it('should store if it was not tagged with junk', function() {
        expect('[id="6917529094250649988"]').toHaveAttr('data-fate-dimtag-junk', 'false');
      });

      it('should store if it was tagged with junk', function() {
        expect('[id="6917529142836279186"]').toHaveAttr('data-fate-dimtag-junk', 'true');
      });

      it('should store if it was not tagged with archive', function() {
        expect('[id="6917529094250649988"]').toHaveAttr('data-fate-dimtag-archive', 'false');
      });

      it('should store if it was tagged with archive', function() {
        expect('[id="6917529143990647252"]').toHaveAttr('data-fate-dimtag-archive', 'true');
      });

      it('should store if not present in the DIM wishlist', function() {
        expect('[id="6917529100602656437"]').toHaveAttr('data-fate-wishlist-status', 'not-registered');
      });

      it('should store if the DIM wishlist likes it', function() {
        expect('[id="6917529139131772400"]').toHaveAttr('data-fate-wishlist-status', 'accepted');
      });

      it('should store if the DIM wishlist does not like it', function() {
        expect('[id="6917529143743532153"]').toHaveAttr('data-fate-wishlist-status', 'rejected');
      });
      
    });

    describe('on subsequent refreshes', function() {

      describe('things that should update', function() {
        // TODO: These were never tested, so we're going to bank the win of properly
        // testing with the new DIM document structure and come back to this.
        // data-fate-dim-tags
        // data-fate-weapon-registered
        // data-fate-comment
        // data-fate-weapon-junk
        // data-fate-weapon-pve
        // data-fate-weapon-pvp
        // data-fate-wishlist-status
      });

      describe('things that should NOT update', function() {
        
        it('should not overwrite the original weapon name', function() {
          $('[id=6917529132328468093]').attr('title', '_');
          fateBus.publish(brunchModule, 'fate.refresh');
          expect($('[id=6917529132328468093]')).toHaveAttr('data-fate-weapon-name', 'Monte Carlo');
        });
  
        it('should not overwrite the serial number', function() {
          $('[id=6917529132328468093]').attr('id', '_REMOVAL-TEST_');
          fateBus.publish(brunchModule, 'fate.refresh');
          expect($('[id=_REMOVAL-TEST_]')).toHaveAttr('data-fate-serial', '6917529132328468093');
        });

      });

    });

  });

});
