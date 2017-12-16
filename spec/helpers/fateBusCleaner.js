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
    },
  };

  jasmine.getEnv().addReporter(fateBusCleaner);
})();
