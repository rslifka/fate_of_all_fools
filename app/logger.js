let enabled = false;

exports.setEnabled = function(isEnabled) {
  enabled = isEnabled;
}

exports.log = function log(message) {
  if (enabled) {
    GM_log('[FATE] ' + message);
  }
}
