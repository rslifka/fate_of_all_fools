const logger = require('logger.js');
const $ = jQuery = require('jquery');
require('jquery-toast-plugin');

let mousePositionX;
let mousePositionY;

$("body").mousemove(function(event) {
  // When scrolling, need to take viewport in to account
  mousePositionX = event.pageX - window.pageXOffset;
  mousePositionY = event.pageY - window.pageYOffset;
});

function registerListeners() {
  $('[data-fate-serial]').not('[data-fate-copy-init]').each(function() {
    $(this).attr('data-fate-copy-init', true);

    Mousetrap.bind('s', function() {
      const $jqElement = $(document.elementFromPoint(mousePositionX, mousePositionY));
      let $itemElement = $jqElement;
      if (!$itemElement.is('[data-fate-serial]')) {
        $itemElement = $($jqElement.parents('[data-fate-serial]')[0]);
      }

      const serialNumber = $itemElement.attr('data-fate-serial');
      const itemName = $itemElement.attr('data-fate-item-name');
      copyToClipboard(serialNumber);
      $.toast({
        text: '<span style="font-size:16px;"><strong>'+itemName+'</strong> serial number copied to clipboard</span>',
      });
    }, 'keypress');

    Mousetrap.bind('n', function() {
      const $jqElement = $(document.elementFromPoint(mousePositionX, mousePositionY));
      let $itemElement = $jqElement;
      if (!$itemElement.is('[data-fate-serial]')) {
        $itemElement = $($jqElement.parents('[data-fate-serial]')[0]);
      }

      const weaponName = $itemElement.attr('data-fate-weapon-name');
      const itemName = $itemElement.attr('data-fate-item-name');
      copyToClipboard(itemName);
      $.toast({
        text: '<span style="font-size:16px;"><strong>'+itemName+'</strong> copied to clipboard</span>',
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
  // logger.log('itemIdCopy.js: Registering copy on all weapons');
  registerListeners();
});
