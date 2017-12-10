function applyStyles() {
  GM_addStyle(GM_getResourceText('fateOfAllFoolsCSS'));
}

applyStyles();

exports.applyStyles = applyStyles;
