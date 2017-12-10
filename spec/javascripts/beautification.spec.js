describe('beautification.js', function() {

  const postal = require('postal');

  it('should apply our custom CSS', function() {
    spyOn(window, 'GM_getResourceText').and.returnValue('TEST_CUSTOM_CSS');
    spyOn(window, 'GM_addStyle');

    postal.publish({topic:'fate.init'});

    expect(window.GM_getResourceText).toHaveBeenCalledWith('fateOfAllFoolsCSS');
    expect(window.GM_addStyle).toHaveBeenCalledWith('TEST_CUSTOM_CSS');
  });

});
