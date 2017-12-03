module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    browsers: ['ChromeHeadless'],
    files: [
      'public/fateOfAllFools.js',
      'test/**/*Spec.js'
    ],
  })
}
