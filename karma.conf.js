module.exports = function(config) {
  config.set({
    frameworks: ['jquery-3.2.1', 'jasmine-jquery', 'jasmine'],
    browsers: ['ChromeHeadless'],
    files: [
      'spec/helpers/tampermonkeyStubs.js',
      'docs/fateOfAllFools.js',
      'spec/helpers/!(tampermonkeyStubs).js',
      {pattern: 'spec/javascripts/fixtures/*.html', included: false},
      'spec/javascripts/*.spec.js'
    ]
  })
};
