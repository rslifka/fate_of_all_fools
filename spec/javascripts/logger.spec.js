describe("logger.js", function() {

  const logger = require('logger.js');

  describe('when set to the default', function() {
    it('should not write to the log', function() {
      spyOn(window, 'GM_log');
      logger.log('default#TEST_MESSAGE');
      expect(window.GM_log).not.toHaveBeenCalledWith('[FATE] default#TEST_MESSAGE');
    });
  });

  describe('when logging is enabled', function() {
    it('should write to the log', function() {
      logger.setEnabled(true);
      spyOn(window, 'GM_log');
      logger.log('enabled#TEST_MESSAGE');
      expect(window.GM_log).toHaveBeenCalledWith('[FATE] enabled#TEST_MESSAGE');
    });
  });

  describe('when logging is disabled', function() {
    it('should not write to the log', function() {
      logger.setEnabled(false);
      spyOn(window, 'GM_log');
      logger.log('disabled#TEST_MESSAGE');
      expect(window.GM_log).not.toHaveBeenCalledWith('[FATE] disabled#TEST_MESSAGE');
    });
  });

});
