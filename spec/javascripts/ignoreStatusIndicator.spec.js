describe('ignoreStatusIndicator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};

  const weaponDatabase = require('weaponDatabase.js');

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
  });

  describe('in response to fate.refresh', function() {

    beforeEach(function() {
      loadFixtures(
        'kineticWeapon.html',
        'energyWeapon.html',
        'powerWeapon.html',
        'shaders/arcticDreamscapeShader.html',
        'shaders/atlantisWashShader.html'
      );
    });

    describe('when the item is not in the database', function() {
      it('should display the appropriate glyph', function() {
        spyOn(weaponDatabase, 'contains').and.returnValue(false);
        fateBus.publish(brunchModule, 'fate.refresh');
        expect($('[data-fate-weapon-name]')).toContainElement('.fate-ignore-slot.fate-question-mark.fate-glyph.fglyph-question-mark.fate-middling');
        expect($('[data-fate-weapon-name] > .fate-ignore-slot.fate-question-mark.fate-glyph.fglyph-question-mark.fate-middling')).toBeVisible();
        expect($('[data-fate-shader-name]')).toContainElement('.fate-ignore-slot.fate-question-mark.fate-glyph.fglyph-question-mark.fate-middling');
        expect($('[data-fate-shader-name] > .fate-ignore-slot.fate-question-mark.fate-glyph.fglyph-question-mark.fate-middling')).toBeVisible();
      });
    });

    describe('when the item is in the database', function() {

      beforeEach(function() {
        spyOn(weaponDatabase, 'contains').and.returnValue(true);
      });

      describe('and it is junk', function() {
        it('should display the appropriate glyph', function() {
          spyOn(weaponDatabase, 'get').and.callFake(function(weaponName) {
            switch(weaponName) {
              case 'Origin Story':
                return {name: 'Origin Story', isJunk: function(){return true}};
              case 'Annual Skate':
                return {name: 'Annual Skate', isJunk: function(){return true}};
              case 'Alone as a god':
                return {name: 'Alone as a god', isJunk: function(){return true}};
              case 'Arctic Dreamscape':
                return {name: 'Arctic Dreamscape', isJunk: function(){return true}};
              case 'Atlantis Wash':
                return {name: 'Atlantis Wash', isJunk: function(){return true}};
            }
          });
          fateBus.publish(brunchModule, 'fate.refresh');
          expect($('[data-fate-weapon-name]')).toContainElement('.fate-ignore-slot.fate-thumbs-down.fate-glyph.fglyph-thumbs-down.fate-middling');
          expect($('[data-fate-weapon-name] > .fate-ignore-slot.fate-thumbs-down.fate-glyph.fglyph-thumbs-down.fate-middling')).toBeVisible();
          expect($('[data-fate-shader-name]')).toContainElement('.fate-ignore-slot.fate-thumbs-down.fate-glyph.fglyph-thumbs-down.fate-middling');
          expect($('[data-fate-shader-name] > .fate-ignore-slot.fate-thumbs-down.fate-glyph.fglyph-thumbs-down.fate-middling')).toBeVisible();
        });
      });

      describe('and it is not junk', function() {
        it('should not use any ignore glyph', function() {
          spyOn(weaponDatabase, 'get').and.callFake(function(weaponName) {
            switch(weaponName) {
              case 'Origin Story':
                return {name: 'Origin Story', isJunk: function(){return false}};
              case 'Annual Skate':
                return {name: 'Annual Skate', isJunk: function(){return false}};
              case 'Alone as a god':
                return {name: 'Alone as a god', isJunk: function(){return false}};
              case 'Arctic Dreamscape':
                return {name: 'Arctic Dreamscape', isJunk: function(){return false}};
              case 'Atlantis Wash':
                return {name: 'Atlantis Wash', isJunk: function(){return false}};
            }
          });
          fateBus.publish(brunchModule, 'fate.refresh');
          expect($('[data-fate-weapon-name] > .fate-ignore-slot')).toBeHidden();
          expect($('[data-fate-shader-name] > .fate-ignore-slot')).toBeHidden();
        });
      });

    });

  });

});
