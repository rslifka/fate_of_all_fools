describe('configuration.js', function() {

  describe('initialization', function() {

    it('should use Slifs spreadsheet by default', function() {
      expect(GM_config.get('weaponDataTSV')).toBe('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pub?gid=2031623180&single=true&output=tsv');
    });

    it('should register a handler', function() {
      const spyEvent = spyOnEvent('.foaf-config', 'click');
      spyOn(GM_config, 'open');

      $('.foaf-config').click();

      expect(spyEvent).toHaveBeenTriggered();
      expect(GM_config.open).toHaveBeenCalled();
    });

  });

});
