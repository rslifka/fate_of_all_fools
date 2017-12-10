/*
  UserScripts run in the context of a GreaseMonkey host, which means none of the
  GM_* functions will be available while our tests are running.
*/
GM_addStyle = function() { }
GM_getResourceText = function() { }
GM_log = function() { }
