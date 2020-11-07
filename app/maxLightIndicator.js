const $ = require('jquery');
const logger = require('logger.js');

const GEAR_BUCKETS = [
  'bucket-1498876634', // Kinetic
  'bucket-2465295065', // Energy
  'bucket-953998645',  // Power
  'bucket-3448274439', // Helm
  'bucket-3551918588', // Gloves
  'bucket-14239492',   // Chest
  'bucket-20886954',   // Legs
  'bucket-1585787867', // Class
]

fateBus.subscribe(module, 'fate.refresh', function() {
  // logger.log('maxLightIndicator.js: Calculating maximum light per slot');
  install();
  if (!(GM_config.get('maxLightLevelTracking'))) {
    $('#max-light').hide();
    return;
  }
  
  calculateMaxLight();
  updateLightLevelUI();
  $('#max-light').show();
});

// Store the maximum light level of each slot
function calculateMaxLight() {
  GEAR_BUCKETS.forEach(function(className) {
    let maxLight = 0;
    $('.'+className).find('[data-fate-light]').each(function() {
      maxLight = Math.max(maxLight, parseInt($(this).attr('data-fate-light')));
    });
    
    const storageKey = className + '-maxLight';
    sessionStorage.setItem(storageKey, maxLight);
  });
}

function updateLightLevelUI() {
  const lightLevels = GEAR_BUCKETS.map(className => parseInt(sessionStorage.getItem(className + '-maxLight')));

  // Visually indicate which slots are the lowest so we can focus on increasing
  // their light level.
  let minLight = lightLevels.reduce((a,c) => Math.min(a,c));

  // If all the light levels are the same, color them normally
  const identicalLightLevels = !lightLevels.some(ll => ll != minLight);
  minLight = identicalLightLevels ? 0 : minLight;

  GEAR_BUCKETS.forEach(function(className) {
    const storageKey = className + '-maxLight';
    const light = parseInt(sessionStorage.getItem(storageKey));

    const elementId = '#fate-max-light-' + className;
    const oldLight = parseInt($(elementId).text());
    if (light != oldLight) {
      $(elementId).text(light);
    }

    if (light === minLight) {
      $(elementId).addClass('min-light');
    } else {
      $(elementId).removeClass('min-light');
    }
  });
}

function install() {
	if ($('#max-light').length > 0) {
		return;
	}

  $('.store-header .store-cell.vault').append(`
    <div id='max-light'>
      <table>
        <tr>
          <th>Kin</th>
          <th>Ene</th>
          <th>Pwr</th>
          <th class="max-light-buffer"></th>
          <th>Hel</th>
          <th>Glo</th>
          <th>Che</th>
          <th>Leg</th>
          <th>Cls</th>
        </tr>
        <tr>
          <td id="fate-max-light-bucket-1498876634">1000</td>
          <td id="fate-max-light-bucket-2465295065">1000</td>
          <td id="fate-max-light-bucket-953998645">1000</td>
          <td class="max-light-buffer"></td>
          <td id="fate-max-light-bucket-3448274439">1000</td>
          <td id="fate-max-light-bucket-3551918588">1000</td>
          <td id="fate-max-light-bucket-14239492">1000</td>
          <td id="fate-max-light-bucket-20886954">1000</td>
          <td id="fate-max-light-bucket-1585787867">1000</td>
        </tr>
      </table>
    </div>`
  );
}
