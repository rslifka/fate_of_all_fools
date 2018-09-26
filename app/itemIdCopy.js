const logger = require('logger.js');
const $ = jQuery = require('jquery');
require('jquery-toast-plugin');

let mousePositionX;
let mousePositionY;

$("body").mousemove(function(event) {
  var msg = "Handler for .mousemove() called at ";
  mousePositionX = event.pageX;
  mousePositionY = event.pageY;
});

function registerListeners() {
  $('[data-fate-serial]').not('[data-fate-copy-init]').each(function() {
    $(this).attr('data-fate-copy-init', true);

    Mousetrap.bind('s', function() {
      const $jqElement = $(document.elementFromPoint(mousePositionX, mousePositionY));
      $jqElement.parents('[data-fate-serial]').each(function(index,element) {
        const serialNumber = $(this).attr('data-fate-serial');
        const weaponName = $(this).attr('data-fate-weapon-name');
        copyToClipboard(serialNumber);
        $.toast({
          text: '<span style="font-size:16px;"><strong>'+weaponName+'</strong> serial number copied to clipboard</span>',
        });
      });
    }, 'keypress');
  });
}

/*
I'd prefer to use clipboard-js, but that only supports click-initiated events
and they won't be implementing other event sources. See this Issue for more:

  https://github.com/zenorocha/clipboard.js/issues/370

That being the case, will implement it ourselves using the guide here:

  https://hackernoon.com/copying-text-to-clipboard-with-javascript-df4d4988697f
*/
function copyToClipboard(str) {
  const el = document.createElement('textarea');  // Create a <textarea> element
  el.value = str;                                 // Set its value to the string that you want copied
  el.setAttribute('readonly', '');                // Make it readonly to be tamper-proof
  el.style.position = 'absolute';
  el.style.left = '-9999px';                      // Move outside the screen to make it invisible
  document.body.appendChild(el);                  // Append the <textarea> element to the HTML document
  const selected =
    document.getSelection().rangeCount > 0        // Check if there is any content selected previously
      ? document.getSelection().getRangeAt(0)     // Store selection if found
      : false;                                    // Mark as false to know no selection existed before
  el.select();                                    // Select the <textarea> content
  document.execCommand('copy');                   // Copy - only works as a result of a user action (e.g. click events)
  document.body.removeChild(el);                  // Remove the <textarea> element
  if (selected) {                                 // If a selection existed before copying
    document.getSelection().removeAllRanges();    // Unselect everything on the HTML document
    document.getSelection().addRange(selected);   // Restore the original selection
  }
}

fateBus.subscribe(module, 'fate.refresh', function() {
  logger.log('itemIdCopy.js: Registering copy on all weapons');
  registerListeners();
});
