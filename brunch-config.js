exports.files = {
  javascripts: {
    joinTo: {
      'fateOfAllFools.js': /^(?!test)/,
      'jasmineSpecs.js': /^test/
    }
  },
  stylesheets: {
    joinTo: 'fateOfAllFools.css'
  }
};
