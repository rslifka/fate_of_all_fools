const pubsub = require('pubsub-js');

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

function publish(brunchModule, topic, data) {
  if (!muteStatus.has(brunchModule.id)) {
    throw new Error('fateBus.js#publish: Module ['+brunchModule.id+'] is not defined');
    return;
  }
  if (!isMuted(brunchModule)) {
    pubsub.publishSync(topic, data);
  }
}

function subscribe(brunchModule, topic, callback) {
  if (!muteStatus.has(brunchModule.id)) {
    throw new Error('fateBus.js#subscribe: Module ['+brunchModule.id+'] is not defined');
    return;
  }
  pubsub.subscribe(topic, function(msg, data) {
    if (muteStatus.has(brunchModule.id)) {
      if (!isMuted(brunchModule)) {
        callback(msg, data);
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
