describe('fateFilters.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
  });

  describe('in response to fate.init', function() {
    it('should install the filter markup', function() {
      fateBus.publish(brunchModule, 'fate.init');
      expect($('body')).toContainElement('.fate-filters');
    });
  })

});
