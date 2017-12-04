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

/*
  1. Tests are handled by Karma. This is to silence a warning that Brunch
     reports (which is helpful actually in most cases!) because it sees JS files
     outside the scope of its purview.
  2. We exclude them because we don't want them bundled so that the Karma
     watcher only re-runs the tests we've changed during active development.
*/
exports.conventions = {
  ignored: /^test/
};
