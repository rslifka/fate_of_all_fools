let enabled;

function setEnabled(isEnabled) {
  enabled = isEnabled;
}

function log(message) {
  if (enabled) {
    GM_log('[FATE] ' + message);
  }
}

setEnabled(false);

exports.setEnabled = setEnabled;
exports.log = log;