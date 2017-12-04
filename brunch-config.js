exports.files = {
  javascripts: {
    joinTo: {
      'fateOfAllFools.js': /^(?!test)/
    }
  },
  stylesheets: {
    joinTo: 'fateOfAllFools.css'
  }
};

// Tests are handled by Karma
exports.conventions = {
  ignored: /^test/
};
