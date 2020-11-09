const $ = require('jquery');
const logger = require('logger.js');
const Vibrant = require('node-vibrant');

// Our best guess at the class name all elemental images hage
const ELEMENT_CLASS_NAME = '.g7Tk_';

// How many unique elemental images should we look for?
const NUM_ELEMENTS = 3;              

// Store the mappings so clients can understand elements from URLs
const URL_TO_ELEMENT = new Map();

let colorsDetected = false;

fateBus.subscribe(module, 'fate.refresh', function() {  
  if (colorsDetected) {
    return;
  }
  logger.log('elementDetector.js: Calculating element colors');

  updateElementIcons();
});

function updateElementIcons() {
  const imageSourceURLs = getElementImageSources();

  const arcMatch   = getUrlForElement('#7cbce4', imageSourceURLs);
  const solarMatch = getUrlForElement('#f4641c', imageSourceURLs);
  const voidMatch  = getUrlForElement('#b484dc', imageSourceURLs);

  return Promise.all([arcMatch, solarMatch, voidMatch]).then((elementUrls) => {
    if (elementUrls[0] != undefined) {
      URL_TO_ELEMENT.set(elementUrls[0], 'arc');
    }
    if (elementUrls[1] != undefined) {
      URL_TO_ELEMENT.set(elementUrls[1], 'solar');
    }
    if (elementUrls[2] != undefined) {
      URL_TO_ELEMENT.set(elementUrls[2], 'void');
    }

    if (URL_TO_ELEMENT.size === NUM_ELEMENTS) {
      colorsDetected = true;
    }
  });
}

/*
  Elements are the same across armor and weapons, so we aren't particularly
  concerned with where we get them from. We iteratively look until we find
  the number of elements in the game (currently three, until Beyond Light
  ships in which case this likely increases).
*/
function getElementImageSources() {
  const imageURLs = [];

  $(ELEMENT_CLASS_NAME).each(function(index,element) {
    const src = $(this).attr('src');
    if (imageURLs.includes(src)) {
      return;
    }
    imageURLs.push(src);

    if (imageURLs.length === NUM_ELEMENTS) {
      return false;
    }
  });

  return imageURLs;
}

/*
  Search through known elemental images until we find on that Vibrant considers
  a very good match. Vibrant supplies a bit of tooling around detecting how
  close colors are to one another (interestingly, they are slightly different
  on each browser/platform).
*/
async function getUrlForElement(hexCode, imageSourceUrls) {
  for (let i = 0; i < imageSourceUrls.length; i++) {
    const vibrant = Vibrant.from(imageSourceUrls[i]);
    const swatches = await vibrant.getSwatches();
    
    const dominantColor = swatches['Vibrant'].getHex();
    const diff = Vibrant.Util.hexDiff(dominantColor, hexCode);
    if (diff < 11) {
      return imageSourceUrls[i];
    }
  }
  return undefined;
}

function getElementFromURL(url) {
  return URL_TO_ELEMENT.get(url);
}

exports.getElementFromURL = getElementFromURL
exports.updateElementIcons = updateElementIcons
