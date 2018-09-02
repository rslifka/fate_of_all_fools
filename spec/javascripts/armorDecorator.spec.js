describe('armorDecorator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
  });

  describe('in response to fate.refresh', function() {

    beforeEach(function() {
      loadFixtures(
        'armorPreDecoration/chestNobleConstantType2330.html',
        'armorPreDecoration/classShadowsMark335.html',
        'armorPreDecoration/gauntletsIronTruageGauntlets335.html',
        'armorPreDecoration/legWinterhartGreaves329.html',
        'armorPreDecoration/helmetWildwoodHelm333.html',
      );
      fateBus.publish(brunchModule, 'fate.refresh');
    });

    it('should store the original armor name', function() {
      expect('[title*="Wildwood"]').toHaveAttr('data-fate-armor-name', 'Wildwood Helm');
      expect('[title*="Noble"]').toHaveAttr('data-fate-armor-name', 'Noble Constant Type 2');
      expect('[title*="Winterhart"]').toHaveAttr('data-fate-armor-name', 'Winterhart Greaves');
      expect('[title*="Shadow"]').toHaveAttr('data-fate-armor-name', "Shadow's Mark");
      expect('[title*="Truage"]').toHaveAttr('data-fate-armor-name', 'Iron Truage Gauntlets');
    });

    it('should store the masterwork status', function() {
      expect('[title*="Wildwood"]').toHaveAttr('data-fate-masterwork', 'true');
      expect('[title*="Noble"]').toHaveAttr('data-fate-masterwork', 'false');
      expect('[title*="Winterhart"]').toHaveAttr('data-fate-masterwork', 'true');
      expect('[title*="Shadow"]').toHaveAttr('data-fate-masterwork', 'false');
      expect('[title*="Truage"]').toHaveAttr('data-fate-masterwork', 'true');
    });

    it('should record its base light', function() {
      expect('[title*="Wildwood"]').toHaveAttr('data-fate-base-light', '333');
      expect('[title*="Noble"]').toHaveAttr('data-fate-base-light', '330');
      expect('[title*="Winterhart"]').toHaveAttr('data-fate-base-light', '329');
      expect('[title*="Shadow"]').toHaveAttr('data-fate-base-light', '335');
      expect('[title*="Truage"]').toHaveAttr('data-fate-base-light', '335');
    });

    it('shoud record the serial number', function() {
      expect($('[drag-channel=Helmet]')).toHaveAttr('data-fate-serial', '6917529039249138892');
      expect($('[drag-channel=Chest]')).toHaveAttr('data-fate-serial', '6917529034267773023');
      expect($('[drag-channel=Leg]')).toHaveAttr('data-fate-serial', '6917529048121131444');
      expect($('[drag-channel=ClassItem]')).toHaveAttr('data-fate-serial', '6917529032743550478');
      expect($('[drag-channel=Gauntlets]')).toHaveAttr('data-fate-serial', '6917529044428519818');
    });

    describe('on subsequent refreshes', function() {

      const CHANNELS = ['Helmet','Gauntlets','Chest','Leg','ClassItem'];

      it('should not overwrite the original name', function() {
        CHANNELS.forEach(function(channelName) {
          $('[drag-channel='+channelName+']').attr('title', '_');
        });
        fateBus.publish(brunchModule, 'fate.refresh');
        expect($('[drag-channel=Helmet]')).toHaveAttr('data-fate-armor-name', 'Wildwood Helm');
        expect($('[drag-channel=Chest]')).toHaveAttr('data-fate-armor-name', 'Noble Constant Type 2');
        expect($('[drag-channel=Leg]')).toHaveAttr('data-fate-armor-name', 'Winterhart Greaves');
        expect($('[drag-channel=ClassItem]')).toHaveAttr('data-fate-armor-name', "Shadow's Mark");
        expect($('[drag-channel=Gauntlets]')).toHaveAttr('data-fate-armor-name', 'Iron Truage Gauntlets');
      });

      it('should not overwrite the base light', function() {
        CHANNELS.forEach(function(channelName) {
          $('[drag-channel='+channelName+']').children('.item-stat').text('400');
        });
        fateBus.publish(brunchModule, 'fate.refresh');
        expect($('[drag-channel=Helmet]')).toHaveAttr('data-fate-base-light', '333');
        expect($('[drag-channel=Chest]')).toHaveAttr('data-fate-base-light', '330');
        expect($('[drag-channel=Leg]')).toHaveAttr('data-fate-base-light', '329');
        expect($('[drag-channel=ClassItem]')).toHaveAttr('data-fate-base-light', '335');
        expect($('[drag-channel=Gauntlets]')).toHaveAttr('data-fate-base-light', '335');
      });

      it('should not overwrite the serial number', function() {
        CHANNELS.forEach(function(channelName) {
          $('[drag-channel='+channelName+']').attr('id','_');
        });
        fateBus.publish(brunchModule, 'fate.refresh');
        expect($('[drag-channel=Helmet]')).toHaveAttr('data-fate-serial', '6917529039249138892');
        expect($('[drag-channel=Chest]')).toHaveAttr('data-fate-serial', '6917529034267773023');
        expect($('[drag-channel=Leg]')).toHaveAttr('data-fate-serial', '6917529048121131444');
        expect($('[drag-channel=ClassItem]')).toHaveAttr('data-fate-serial', '6917529032743550478');
        expect($('[drag-channel=Gauntlets]')).toHaveAttr('data-fate-serial', '6917529044428519818');
      });

    });

  });

});
