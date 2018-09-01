describe('ignoreStatusIndicator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
  });

  describe('in response to fate.refresh', function() {

    beforeEach(function() {
      loadFixtures(
        'kineticWeapon.html',
        'energyWeapon.html',
        'powerWeapon.html',
      );
    });

    describe('when the item is not in the database', function() {
      it('should display the appropriate glyph', function() {
        fateBus.publish(brunchModule, 'fate.refresh');
        expect($('[data-fate-weapon-name]')).toContainElement('.fate-ignore-slot.fate-question-mark.fate-glyph.fglyph-question-mark.fate-middling');
        expect($('[data-fate-weapon-name] > .fate-ignore-slot.fate-question-mark.fate-glyph.fglyph-question-mark.fate-middling')).toBeVisible();
      });
    });

    describe('when the item is in the database', function() {

      beforeEach(function() {
        $('[data-fate-weapon-name]').attr('data-fate-weapon-registered', true);
      });

      describe('and it is junk', function() {
        it('should display the appropriate glyph', function() {
          const WEAPONS = ['Origin Story','Annual Skate','Alone as a god'];
          for(let name of WEAPONS) {
            $('[data-fate-weapon-name="'+name+'"]').attr('data-fate-weapon-junk', true);
          }
          fateBus.publish(brunchModule, 'fate.refresh');
          expect($('[data-fate-weapon-name]')).toContainElement('.fate-ignore-slot.fate-thumbs-down.fate-glyph.fglyph-thumbs-down.fate-middling');
          expect($('[data-fate-weapon-name] > .fate-ignore-slot.fate-thumbs-down.fate-glyph.fglyph-thumbs-down.fate-middling')).toBeVisible();
        });
      });

      describe('and it is not junk', function() {
        it('should not use any ignore glyph', function() {
          const WEAPONS = ['Origin Story','Annual Skate','Alone as a god'];
          for(let name of WEAPONS) {
            $('[data-fate-weapon-name="'+name+'"]').attr('data-fate-weapon-junk', false);
          }
          fateBus.publish(brunchModule, 'fate.refresh');
          expect($('[data-fate-weapon-name] > .fate-ignore-slot')).toBeHidden();
        });
      });

    });

  });

});
