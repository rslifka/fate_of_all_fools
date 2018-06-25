describe('fateBus.js', function() {

  const pubsub = require('pubsub-js');
  const fateBus = require('fateBus.js');

  beforeEach(function() {
    fateBus.deregisterModules();
  });

  describe('when a module is registered', function() {

    it('should be allowed to publish', function() {
      spyOn(pubsub, 'publishSync');
      fateBus.registerModule({id:'TEST_MODULE_ID.JS'});
      fateBus.publish({id:'TEST_MODULE_ID.JS'}, 'TEST_TOPIC', 'TEST_DATA');
      expect(pubsub.publishSync).toHaveBeenCalledWith('TEST_TOPIC', 'TEST_DATA');
    });

    describe('and then is removed from the registry', function() {
      it('should not be allowed to publish', function() {
        const subscriber = {callback:function(){}};
        fateBus.registerModule({id:'TEST_MODULE_ID.JS'});
        fateBus.subscribe({id:'TEST_MODULE_ID.JS'}, 'TEST_TOPIC', subscriber.callback);
        fateBus.deregisterModules();

        fateBus.registerModule({id:'NEW_MODULE.JS'});
        spyOn(subscriber, 'callback');
        fateBus.publish({id:'NEW_MODULE.JS'}, 'TEST_TOPIC', '_');
        expect(subscriber.callback).not.toHaveBeenCalled();
      });
    });

  });

  describe('when a module is not registered', function() {

    describe('and attempts to publish', function() {
      it('should be an error', function() {
        spyOn(pubsub, 'publishSync');
        expect(function() {
          fateBus.publish({id:'UNREGISTERED_MODULE.JS'}, '_', '_');
        }).toThrowError(Error, 'fateBus.js#publish: Module [UNREGISTERED_MODULE.JS] is not defined');
        expect(pubsub.publishSync).not.toHaveBeenCalled();
      });
    });

    describe('and attempts to subscribe', function() {
      it('should be an error', function() {
        expect(function() {
          fateBus.subscribe({id:'UNREGISTERED_MODULE.JS'}, '_', function(){});
        }).toThrowError(Error, 'fateBus.js#subscribe: Module [UNREGISTERED_MODULE.JS] is not defined');
      });
    });

  });

  describe('when a module is muted', function() {

    beforeEach(function() {
      fateBus.registerModule({id:'MUTED_MODULE.JS'});
      fateBus.registerModule({id:'NOT_MUTED_MODULE.JS'});
      fateBus.mute('MUTED_MODULE.JS');
    });

    it('should not be allowed to publish', function() {
      spyOn(pubsub, 'publishSync');
      fateBus.publish({id:'MUTED_MODULE.JS'}, '_', '_');
      expect(pubsub.publishSync).not.toHaveBeenCalled();
    });

    it('should not respond to events', function() {
      let subscriber = {callback: function(){}};
      spyOn(subscriber, 'callback');
      fateBus.subscribe({id:'MUTED_MODULE.JS'}, '_', subscriber.callback);
      fateBus.publish({id:'NOT_MUTED_MODULE.JS'}, '_', '_');
      expect(subscriber.callback).not.toHaveBeenCalled();
    });

  });

  describe('when a module is unmuted', function() {

    it('should be allowed to publish', function() {
      spyOn(pubsub, 'publishSync');
      fateBus.registerModule({id:'TOGGLE_MODULE.JS'});
      fateBus.mute('TOGGLE_MODULE.JS');
      fateBus.unmute('TOGGLE_MODULE.JS');
      fateBus.publish({id:'TOGGLE_MODULE.JS'}, 'TEST_TOPIC', 'TEST_DATA');
      expect(pubsub.publishSync).toHaveBeenCalledWith('TEST_TOPIC', 'TEST_DATA');
    });

    it('should respond to events', function() {
      fateBus.registerModule({id:'TEST_PUBLISHER.JS'});
      fateBus.registerModule({id:'TEST_SUBSCRIBER.JS'});
      fateBus.unmute('TEST_PUBLISHER.JS');

      let subscriber = {callback: function(){}};
      spyOn(subscriber, 'callback');
      fateBus.subscribe({id:'TEST_SUBSCRIBER.JS'}, 'TEST_TOPIC', subscriber.callback);
      fateBus.publish({id:'TEST_PUBLISHER.JS'}, 'TEST_TOPIC', 'TEST_DATA');
      expect(subscriber.callback).toHaveBeenCalledWith('TEST_TOPIC', 'TEST_DATA');
    });
  });

  describe('when all modules are muted', function() {
    it('should not be allowed to publish', function() {
      spyOn(pubsub, 'publishSync');
      fateBus.registerModule({id:'ALL1.JS'});
      fateBus.registerModule({id:'ALL2.JS'});
      fateBus.muteAll();
      fateBus.publish({id:'ALL1.JS'}, '_', '_');
      fateBus.publish({id:'ALL2.JS'}, '_', '_');
      expect(pubsub.publishSync).not.toHaveBeenCalled();
    });
  });

  describe('when a subscriber wants to unsubscribe', function() {
    it('should unsubscribe them', function() {
      const fn = function(){}
      spyOn(pubsub, 'unsubscribe');
      fateBus.unsubscribeFunctionFromAllTopics(fn);
      expect(pubsub.unsubscribe).toHaveBeenCalledWith(fn);
    });
  });
});
