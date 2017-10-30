// ==UserScript==
// @author   Robert Slifka (github @rslifka)
// @connect  docs.google.com
// @connect  rslifka.github.io
// @description Customizations on top of the Destiny Item Manager
// @grant    GM_addStyle
// @grant    GM_log
// @grant    GM_getResourceText
// @grant    GM_xmlhttpRequest
// @homepage https://github.com/rslifka/fate_of_all_fools
// @license   MIT; https://raw.githubusercontent.com/rslifka/fate_of_all_fools/master/LICENSE.txt
// @copyright 2017, Robert Slifka (https://github.com/rslifka/fate_of_all_fools)
// @match    https://*.destinyitemmanager.com/*
// @name     FateOfAllFools - DIM Customization
// @require  http://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @require  https://unpkg.com/tippy.js@1.4.0/dist/tippy.js
// @run-at   document-start
// @supportURL https://github.com/rslifka/fate_of_all_fools/issues
// ==/UserScript==

(function() {
    'use strict';

    /*
        **************************************************************
        C H A N G E   O N L Y   T H E S E   U R L S
        **************************************************************
    */
    const ITEM_DATA_TSVS = [
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pub?gid=0&single=true&output=tsv',
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pub?gid=945724952&single=true&output=tsv',
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pub?gid=1848980798&single=true&output=tsv'
    ];

    const Suitability = {
        YES: 'y',
        NO: 'n',
        UNKNOWN: '?'
    };

    const STATUS_CLASSES = new Map();
    STATUS_CLASSES.set(Suitability.YES, 'foaf-yes');
    STATUS_CLASSES.set(Suitability.NO, 'foaf-no');
    STATUS_CLASSES.set(Suitability.UNKNOWN, 'foaf-unknown');

    const WEAPONS = new Map();

    class Weapon {
        constructor(name, type, subtype, favourite, pveUseful, pvpUseful, comments) {
            this.name = name;
            this.type = type;
            this.subtype = subtype;
            this.favourite = favourite.toLowerCase() === 'y';
            this.comments = (comments === '') ? '(no comments entered)' : comments;
            switch(pveUseful.toLowerCase()) {
                case 'y':
                    this.pveUseful = Suitability.YES;
                    break;
                case 'n':
                    this.pveUseful = Suitability.NO;
                    break;
                default:
                    this.pveUseful = Suitability.UNKNOWN;
            }
            switch(pvpUseful.toLowerCase()) {
                case 'y':
                    this.pvpUseful = Suitability.YES;
                    break;
                case 'n':
                    this.pvpUseful = Suitability.NO;
                    break;
                default:
                    this.pvpUseful = Suitability.UNKNOWN;
            }
        }

        isJunk() {
            return this.pveUseful === Suitability.NO && this.pvpUseful === Suitability.NO;
        }

        isUnknown() {
            return this.pveUseful === Suitability.UNKNOWN && this.pvpUseful == Suitability.UNKNOWN;
        }
    }

    /*
        When there's a full data refresh from the sheet, we do a more aggressive
        reset of the interface elements.
    */
    var dataRefreshed;

    function log(message) {
      GM_log('[FOAF] ' + message);
    }

    /*
        [title] = name of the weapon, which we need to find the weapons, but it
        also does double-duty as a tooltip, which we'd like to customize. Save
        off the name of the weapon so we can always refer to it once we modify
        the [title].
    */
    function saveWeaponNames() {
        ["Kinetic","Energy","Power"].forEach(function(dimWeaponType) {
            $('div[title][drag-channel="'+dimWeaponType+'"]').not('[data-foaf-weapon-name]').each(function(index,element) {
                $(this).attr('data-foaf-weapon-name', $(this).attr('title'));
            });
        });
    }

    /*
        Save off the light level of the weapon up at the top of the tree where
        the weapon is defined, so we can use it for later calculations (e.g. dupe,
        infusion, etc.).
    */
    function saveLightLevel() {
        ["Kinetic","Energy","Power"].forEach(function(dimWeaponType) {
            $('div[data-foaf-weapon-name][drag-channel="'+dimWeaponType+'"]').not('[data-foaf-base-light-level]').each(function(index,element) {
                const modifiedLightLevel = $(this).children('.item-stat').text();
                const isModded = $(this).children('.item-img').hasClass('complete');
                const baseLightLevel = isModded ? modifiedLightLevel-5 : modifiedLightLevel;
                $(this).attr('data-foaf-base-light-level', baseLightLevel);
            });
        });
    }

    // We're replacing DIM's tags with our own
    function clearDIMTags() {
        ["Kinetic","Energy","Power"].forEach(function(dimWeaponType) {
            $("div[drag-channel='"+dimWeaponType+"'] .fa").each(function(index,element) {
                $(this).remove();
            });
            $("div[drag-channel='"+dimWeaponType+"'] .no-tag").each(function(index,element) {
                $(this).remove();
            });
        });
    }

    /*
        Instead of a yellow border to indicate a mod, we're going to add "+M" to the end of
        the item's Power Level. In D1, yellow borders used to indicate that an item was fully
        leveled up, and considering how eventually all items will have legendary mods in them,
        it ends up being visual noise.

        We hang on to the original light as we want to use it later for other calculations.
    */
    function addLegendaryModInfo() {
        $('.item-img.complete').siblings('.item-stat').not('[data-original-light]').each(function(index, element) {
            $(this).attr('data-original-light', $(this).text());
            $(this).text($(this).text()+'+M');
        });
    }

    /*
        Pull more information from our sheet in to the tooltip.
    */
    function tooltipComments() {
        ["Kinetic","Energy","Power"].forEach(function(dimWeaponType) {
            $('div[data-foaf-weapon-name][drag-channel="'+dimWeaponType+'"]').each(function(index,element) {
                const weaponName = $(this).attr('data-foaf-weapon-name');
                if (!WEAPONS.has(weaponName)) {
                    return;
                }

                var weapon = WEAPONS.get(weaponName);
                let tooltipText = weaponName + ' // ' + weapon.type + ' - ' + weapon.subtype + '\n';
                tooltipText += '\n';
                tooltipText += 'PvE: GOOD' + '\n';
                tooltipText += 'PvP: BAD' + '\n';
                tooltipText += '\n';
                tooltipText += 'Comments: \n' + weapon.comments;
                $(this).attr('title', tooltipText);
            });
        });
    }

    /*
        Create a visual representation of the rankings from our Google Sheet.
    */
    function iconifyWeapons() {
        const exclusion = dataRefreshed ? '' : '[data-foaf-tagged]';
        ["Kinetic","Energy","Power"].forEach(function(dimWeaponType) {
            $('div[data-foaf-weapon-name][drag-channel="'+dimWeaponType+'"]').not(exclusion).each(function(index,element) {
                if (dataRefreshed) {
                    $(this).children('.item-tag').remove();
                }

                const weaponName = $(this).attr('data-foaf-weapon-name');
                $(this).attr('data-foaf-tagged', true);

                if (!WEAPONS.has(weaponName)) {
                    $(this).append($("<div>", {"class": "item-tag foaf-question-mark"}));
                    return;
                }

                var weapon = WEAPONS.get(weaponName);
                if (weapon.isJunk()) {
                    $(this).append($("<div>", {"class": "item-tag foaf-thumbs-down"}));
                } else if (weapon.isUnknown()) {
                    $(this).append($("<div>", {"class": "item-tag foaf-question-mark"}));
                } else {
                    if (weapon.pveUseful !== Suitability.UNKNOWN) {
                        $(this).append($("<div>", {"class": "item-tag foaf-pve " + STATUS_CLASSES.get(weapon.pveUseful)}));
                    }
                    if (weapon.pvpUseful !== Suitability.UNKNOWN) {
                        let leftPadding = '';
                        if (weapon.pveUseful === Suitability.UNKNOWN) {
                            leftPadding = 'left:0;';
                        }
                        $(this).append($("<div>", {"class": "item-tag foaf-pvp " + STATUS_CLASSES.get(weapon.pvpUseful), "style": leftPadding}));
                    }
                }
            });
        });
    }

    function indicateDupes() {
        var weapons = new Map();
        ["Kinetic","Energy","Power"].forEach(function(dimWeaponType) {
            $('div[data-foaf-weapon-name][drag-channel="'+dimWeaponType+'"]').each(function(index,element) {
                let weaponName = $(this).attr('data-foaf-weapon-name');
                let weaponData = {
                    name: weaponName,
                    domElement: this,
                    light: $(this).attr('data-foaf-base-light-level')
                };
                if (weapons.has(weaponName)) {
                    weapons.set(weaponName, weapons.get(weaponName).concat(weaponData));
                } else {
                    weapons.set(weaponName, [weaponData]);
                }
            });
        });

        weapons.forEach(function(weaponInstances, key, map) {
            if (weaponInstances.length == 1) {
                return;
            }
            const maxLight = Math.max(...weaponInstances.map(function(w) {return w.light;}));
            weaponInstances.forEach(function(weapon) {
                let dupeDesc = (weapon.light < maxLight) ? ('dupe-lower') : ('dupe');
                let dupeClass = (weapon.light < maxLight) ? ('dupe-lower') : ('dupe-higher');

                // Does this exact element exist already?
                let existingDuperino = $(weapon.domElement).children(".dupe-stat."+dupeClass+":contains('"+dupeDesc+"')");
                if (existingDuperino.length > 0) {
                    return;
                }

                $(weapon.domElement).remove('.dupe-stat');
                $(weapon.domElement).append($("<div>", {"class": "dupe-stat " + dupeClass}).text(dupeDesc));

                $(weapon.domElement).hover(function() {
                    ["Kinetic","Energy","Power"].forEach(function(dimWeaponType) {
                        $('div[data-foaf-weapon-name][drag-channel="'+dimWeaponType+'"]').not('[data-foaf-weapon-name="'+weapon.name+'"]').addClass('search-hidden');
                    });
                },function() {
                    $('.search-hidden').removeClass('search-hidden');
                });
            });
        });
    }

    function refresh() {
        if (dataRefreshed) {
            log('Refreshing (full)...');
        } else {
            log('Refreshing (partial)...');
        }

        log('  Saving weapon names...');
        saveWeaponNames();
        log('  Saving light levels...');
        saveLightLevel();
        log('  Clearing DIM weapon item tags...');
        clearDIMTags();
        log('  Enhancing tooltips...');
        tooltipComments();
        log('  Adding mod indicator...');
        addLegendaryModInfo();
        log('  Adding icons to weapons...');
        iconifyWeapons();
        log('  Dupify!...');
        indicateDupes();

        dataRefreshed = false;
        log('Done!');
    }

    function itemsAreLoaded() {
        var deferredReady = $.Deferred();
        setInterval(function() {
            if ($('.item-img').length > 0) {
                deferredReady.resolve();
            }
        }, 1000);
        return deferredReady.promise();
    }

    function rankingsDownloaded(tsvUrl) {
        var deferredReady = $.Deferred();
        GM_xmlhttpRequest({
            method: 'GET',
            url: tsvUrl,
            context: deferredReady,
            onload: function(response) {
                log('Processing collection: "'+tsvUrl+'"');

                var dataLines = response.responseText.split(/[\r\n]+/);
                log('Found ('+(dataLines.length-1)+') weapons');

                for (var i = 1; i < dataLines.length; i++) {
                    // We've split by TAB because no weapon names have tabs in them
                    var data = dataLines[i].split('\t');
                    // log('Examining ' + data);

                    // Name=0,Type,Subtype,Personal Fave?,PvE, PvP, Comments
                    WEAPONS.set(data[0], new Weapon(data[0], data[1], data[2], data[3], data[4], data[5], data[6]));
                }

                deferredReady.resolve();
            }
        });
        return deferredReady.promise();
    }

    log('Applying CSS...');
    [
        'https://rslifka.github.io/fate_of_all_fools/css/fateofallfools.css',
        'https://rslifka.github.io/fate_of_all_fools/css/overrides.css'
    ].forEach(function(cssPath) {
        log('Downloading style: '+cssPath);
        GM_xmlhttpRequest({
            method: 'GET',
            url: cssPath,
            onload: function(response) {
                log('Done! Installing...');
                GM_addStyle(response.responseText);
            }
        });
    });

    /*
        Pull down new weapon data at a separate interval than the refresh timer.
        The idea is that you're updating this sheet on a much longer interval
        than you're dragging items around (which requires a periodic refresh to
        re-apply our styles).

        That being said, chances are when you do make an update, you'd like to
        see the change sooner than later, so we'll use a time conducive to
        interactivity.
    */
    log('Initializing data refresh timer...');
    setInterval(function() {
        $.when(
            rankingsDownloaded(ITEM_DATA_TSVS[0]),
            rankingsDownloaded(ITEM_DATA_TSVS[1]),
            rankingsDownloaded(ITEM_DATA_TSVS[2])
        ).then(function() {
            log('Data refresh complete!');
            dataRefreshed = true;
        });
    }, 30000);

    log('Initialized, waiting for items to appear...');
    $.when(
        itemsAreLoaded(),
        rankingsDownloaded(ITEM_DATA_TSVS[0]),
        rankingsDownloaded(ITEM_DATA_TSVS[1]),
        rankingsDownloaded(ITEM_DATA_TSVS[2])
    ).then(function() {
        dataRefreshed = true;
        refresh();
        setInterval(function() {
            refresh();
        }, 5000);
    });
})();
