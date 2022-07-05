const $ = require('jquery');
const logger = require('logger.js');
const Vibrant = require('node-vibrant');
const volatiles = require('dimVolatileClasses.js').VOLATILE_CLASSES;

/*
  There are two identical icons stored under different paths: one for weapons
  and one for armor:

  Weapons: "./icons/DestinyDamageTypeDefinition_HASH.png"
  Armor:   "./icons/DestinyEnergyTypeDefinition_HASH.png"
*/
const URL_TO_ELEMENT = new Map();

fateBus.subscribe(module, 'fate.refresh', function() {  
  // There's a different elemental icon set for weapons and for armor, so we
  // double the number of URLs for each element in the game.
  if (URL_TO_ELEMENT.size >= 8) {
    return;
  }
  logger.log('elementDetector.js: Calculating element colors');

  // Grab all the unique elemental icon URLs from both weapons and armor.
  const imageURLs = new Set();
  $(volatiles.ELEMENT_ICON_CLASS).each(function() {
    let backgroundImage = $(this).css('background-image');
    imageURLs.add(backgroundImage.substring(5, backgroundImage.length-2));
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

  logger.log('do not know this one: ' + dominantColor)
  return undefined;
}

function getElementFromURL(url) {
  return URL_TO_ELEMENT.get(url);
}

// Used only for testing
exports.calculateElementForImage = calculateElementForImage

exports.getElementFromURL = getElementFromURL

