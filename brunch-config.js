exports.files = {
  javascripts: {
    joinTo: {
      'fateOfAllFools.js': /^(?!spec)/
    }
  },
  stylesheets: {
    joinTo: 'fateOfAllFools.css'
  }
};

/*
  Tests are handled by Karma. This is to silence a warning that Brunch
  reports (which is helpful actually in most cases!) because it sees JS files
  outside the scope of its purview.
*/
exports.conventions = {
  ignored: /^spec/
};
