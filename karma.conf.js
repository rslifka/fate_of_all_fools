module.exports = function(config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine-jquery'],
    plugins: ['@metahub/karma-jasmine-jquery', 'karma-*'],
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
      Suppress "24 06 2019 06:06:49.978:WARN [web-server]: 404: /static/legendaryShards-ccf1b4.png"
    */
    proxies: {
      '/static/vault-background-a7a8af.png': '/app/assets/images/vault-background.png',
      '/static/vault-background-ccf1b4.png': '/app/assets/images/legendaryShards.png'
    }
  })
};
