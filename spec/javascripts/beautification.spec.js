describe('beautification.js', function() {

  it('should apply our custom CSS', function() {
    const beautification = require('beautification.js');

    spyOn(window, 'GM_getResourceText').and.returnValue('TEST_CUSTOM_CSS');
    spyOn(window, 'GM_addStyle');

    beautification.applyStyles();

    expect(window.GM_getResourceText).toHaveBeenCalledWith('fateOfAllFoolsCSS');
    expect(window.GM_addStyle).toHaveBeenCalledWith('TEST_CUSTOM_CSS');
  });

});
