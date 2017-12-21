describe('weaponDataRefresher.js', function() {

  const pubsub = require('pubsub-js');
  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
  });

  describe('in response to "fate.weaponDataStale"', function() {

    it('should reach out for weapon data from our configured location', function() {
      spyOn(window, 'GM_xmlhttpRequest');
      fateBus.publish(brunchModule, 'fate.configurationLoaded', {weaponDataTSV:'TEST_WEAPON_DATA_URL'});
      fateBus.publish(brunchModule, 'fate.weaponDataStale');
      expect(window.GM_xmlhttpRequest).toHaveBeenCalledWith(jasmine.objectContaining({
        method: 'GET',
        url: 'TEST_WEAPON_DATA_URL'
      }));
    });

    describe('when the data has changed', function() {
      it('should update weapon data and remove the header row', function() {
        spyOn(window, 'GM_xmlhttpRequest').and.callFake(function(details) {
          details.onload.call(this, {responseText: `TEST_LINE_1
TEST_LINE_2`});
        });
        spyOn(pubsub, 'publishSync').and.callThrough();
        fateBus.publish(brunchModule, 'fate.weaponDataStale');
        expect(pubsub.publishSync).toHaveBeenCalledWith('fate.weaponDataFetched', 'TEST_LINE_2');
      });
    });

    describe('when the data has not changed', function() {
      it('should not broadcast an update', function() {
        spyOn(window, 'GM_xmlhttpRequest').and.callFake(function(details) {
          details.onload.call(this, {responseText: '_'});
        });
        spyOn(fateBus, 'publish').and.callThrough();
        fateBus.publish(brunchModule, 'fate.weaponDataStale');
        fateBus.publish(brunchModule, 'fate.weaponDataStale');
        const weaponBroadcasts = fateBus.publish.calls.allArgs().filter(function(callArguments) {
          return callArguments[1] === 'fate.weaponDataFetched';
        });
        expect(weaponBroadcasts.length).toBe(1);
      });
    });
  });

  describe('in response to "fate.init"', function() {
    it('should reach out for weapon data from our configured location', function() {
      spyOn(window, 'GM_xmlhttpRequest');
      spyOn(GM_config, 'get').and.returnValue('TEST_WEAPON_DATA_URL');
      fateBus.publish(brunchModule, 'fate.init');
      expect(window.GM_xmlhttpRequest).toHaveBeenCalledWith(jasmine.objectContaining({
        method: 'GET',
        url: 'TEST_WEAPON_DATA_URL'
      }));
    });
  });

});
