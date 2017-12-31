describe("logger.js", function() {

  const logger = require('logger.js');

  describe('when set to the default', function() {
    it('should not write to the log', function() {
      spyOn(window, 'GM_log');
      logger.log('TEST_MESSAGE');
      expect(window.GM_log).not.toHaveBeenCalledWith('[FATE] TEST_MESSAGE');
    });
  });

  describe('when logging is enabled', function() {
    it('should write to the log', function() {
      logger.setEnabled(true);
      spyOn(window, 'GM_log');
      logger.log('TEST_MESSAGE');
      expect(window.GM_log).toHaveBeenCalledWith('[FATE] TEST_MESSAGE');
    });
  });

  describe('when logging is disabled', function() {
    it('should not write to the log', function() {
      logger.setEnabled(false);
      spyOn(window, 'GM_log');
      logger.log('TEST_MESSAGE');
      expect(window.GM_log).not.toHaveBeenCalledWith('[FATE] TEST_MESSAGE');
    });
  });

});
