describe('fateBus.js', function() {

  const fateBus = require('fateBus.js');
  const postal = require('postal');

  beforeEach(function() {
    fateBus.deregisterModules();
  });

  describe('when a module is registered', function() {
    it('should be allowed to publish', function() {
      spyOn(postal, 'publish');
      fateBus.registerModule({id:'TEST_MODULE_ID.JS'});
      fateBus.publish({id:'TEST_MODULE_ID.JS'}, 'TEST_DATA');
      expect(postal.publish).toHaveBeenCalledWith('TEST_DATA');
    });
  });

  describe('when a module is not registered', function() {

    describe('and attempts to publish', function() {
      it('should be an error', function() {
        spyOn(postal, 'publish');
        expect(function() {
          fateBus.publish({id:'UNREGISTERED_MODULE.JS'}, '_');
        }).toThrowError(Error, 'fateBus.js#publish: Module [UNREGISTERED_MODULE.JS] is not defined');
        expect(postal.publish).not.toHaveBeenCalled();
      });
    });

    describe('and attempts to subscribe', function() {
      it('should be an error', function() {
        expect(function() {
          fateBus.subscribe({id:'UNREGISTERED_MODULE.JS'}, '_');
        }).toThrowError(Error, 'fateBus.js#subscribe: Module [UNREGISTERED_MODULE.JS] is not defined');
      });
    });

  });

  describe('when a module is muted', function() {

    beforeEach(function() {
      fateBus.registerModule({id:'MUTED_MODULE.JS'});
      fateBus.mute('MUTED_MODULE.JS');
    });

    it('should not be allowed to publish', function() {
      spyOn(postal, 'publish');
      fateBus.publish({id:'MUTED_MODULE.JS'}, '_');
      expect(postal.publish).not.toHaveBeenCalled();
    });

    it('should not respond to events', function() {
      let postalData = {topic: 'TEST_TOPIC', callback: function(){}};
      spyOn(postalData, 'callback');
      fateBus.subscribe({id:'MUTED_MODULE.JS'}, postalData);
      postal.publish({topic:'TEST_TOPIC',data:'TEST_DATA'});
      expect(postalData.callback).not.toHaveBeenCalled();
    });

  });

  describe('when a module is unmuted', function() {

    it('should be allowed to publish', function() {
      spyOn(postal, 'publish');
      fateBus.registerModule({id:'TOGGLE_MODULE.JS'});
      fateBus.mute('TOGGLE_MODULE.JS');
      fateBus.unmute('TOGGLE_MODULE.JS');
      fateBus.publish({id:'TOGGLE_MODULE.JS'}, {topic:'TEST_TOPIC',data:'TEST_DATA'});
      expect(postal.publish).toHaveBeenCalledWith({topic:'TEST_TOPIC',data:'TEST_DATA'});
    });

    it('should repsond to events', function() {
      it('should not respond to events', function() {
        fateBus.registerModule({id:'TEST_PUBLISHER.JS'});
        fateBus.unmute('TEST_PUBLISHER.JS');

        let postalData = {topic: 'TEST_TOPIC', callback: function(){}};
        spyOn(postalData, 'callback');
        fateBus.subscribe({id:'TEST_SUBSCRIBER.JS'}, postalData);
        fateBus.publish({id:'TEST_PUBLISHER.JS'}, {topic:'TEST_TOPIC',data:'TEST_DATA'});
        expect(postalData.callback).toHaveBeenCalledWith({topic:'TEST_TOPIC',data:'TEST_DATA'});
      });
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
