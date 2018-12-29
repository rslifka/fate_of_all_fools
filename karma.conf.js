module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: ['jquery-3.2.1', 'jasmine-jquery', 'jasmine'],
    browsers: ['ChromeHeadless'],
    files: [
      'spec/helpers/tampermonkeyStubs.js',
      'public/fateOfAllFools.js',
      'spec/helpers/!(tampermonkeyStubs).js',
      {pattern: 'spec/javascripts/fixtures/**/*.html', included: false},
      'spec/javascripts/*.spec.js'
    ],
    /*
      Suppress "29 12 2018 11:12:44.491:WARN [web-server]: 404: /static/vault-background-a7a8af.png"
    */
    proxies: {
      '/static/vault-background-a7a8af.png': '/app/assets/images/vault-background.png'
    }
  })
};
