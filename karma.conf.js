module.exports = function(config) {
  config.set({
    frameworks: ['jquery-3.2.1', 'jasmine-jquery', 'jasmine'],
    browsers: ['ChromeHeadless'],
    files: [
      // Helpers included before the application so that we can stub out
      // functionality from its container (i.e. Tampermonkey).
      'spec/helpers/*.js',
      'public/fateOfAllFools.js',
      {pattern: 'spec/javascripts/fixtures/*.html', included: false},
      'spec/javascripts/*.spec.js'
    ]
  })
};
