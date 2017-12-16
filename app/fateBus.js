const postal = require('postal');

const muteStatus = new Map();

function registerModule(brunchModule) {
  muteStatus.set(brunchModule.id, false);
}

function publish(brunchModule, postalData) {
  if (muteStatus.has(brunchModule.id)) {
    if (!muteStatus.get(brunchModule.id)) {
      postal.publish(postalData);
    }
  } else {
    throw new Error('Module ['+brunchModule.id+'] is not defined');
  }
}

function mute(moduleId) {
  muteStatus.set(moduleId, true);
}

function muteAll() {
  const moduleIds = Array.from(muteStatus.keys());
  moduleIds.forEach(function(moduleId) {
    mute(moduleId);
  });
}

function unmute(moduleId) {
  muteStatus.set(moduleId, false);
}

exports.registerModule = registerModule;
exports.publish = publish;
exports.mute = mute;
exports.muteAll = muteAll;
exports.unmute = unmute;
