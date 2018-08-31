describe('itemDataRefresher.js', function() {

  const pubsub = require('pubsub-js');
  const fateBus = require('fateBus.js');
  const idr = require('itemDataRefresher.js');

  const brunchModule = {id:'test'+this.result.description};

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
  });

  describe('in response to "fate.configurationLoaded"', function() {
    it('should remove its listeners', function() {
      const refresher = new idr.ItemDataRefresher('_', '_');
      spyOn(fateBus, 'unsubscribeFunctionFromAllTopics');
      fateBus.publish(brunchModule, 'fate.configurationLoaded');
      expect(fateBus.unsubscribeFunctionFromAllTopics).toHaveBeenCalled();
    });
  });

  describe('in response to "fate.itemDataStale"', function() {

    it('should reach out for item data', function() {
      spyOn(window, 'GM_xmlhttpRequest');
      const refresher = new idr.ItemDataRefresher('TEST', 'TESTDataTSVURL');
      fateBus.publish(brunchModule, 'fate.itemDataStale');
      expect(window.GM_xmlhttpRequest).toHaveBeenCalledWith(jasmine.objectContaining({
        method: 'GET',
        url: 'TESTDataTSVURL'
      }));
    });

    describe('when the data has changed', function() {
      it('should update weapon data and remove the header row', function() {
        spyOn(window, 'GM_xmlhttpRequest').and.callFake(function(details) {
          details.onload.call(this, {responseText: `TEST_LINE_1
TEST_LINE_2
TEST_LINE_3`});
        });
        spyOn(pubsub, 'publishSync').and.callThrough();
        const refresher = new idr.ItemDataRefresher('CHANGED', '_');
        fateBus.publish(brunchModule, 'fate.itemDataStale');
        expect(pubsub.publishSync).toHaveBeenCalledWith('fate.CHANGEDDataFetched', 'TEST_LINE_3');
      });
    });

    describe('when the data has not changed', function() {
      it('should not broadcast an update', function() {
        spyOn(window, 'GM_xmlhttpRequest').and.callFake(function(details) {
          details.onload.call(this, {responseText: '_'});
        });
        spyOn(fateBus, 'publish').and.callThrough();

        const refresher = new idr.ItemDataRefresher('NOT_CHANGED_TEST', '_');

        fateBus.publish(brunchModule, 'fate.itemDataStale');
        fateBus.publish(brunchModule, 'fate.itemDataStale');
        const itemBroadcasts = fateBus.publish.calls.allArgs().filter(function(callArguments) {
          return callArguments[1] === 'fate.NOT_CHANGED_TESTDataFetched';
        });
        expect(itemBroadcasts.length).toBe(1);
      });
    });
  });

});
