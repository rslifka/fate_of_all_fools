xdescribe('infusionIndicator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.description};

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
  });

  describe('in response to a fate.refresh event', function() {

    beforeEach(function() {
      loadFixtures(
        /*
          6917529083431386696: 953, Crooked Fang-4fr, Registered
          6917529137054930617: 950, Crooked Fang-4fr, Unregistered
          6917529134138846060: 955, Crooked Fang-4fr, Unregistered
        */
        'infusionPower.html',
        /*
          6917529133966331272: 955, Ankaa Seeker IV, Registered
          6917529133699872344: 955, Ankaa Seeker IV, Unregistered
          6917529135285684812: 956, Ankaa Seeker IV, Unregistered
        */
        'infusionHelms.html',
        /*
          6917529100950119277: 950, Ankaa Seeker IV, Registered
          6917529101903668442: 955, Ankaa Seeker IV, Registered
        */
        'infusionChests.html',
      );
      fateBus.publish(brunchModule, 'fate.refresh');
    });

    describe('completion', function() {
      it('should let the world know it is done', function() {
        spyOn(fateBus, 'publish').and.callThrough();
        fateBus.publish(brunchModule, 'fate.refresh');
      });
    });

    describe('when an item of the same name exists', function() {

      describe('when I am not registered', function() {
        it('should not mark me as infusable', function() {
          expect($('[id="6917529137054930617"]')).toHaveAttr('data-fate-infusable','false');
          expect($('[id="6917529133699872344"]')).toHaveAttr('data-fate-infusable','false');
        });
      });

      describe('when I am registered', function() {

        describe('when the other item is registered', function() {
          it('should not mark me as infusable', function() {
            expect($('[id="6917529100950119277"]')).toHaveAttr('data-fate-infusable','false');
          });
        });

        describe('when the other item is not registered', function() {

          xdescribe('when the other item has lower light', function() {
            it('should not mark me as infusable', function() {
              
            });
          });
  
          xdescribe('when the other item has the same light', function() {
            it('should not mark me as infusable');
          });
  
          describe('when the other item has higher light', function() {
            it('should mark me as infusable', function() {
              expect($('[id="6917529083431386696"]')).toHaveAttr('data-fate-infusable','true');
              expect($('[id="6917529133966331272"]')).toHaveAttr('data-fate-infusable','true');
            });
          });

        });

      });

    });

  });

});