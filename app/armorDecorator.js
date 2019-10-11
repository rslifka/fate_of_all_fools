const $ = require('jquery');
const rollDatabase = require('armorRollDatabase.js').armorRollDB;

const ARMOR_TYPES = [
  "Helmet",
  "Gauntlets",
  "Chest Armor",
  "Leg Armor",
  "Warlock Bond",
  "Titan Mark",
  "Hunter Cloak",
]
const SEARCH_STRING = ARMOR_TYPES.map(type => "[title$=\'"+type+"\']").join(',');

function storeArmorData() {
  $(SEARCH_STRING).not('[data-fate-armor-init]').each(function(index,element) {
    // Don't mistake popups for gear (popups don't have carraige returns in them)
    if (!$(this).attr('title').includes("\n")) {
      return;
    }

    $(this).attr('data-fate-armor-init', true);

    const armorName = $(this).attr('title').split("\n")[0];
    $(this).attr('data-fate-armor-name', armorName);

    const isMasterwork = ($(this).has('._2kz8P').length + $(this).has('._3iMN1').length) > 0;
    $(this).attr('data-fate-masterwork', isMasterwork);

    const serialNumber = $(this).attr('id').split("-")[0];
    $(this).attr('data-fate-serial', serialNumber);
  });
}

function updateAttributes() {
  $('[data-fate-armor-init=true][data-fate-indicator-init=true]').each(function(index,element) {
    const serialNumber = $(this).attr('data-fate-serial');

    const dimTags = $.map($(this).find('svg'), function(value, i) {
      return $(value).attr('data-icon');
    });
    $(this).attr('data-fate-dim-tags', dimTags.join(','));

    const isArmorRegistered = rollDatabase.contains(serialNumber);
    $(this).attr('data-fate-armor-registered', isArmorRegistered);
    
    if (!isArmorRegistered) {
      $(this).removeAttr('data-fate-comment');
      return;
    }

    const a = rollDatabase.get(serialNumber);
    $(this).attr('data-fate-comment', a.comments);

    const statCheck = '' + a.mob + a.res + a.rec + a.int + a.dis + a.str;
    if ($(this).attr('data-fate-stat-check') === statCheck) {
      return;
    }
    $(this).attr('data-fate-stat-check', statCheck);

    $(this).find('.foaf-total').text(a.total).addClass(getRatingClassForTotal(a.total));;

    var $armorItem = $(this);
    var stats = [
      ['mob', 'M' + a.mob, a.mob],
      ['res', 'R' + a.res, a.res],
      ['rec', 'R' + a.rec, a.rec],
      ['int', 'I' + a.int, a.int],
      ['dis', 'D' + a.dis, a.dis],
      ['str', 'S' + a.str, a.str],
    ];
    stats.forEach(function(value) {
      $armorItem.find('.foaf-'+value[0]).text(value[1]).addClass(getRatingClassForStats(value[2]));
    });
  });
}

function getRatingClassForTotal(total) {
  if (total <= 45) {
    return 'foaf-stat-low';
  }
  if (total <= 50) {
    return 'foaf-stat-med';
  }
  return 'foaf-stat-high';
}

function getRatingClassForStats(rating) {
  if (rating <= 7) {
    return 'foaf-stat-low';
  }
  if (rating <= 14) {
    return 'foaf-stat-med';
  }
  return 'foaf-stat-high';
}

fateBus.subscribe(module, 'fate.refresh', function() {
  storeArmorData();
  updateAttributes();
});
