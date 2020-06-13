const $ = require('jquery');
const logger = require('logger.js');

fateBus.subscribe(module, 'fate.refresh', function() {
  // logger.log('maxLightIndicator.js: Calculating maximum light per slot');
  install();
  if (!(GM_config.get('maxLightLevelTracking'))) {
    $('#max-light').hide();
    return;
  }
  
  calculateMaxLight();
  updateMaxLight();
  $('#max-light').show();
});

const LABELS = [
  'Kin:',
  'Ene:',
]

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

function calculateMaxLight() {
  GEAR_BUCKETS.forEach(function(className) {
    const storageKey = className + '-maxLight';
    let maxLight = (sessionStorage.getItem(storageKey) === null) ? 0 : parseInt(sessionStorage.getItem(storageKey));
    
    $('.'+className).find('[data-fate-light]').each(function() {
      maxLight = Math.max(maxLight, parseInt($(this).attr('data-fate-light')));
    });
    
    sessionStorage.setItem(storageKey, maxLight);
  });
}

function updateMaxLight() {
  GEAR_BUCKETS.forEach(function(className) {
    const storageKey = className + '-maxLight';
    const elementId = 'fate-max-light-' + className;
    $('#' + elementId).text(sessionStorage.getItem(storageKey));
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
          <th></th>
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
          <td></td>
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
