const postal = require('postal');

const muteStatus = new Map();

function registerModule(brunchModule) {
  muteStatus.set(brunchModule.id, false);
}

function deregisterModules() {
  muteStatus.clear();
}

function isMuted(brunchModule) {
  return muteStatus.get(brunchModule.id);
}

function publish(brunchModule, postalData) {
  if (!muteStatus.has(brunchModule.id)) {
    throw new Error('fateBus.js#publish: Module ['+brunchModule.id+'] is not defined');
    return;
  }
  if (!isMuted(brunchModule)) {
    postal.publish(postalData);
  }
}

function subscribe(brunchModule, postalData) {
  if (!muteStatus.has(brunchModule.id)) {
    throw new Error('fateBus.js#subscribe: Module ['+brunchModule.id+'] is not defined');
    return;
  }
  postal.subscribe({
    topic: postalData.topic,
    callback: function(data, envelope) {
      if (!isMuted(brunchModule)) {
        postalData.callback(data, envelope);
      }
    }
  });
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
exports.deregisterModules = deregisterModules;
exports.publish = publish;
exports.subscribe = subscribe;
exports.mute = mute;
exports.muteAll = muteAll;
exports.unmute = unmute;
