describe("logger.js", function() {

  const logger = require('logger.js');

  it('should log a prefix', function() {
    spyOn(window, 'GM_log');
    logger.log('TEST_MESSAGE');
    expect(window.GM_log).toHaveBeenCalledWith('[FOAF] TEST_MESSAGE');
  });
  
});
