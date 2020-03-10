describe('armorDecorator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};
  const armorRollDatabase = require('armorRollDatabase.js').armorRollDB;
  const ArmorRoll = require('armorRoll.js').ArmorRoll;

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
    spyOn(armorRollDatabase, 'contains').and.callFake(function(rollID) {
      return ['6917529143732442281'].includes(rollID);
    });
    spyOn(armorRollDatabase, 'get').and.callFake(function(rollID) {
      if ('6917529143732442281' === rollID) {
        return new ArmorRoll(
          '6917529143732442281',
          'Vesper of Radius',
          'Solar',
          '23',
          'Y',
          'N',
          '10',
          '11',
          '7',
          '12',
          '23',
          '6',
          'Roll-specific comments'
        );
      }
    });
  });

  describe('in response to fate.refresh', function() {

    beforeEach(function() {
      loadFixtures(
        'entireDocumentRaw-5.73.0.html',
      );
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

    it('should store the masterwork status', function() {
      expect('[id=6917529142423687024]').toHaveAttr('data-fate-masterwork', 'true');
      expect('[id=6917529093676727184]').toHaveAttr('data-fate-masterwork', 'false');
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

    it('shoud record the comments', function() {
      expect($('[id=6917529143732442281]')).toHaveAttr('data-fate-comment', 'Roll-specific comments');
    });

    it('should store the light', function() {
      expect($('[id=6917529143732442281]')).toHaveAttr('data-fate-light', '961');
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

    });

    describe('on subsequent refreshes', function() {

      describe('things that should update', function() {
        // TODO: These were never tested, so we're going to bank the win of properly
        // testing with the new DIM document structure and come back to this.
        // data-fate-dim-tags
        // data-fate-armor-registered
        // data-fate-comment
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
