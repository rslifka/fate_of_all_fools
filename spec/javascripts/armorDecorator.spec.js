xdescribe('armorDecorator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};
  const armorRollDatabase = require('armorRollDatabase.js').armorRollDB;
  const ArmorRoll = require('armorRoll.js').ArmorRoll;
  const elementDetector = require('elementDetector.js');

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
  });

  describe('masterwork checking', function() {
    beforeEach(function() {
      loadFixtures('armor/gauntlets-6.43.2.html');
      fateBus.publish(brunchModule, 'fate.refresh');
    });
  
    describe('when an item is not registered', function() {
      it('should store the masterwork status', function() {
        expect('[id=6917529194053499244]').toHaveAttr('data-fate-masterwork', 'true');
        expect('[id=6917529223628313385]').toHaveAttr('data-fate-masterwork', 'false');
      });
    });
  });

  describe('armor element', function() {
    beforeEach(function() {
      spyOn(elementDetector, 'getElementFromURL').and.returnValue('void');
      loadFixtures( 'armor/gauntlets-6.43.2.html' );
      fateBus.publish(brunchModule, 'fate.refresh');
    });
    
    describe('when an item is not registered', function() {
      it('should store the armor element', function() {
        expect(elementDetector.getElementFromURL).toHaveBeenCalledWith('https://www.bungie.net/common/destiny2_content/icons/DestinyEnergyTypeDefinition_ceb2f6197dccf3958bb31cc783eb97a0.png');
        expect($('[id=6917529194053499244]')).toHaveAttr('data-fate-element', 'void');
      }); 
    });
  });

  describe('in response to fate.refresh', function() {

    beforeEach(function() {
      spyOn(armorRollDatabase, 'contains').and.callFake(function(rollID) {
        return ['6917529143732442281', '6917529143764907014'].includes(rollID);
      });
      spyOn(armorRollDatabase, 'get').and.callFake(function(rollID) {
        switch(rollID) {
          case '6917529143732442281':
            return new ArmorRoll( '6917529143732442281', 'Vesper of Radius', 'Solar', 'Y', 'N', '', '59', '0', '11', '7', '12', '23', '6');
          case '6917529143764907014':
            return new ArmorRoll( '6917529143764907014', 'Wings of Sacred Dawn', 'Solar', 'Y', 'N', 'top-tree dawn', '69', '10', '11', '7', '12', '23', '6');
        }
      });

      loadFixtures(
        'entireDocumentRaw-5.73.0.html',
      );

      // Indicators creates the glyph space whose contents we're validating in some of our tests
      fateBus.unmute('indicators.js');
      fateBus.publish(brunchModule, 'fate.refresh');
      // Once more, to ensure indicators get a chance to register
      fateBus.publish(brunchModule, 'fate.refresh');
    });

    /*
      We're using this first spec to ensure that we "visit" armor in each of
      the three locations for each type of armor. Subsequent tests won't be this
      thorough under the assumption that we will use the same visitation logic
      to decide which armor to treat.
    */
    it('should store the original armor name', function() {
      // Equipped
      expect('[id=6917529114410685006]').toHaveAttr('data-fate-armor-name', 'Iron Will Hood');
      expect('[id=6917529147051786945]').toHaveAttr('data-fate-armor-name', 'Prodigal Gloves');
      expect('[id=6917529101903668442]').toHaveAttr('data-fate-armor-name', 'Ankaa Seeker IV');
      expect('[id=6917529142423687024]').toHaveAttr('data-fate-armor-name', 'Transversive Steps');
      expect('[id=6917529131137502844]').toHaveAttr('data-fate-armor-name', 'Binary Phoenix Bond');

      // Inventoried
      expect('[id=6917529164308367381]').toHaveAttr('data-fate-armor-name', 'Seventh Seraph Hood');
      expect('[id=6917529133452736271]').toHaveAttr('data-fate-armor-name', 'Gloves of Exaltation');
      expect('[id=6917529164308367382]').toHaveAttr('data-fate-armor-name', 'Seventh Seraph Robes');
      expect('[id=6917529164308367384]').toHaveAttr('data-fate-armor-name', 'Seventh Seraph Boots');
      expect('[id=6917529164308367383]').toHaveAttr('data-fate-armor-name', 'Seventh Seraph Bond');

      // Vaulted
      expect('[id=6917529136636191278]').toHaveAttr('data-fate-armor-name', 'The Stag');
      expect('[id=6917529140015081019]').toHaveAttr('data-fate-armor-name', 'Sunbracers');
      expect('[id=6917529143732442281]').toHaveAttr('data-fate-armor-name', 'Vesper of Radius');
      expect('[id=6917529142423687024]').toHaveAttr('data-fate-armor-name', 'Transversive Steps');
      expect('[id=6917529094184040124]').toHaveAttr('data-fate-armor-name', 'Notorious Sentry Bond');
    });

    it('should record the registration status', function() {
      expect('[id=6917529114410685006]').toHaveAttr('data-fate-armor-registered', 'false');
      expect('[id=6917529143732442281]').toHaveAttr('data-fate-armor-registered', 'true');
    });

    it('should record the serial number', function() {
      expect('[id=6917529114410685006]').toHaveAttr('data-fate-serial', '6917529114410685006');
    });

    it('should store if the armor is good for pve', function() {
      expect($('[id=6917529143732442281]')).toHaveAttr('data-fate-armor-pve', 'true');
    });

    it('should store if the armor is good for pvp', function() {
      expect($('[id=6917529143732442281]')).toHaveAttr('data-fate-armor-pvp', 'false');
    });

    it('should store if the armor is junk or not', function() {
      expect($('[id=6917529143732442281]')).toHaveAttr('data-fate-armor-junk', 'false');
    });

    // TODO: We keep having to update these because the class names change. Need
    //       a better solution here.
    xit('should store the light', function() {
      expect($('[id=6917529143732442281]')).toHaveAttr('data-fate-light', '961');
    });

    it('should store the overlay text', function() {
      expect($('[id=6917529143764907014] > .foaf-item-overlay')).toExist();
      expect($('[id=6917529143764907014] > .foaf-item-overlay')).toContainText('top-tree dawn');
    });

    describe('supported DIM tags', function() {

      it('should store if it was not tagged with junk', function() {
        expect($('[id="6917529143732442281"]')).toHaveAttr('data-fate-dimtag-junk', 'false');
      });

      it('should store if it was tagged with junk', function() {
        expect($('[id="6917529110404742585"]')).toHaveAttr('data-fate-dimtag-junk', 'true');
      });

      it('should store if it was not tagged with archive', function() {
        expect($('[id="6917529143732442281"]')).toHaveAttr('data-fate-dimtag-archive', 'false');
      });

      it('should store if it was tagged with archive', function() {
        expect($('[id="6917529094280677113"]')).toHaveAttr('data-fate-dimtag-archive', 'true');
      });

      it('should store if it was not tagged with keep', function() {
        expect($('[id="6917529143732442281"]')).toHaveAttr('data-fate-dimtag-keep', 'false');
      });

      it('should store if it was tagged with keep', function() {
        expect($('[id="6917529100955780876"]')).toHaveAttr('data-fate-dimtag-keep', 'true');
      });

      it('should store if it was not tagged with favourite', function() {
        expect($('[id="6917529143732442281"]')).toHaveAttr('data-fate-dimtag-favourite', 'false');
      });

      it('should store if it was tagged with favourite', function() {
        expect($('[id="6917529110564948888"]')).toHaveAttr('data-fate-dimtag-favourite', 'true');
      });

    });

    describe('on subsequent refreshes', function() {

      describe('things that should update', function() {
        // TODO: These were never tested, so we're going to bank the win of properly
        // testing with the new DIM document structure and come back to this.
        // data-fate-dim-tags
        // data-fate-armor-registered
        // data-fate-armor-junk
        // data-fate-armor-pve
        // data-fate-armor-pvp
        // data-fate-light
      });

      describe('things that should NOT update', function() {
        
        it('should not overwrite the original armor name', function() {
          $('[id=6917529143732442281]').attr('title', '_REMOVAL-TEST_');
          fateBus.publish(brunchModule, 'fate.refresh');
          expect($('[id=6917529143732442281]')).toHaveAttr('data-fate-armor-name', 'Vesper of Radius');
        });
  
        it('should not overwrite the serial number', function() {
          $('[id=6917529143732442281]').attr('id', '_REMOVAL-TEST_');
          fateBus.publish(brunchModule, 'fate.refresh');
          expect($('[id=_REMOVAL-TEST_]')).toHaveAttr('data-fate-serial', '6917529143732442281');
        });

      });

    });

  });

});
