const $ = require('jquery');
const logger = require('logger.js');
const Vibrant = require('node-vibrant');

// Elemental class name as of 6.43.2
const ELEMENT_CLASS_NAME = '.g7Tk_';

// Store the mappings so clients can understand elements from URLs
const URL_TO_ELEMENT = new Map();

fateBus.subscribe(module, 'fate.refresh', function() {  
  if (URL_TO_ELEMENT.size >= 6) {
    return;
  }
  logger.log('elementDetector.js: Calculating element colors');

  // Grab all the unique elemental icon URLs from both weapons and armor.
  const imageURLs = new Set();
  $(ELEMENT_CLASS_NAME).each(function() {
    imageURLs.add($(this).attr('src'));
  });

  // Map each detected image to an element
  imageURLs.forEach(function(imageSourceURL) {
    calculateElementForImage(imageSourceURL).then((element) => {
      URL_TO_ELEMENT.set(imageSourceURL, element);
    });
  });
});

/*
  Given an image, what element does it most closely map to?
*/
async function calculateElementForImage(imageSourceURL) {
  const vibrant = Vibrant.from(imageSourceURL);
  const swatches = await vibrant.getSwatches();
  
  const dominantColor = swatches['Vibrant'].getHex();
  if (Vibrant.Util.hexDiff(dominantColor, '#7cbce4') < 11) {
    return 'arc';
  } else if (Vibrant.Util.hexDiff(dominantColor, '#f4641c') < 11) {
    return 'solar';
  } else if (Vibrant.Util.hexDiff(dominantColor, '#b484dc') < 11) {
    return 'void';
  } else if (Vibrant.Util.hexDiff(dominantColor, '#4c8cfc') < 11) {
    return 'stasis';
  }

  return undefined;
}

function getElementFromURL(url) {
  return URL_TO_ELEMENT.get(url);
}

// Used only for testing
exports.calculateElementForImage = calculateElementForImage

exports.getElementFromURL = getElementFromURL

