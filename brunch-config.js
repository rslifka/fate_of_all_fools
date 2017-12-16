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

/*
  Inject our message bus (wrapper around Postal) in to each module. We use
  the bus to communicate and need a hook to be able to silence events when
  those modules are not under test.
*/
exports.modules = {
  wrapper: (path, data) => {
    const fateBusTemplate = `
      const fateBus = require('fateBus.js');
      fateBus.registerModule(module);
    `;
    return `
      require.register("${path}", function(exports, require, module) {
        ${(path === 'fateBus.js') ? ('') : (fateBusTemplate)}
        ${data}
      });`
  },
  autoRequire: {
    'fateOfAllFools.js': ['fateBus.js', 'main.js']
  }
}