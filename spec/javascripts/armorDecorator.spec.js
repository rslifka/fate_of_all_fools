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
        'armorPreDecoration/helmetKheprisHorn335.html',
        'armorPreDecoration/helmetLegionBane329.html',
        'armorPreDecoration/helmetWildwoodHelm333.html',
      );
      fateBus.publish(brunchModule, 'fate.refresh');
    });

    describe('light decoration', function() {
      it('should record its base light', function() {
        expect('[title*="Horn"]').toHaveAttr('data-fate-base-light', '330');
        expect('[title*="Wildwood"]').toHaveAttr('data-fate-base-light', '328');
        expect('[title*="Bane"]').toHaveAttr('data-fate-base-light', '329');
        expect('[title*="Noble"]').toHaveAttr('data-fate-base-light', '330');
        expect('[title*="Winterhart"]').toHaveAttr('data-fate-base-light', '329');
        expect('[title*="Shadow"]').toHaveAttr('data-fate-base-light', '330');
        expect('[title*="Truage"]').toHaveAttr('data-fate-base-light', '330');
      });
    })

    describe('mod decoration', function() {
      it('should record whether or not its modded', function() {
        expect('[title*="Horn"]').toHaveAttr('data-fate-is-modded', 'true');
        expect('[title*="Wildwood"]').toHaveAttr('data-fate-is-modded', 'true');
        expect('[title*="Bane"]').toHaveAttr('data-fate-is-modded', 'false');
        expect('[title*="Noble"]').toHaveAttr('data-fate-is-modded', 'false');
        expect('[title*="Winterhart"]').toHaveAttr('data-fate-is-modded', 'false');
        expect('[title*="Shadow"]').toHaveAttr('data-fate-is-modded', 'true');
        expect('[title*="Truage"]').toHaveAttr('data-fate-is-modded', 'true');
      });
    });

  });

});
