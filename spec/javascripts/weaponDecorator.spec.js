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
        'entireDocumentRaw-6.37.2.html'
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
            return new WeaponRollAssessment('6917529136835103644', 'Not Forgotten', '-', 'N', 'Y', 'Longer range Lunas Howl')
          case '6917529087330069226':
            return new WeaponRollAssessment('6917529087330069226', "Izanagi's Burden", '-', 'Y', 'N', 'Great for boss DPS');
          case '6917529139710693769':
            return new WeaponRollAssessment('6917529139710693769', 'Python', '-', 'N', 'N', 'Gambit shotty; just OK');
          case '6917529155622746994':
            return new WeaponRollAssessment('6917529155622746994', 'Breachlight', '9', 'Y', 'Y', '');
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
      expect($('[id=6917529154417884768]')).toHaveAttr('data-fate-weapon-name', 'Breachlight');
      expect($('[id=6917529148546196337]')).toHaveAttr('data-fate-weapon-name', "Devil's Ruin");
      expect($('[id=6917529197540757943]')).toHaveAttr('data-fate-weapon-name', 'Falling Guillotine');
      // Inventory weapons
      expect($('[id=6917529132328468093]')).toHaveAttr('data-fate-weapon-name', 'Monte Carlo');
      expect($('[id=6917529133469322158]')).toHaveAttr('data-fate-weapon-name', 'Divinity');
      expect($('[id=6917529102203233663]')).toHaveAttr('data-fate-weapon-name', 'Deathbringer');
      // Vaulted weapons
      expect($('[id=6917529152721903842]')).toHaveAttr('data-fate-weapon-name', 'Lumina');
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
      expect($('[id="6917529132328468093"]')).toHaveAttr('data-fate-light', '1001');
    });

    describe('when there are comments', function() {
      it('should replace the weapon tooltip with our comments', function() {
        expect($('[id="6917529136835103644"]')).toHaveAttr('title', "Not Forgotten\nLonger range Lunas Howl");
      });
    });

    describe('when there are no comments', function() {
      it('should leave the weapon tooltip with just the weapon name', function() {
        expect($('[id="6917529132328468093"]')).toHaveAttr('title', 'Monte Carlo');
      });
    })

    describe('supported DIM tags', function() {
      describe('negative values', function() {
        it('sets the appropriate values', function() {
          expect('[id="6917529094250649988"]').toHaveAttr('data-fate-dimtag-junk', 'false');
          expect('[id="6917529094250649988"]').toHaveAttr('data-fate-dimtag-archive', 'false');
          expect('[id="6917529094250649988"]').toHaveAttr('data-fate-dimtag-keep', 'false');
          expect('[id="6917529094250649988"]').toHaveAttr('data-fate-dimtag-infuse', 'false');
          });
        });

      describe('positive values', function() {
        it('sets the appropriate values', function() {
          expect('[id="6917529207355719839"]').toHaveAttr('data-fate-dimtag-junk', 'true');
          expect('[id="6917529207355719839"]').toHaveAttr('data-fate-dimtag-archive', 'true');
          expect('[id="6917529207355719839"]').toHaveAttr('data-fate-dimtag-keep', 'true');
          expect('[id="6917529207355719839"]').toHaveAttr('data-fate-dimtag-infuse', 'true');
        });
      });
    });

    describe('DIM wishlist', function() {
      it('abscribes the appropriate tags', function() {
        expect('[id="6917529094250649988"]').toHaveAttr('data-fate-wishlist-status', 'not-registered');
        expect('[id="6917529200493977563"]').toHaveAttr('data-fate-wishlist-status', 'accepted');
        expect('[id="6917529207375594971"]').toHaveAttr('data-fate-wishlist-status', 'rejected');
      });
    });

    describe('on subsequent refreshes', function() {

      // TODO: Each refresh, many attributes could change. These were never
      // tested, so we're going to bank the win of properly
      // testing with the new DIM document structure and come back to this.
      //
      // data-fate-dim-tags
      // data-fate-weapon-registered
      // data-fate-comment
      // data-fate-weapon-junk
      // data-fate-weapon-pve
      // data-fate-weapon-pvp
      // data-fate-wishlist-status

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
