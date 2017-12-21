/*
  Using a custom reporter (there is no other way that I could find), we hook
  in to the Jasmine execution flow to mute and unmute modules as appropriate.
  This ensures test isolation in the sense that other unrelated events being
  published will not interfere with our specs.
*/
(function() {
  const fateBus = require('fateBus.js');

  const fateBusCleaner = {
    specStarted: function(result) {
      fateBus.muteAll();
      fateBus.unmute(result.fullName.match(/\S+.js/)[0]);
      /*
        GM_config is included locally, can run without stubbing and configures
        a default value for the location of the weaponDataTSV. It can actually
        run as part of the application during 'fate.init' so it's safe to
        leave this unmuted.
      */
      fateBus.unmute('configuration.js');
    },
  };

  jasmine.getEnv().addReporter(fateBusCleaner);
})();
