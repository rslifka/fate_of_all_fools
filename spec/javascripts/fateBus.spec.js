describe('fateBus.js', function() {

  const fateBus = require('fateBus.js');
  const postal = require('postal');

  describe('when a module is registered', function() {
    it('should be allowed to publish', function() {
      spyOn(postal, 'publish');
      fateBus.registerModule({id:'TEST_MODULE_ID.JS'});
      fateBus.publish({id:'TEST_MODULE_ID.JS'}, 'TEST_DATA');
      expect(postal.publish).toHaveBeenCalledWith('TEST_DATA');
    });
  });

  describe('when a module is not registered and publishes', function() {
    it('should be an error', function() {
      spyOn(postal, 'publish');
      expect(function() {
        fateBus.publish({id:'UNREGISTERED_MODULE.JS'}, '_');
      }).toThrowError(Error, 'Module [UNREGISTERED_MODULE.JS] is not defined');
      expect(postal.publish).not.toHaveBeenCalled();
    });
  });

  describe('when a module is muted', function() {
    it('should not be allowed to publish', function() {
      spyOn(postal, 'publish');
      fateBus.registerModule({id:'MUTED_MODULE.JS'});
      fateBus.mute('MUTED_MODULE.JS');
      fateBus.publish({id:'MUTED_MODULE.JS'}, '_');
      expect(postal.publish).not.toHaveBeenCalled();
    });
  });

  describe('when a module is unmuted', function() {
    it('should be allowed to publish', function() {
      spyOn(postal, 'publish');
      fateBus.registerModule({id:'TOGGLE_MODULE.JS'});
      fateBus.mute('TOGGLE_MODULE.JS');
      fateBus.unmute('TOGGLE_MODULE.JS');
      fateBus.publish({id:'TOGGLE_MODULE.JS'}, '_');
      expect(postal.publish).toHaveBeenCalled();
    });
  });

  describe('when all modules are muted', function() {
    it('should not be allowed to publish', function() {
      spyOn(postal, 'publish');
      fateBus.registerModule({id:'ALL1.JS'});
      fateBus.registerModule({id:'ALL2.JS'});
      fateBus.muteAll();
      fateBus.publish({id:'ALL1.JS'}, '_');
      fateBus.publish({id:'ALL2.JS'}, '_');
      expect(postal.publish).not.toHaveBeenCalled();
    });
  });
});
