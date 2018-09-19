describe('beautification.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
  });

  it('should apply our custom CSS', function() {
    spyOn(window, 'GM_getResourceText').and.returnValue('TEST_CUSTOM_CSS');
    spyOn(window, 'GM_addStyle');

    fateBus.publish(brunchModule, 'fate.init');

    expect(window.GM_getResourceText).toHaveBeenCalledWith('fateOfAllFoolsCSS');
    expect(window.GM_addStyle).toHaveBeenCalledWith('TEST_CUSTOM_CSS');
  });

  it('should remove the subclass icons', function() {
    loadFixtures(
      'inventoryContentReact.html',
    );
    fateBus.publish(brunchModule, 'fate.refresh');
    expect($('.item-img.diamond').parents('.store-row')).toBeHidden();
  });

});
