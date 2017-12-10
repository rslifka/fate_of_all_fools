// Estalibish the default value for our weapons database
require('configuration.js');

// Apply our custom CSS
require('beautification.js');

const logger = require('logger');
const postal = require('postal');
if (process.env.NODE_ENV === 'production') {
  logger.log('Initializing');
  postal.publish({topic:'fate.init'});
}
